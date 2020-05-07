#!groovy​

properties([
        buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10')),
        pipelineTriggers([]),
        disableConcurrentBuilds()
])

def PRODUCT = "smaug-admin"
def CONTAINER_NAME = "${PRODUCT}-${BRANCH_NAME.toLowerCase()}"
def BUILD_NAME = "$PRODUCT :: $BRANCH_NAME"
def DOCKER_REPO = "docker-ux.dbc.dk"
def DOCKER_NAME = "${DOCKER_REPO}/${CONTAINER_NAME}:${BUILD_NUMBER}"
def DOCKER_COMPOSE_NAME = "compose-${DOCKER_NAME}"
def DOCKER_STATUS = ''
pipeline {
    agent {
        label 'devel9-head'
    }
    stages {
        stage('Test and build image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_NAME --pull --no-cache ."
                }
            }
        }
        stage('Run docker') {
            steps {
                script {
                  ansiColor("xterm") {
                    sh "echo Integrating..."
                    sh "docker-compose -f docker-compose.yml -p ${DOCKER_COMPOSE_NAME} build"
                    sh "IMAGE=${DOCKER_NAME} docker-compose -f docker-compose.yml -p ${DOCKER_COMPOSE_NAME} run e2e"
                  }
                }
            }
        }
        stage ('Check container is running correct') {
            when {
                branch "master"
            }
            steps {
                script {
                    DOCKER_STATUS = sh (
                        script: "docker exec $CONTAINER_NAME /bin/bash -c \"curl -I http://localhost:8030/login | grep HTTP | cut -d ' ' -f2\"",
                        returnStdout: true
                    ).trim()
                    // If DOCKER_STATUS == 200, then there is a working webpage and all is well
                    if (DOCKER_STATUS == "200") {
                        echo "Succes"
                    } else {
                        echo "Build failed"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
        stage('Push to Artifactory') {
            when {
                branch "master"
            }
            steps {
                script {
                    if (currentBuild.resultIsBetterOrEqualTo('SUCCESS')) {
                        def ARTY_SERVER = Artifactory.server 'arty'
                        def ARTY_DOCKER = Artifactory.docker server: ARTY_SERVER, host: env.DOCKER_HOST
                        def BUILD_INFO = Artifactory.newBuildInfo()
                        BUILD_INFO.name = BUILD_NAME
                        BUILD_INFO.env.capture = true
                        BUILD_INFO.env.collect()
                        BUILD_INFO = ARTY_DOCKER.push("$DOCKER_NAME", 'docker-ux', BUILD_INFO)
                        ARTY_SERVER.publishBuildInfo BUILD_INFO
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                sh """
                    echo Hello
                    docker kill $CONTAINER_NAME
                    docker rm $CONTAINER_NAME
                    docker rmi $DOCKER_NAME
                """
            }
        }
    }
}
