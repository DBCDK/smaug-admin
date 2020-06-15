#!groovy

pipeline {
  agent {
    label "devel10"
  }
  triggers {
    cron("1 0 1 * *")
  }
  environment {
    withCredentials([usernamePassword(credentialsId: 'elk_user', usernameVariable: 'ELK_USER', passwordVariable: 'ELK_PWD')]) {
      ELK_URI = "https://${ELK_USER}:${ELK_PWD}@elk.dbc.dk:9100/k8s-frontend-prod-*"
    }
    YYYY_MM = sh(script: 'date "+%Y-%m"', returnStdout: true).trim()
    STAT_FILE = "hejmdal_login_${YYYY_MM}.json"
    STAT_FILTER = '{"app":"hejmdal", "level":"INFO", "baseUrl":"/login"}'
    ARTIFACTORY_FE_GENERIC = "https://artifactory.dbc.dk/artifactory/fe-generic/metakompasset/"
    ARTIFACTORY_LOGIN = credentials("artifactory_login")
  }
  stages {
    stage('Install dependencies') {
      steps { script {
        sh 'cd cron; npm install;'
      } }
    }
    stage('Create stat files from elk') {
      steps { script {
        sh "rm -f ${STAT_FILE}*.json"
        withCredentials([usernamePassword(credentialsId: 'amazon', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh "node cron/fetch_statistics.js -m -h ${ELK_URI} -f ${STAT_FILTER} -o ${STAT_FILE}"
      } } }
    }
  }
  post {
    failure {
      when {branch "master"} {
        script {
          slackSend(channel: 'fe-drift',
                  color: 'warning',
                  message: "${env.JOB_NAME} #${env.BUILD_NUMBER} failed and needs attention: ${env.BUILD_URL}",
                  tokenCredentialId: 'slack-global-integration-token')
        }
      }
    }
    success {
      script {
        sh "echo archive ${STAT_FILE}"
        archiveArtifacts "${STAT_FILE}"
        sh "echo push to ${ARTIFACTORY_FE_GENERIC}${STAT_FILE}"
        sh "curl -u ${ARTIFACTORY_LOGIN} -T ${STAT_FILE} ${ARTIFACTORY_FE_GENERIC}${STAT_FILE}"
        if ("${env.BRANCH_NAME}" == 'master') {
          slackSend(channel: 'fe-drift',
                  color: 'good',
                  message: "${env.JOB_NAME} #${env.BUILD_NUMBER} completed, and pushed ${STAT_FILE} to ${ARTIFACTORY_FE_GENERIC}",
                  tokenCredentialId: 'slack-global-integration-token')
        }
      }
    }
    fixed {
      slackSend(channel: 'fe-drift',
              color: 'good',
              message: "${env.JOB_NAME} #${env.BUILD_NUMBER} back to normal: ${env.BUILD_URL}",
              tokenCredentialId: 'slack-global-integration-token')

    }
  }
}
