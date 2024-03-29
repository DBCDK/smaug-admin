#!groovy​

properties([
        buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10')),
        pipelineTriggers([]),
        disableConcurrentBuilds()
])

def PRODUCT = "smaug-admin"
def CONTAINER_NAME = "${PRODUCT}-${BRANCH_NAME.toLowerCase()}"
def BUILD_NAME = "$PRODUCT :: $BRANCH_NAME"
def DOCKER_REPO = "docker-fbiscrum.artifacts.dbccloud.dk"
def IMAGE_NAME = "${DOCKER_REPO}/${CONTAINER_NAME}"
def DOCKER_NAME = "${IMAGE_NAME}:${BUILD_NUMBER}"
def DOCKER_COMPOSE_NAME = "compose-${DOCKER_NAME}"
def DOCKER_STATUS = ''
pipeline {
    agent {
        label 'devel10-head'
    }
    stages {
        stage('Test and build image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_NAME --pull --no-cache ."
                }
            }
        }
        stage('Integration test') {
            steps {
                script {
                  ansiColor("xterm") {
                    sh "echo Integrating..."
                    sh "docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} build"
                    sh "IMAGE=${DOCKER_NAME} docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} run e2e"
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
                        docker.image("${DOCKER_NAME}").push("${BUILD_NUMBER}")
                    }
                }
            }
        }
    }
    post {
        always {
               sh """
                    echo Clean up
                    mkdir -p logs
                    docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} logs database > logs/database-log.txt
                    docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} logs smaug > logs/smaug-log.txt
                    docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} logs web > logs/web-log.txt
                    docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} down -v
                    docker rmi ${DOCKER_NAME}
                """
                archiveArtifacts 'e2e/cypress/screenshots/*, e2e/cypress/videos/*, logs/*'
        }
    }
}
