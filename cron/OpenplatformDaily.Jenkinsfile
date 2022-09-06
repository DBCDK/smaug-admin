#!groovy

pipeline {
  agent {
    label "devel10"
  }
  triggers {
    cron("04 02 * * *")
  }
  environment {
    MONTHLY = " "
    STAT_FILE = "openplatform_daily.json"
    STAT_FILTER = '{"app":"serviceprovider", "level":"INFO"}'
    STAT_ENDPOINT = '{"name":["work","suggest","recommend","search","storage","user","order"]}'
    ELK_CREDENTIALS = credentials('elk_user');
    ELK_URI = "https://${ELK_CREDENTIALS}@elk.dbc.dk:9100/k8s-frontend-prod-*"
    SMAUG_CLIENT_FILE = "clients_${STAT_FILE}"
    SMAUG_CREDENTIALS = credentials("smaug_login")
    SMAUG_URI="https://${SMAUG_CREDENTIALS}@auth-admin.dbc.dk/clients"
    ARTIFACTORY_GENERIC = "https://artifactory.dbccloud.dk/artifactory/generic-fbiscrum-production/metakompasset/"
    ARTIFACTORY_LOGIN = credentials("artifactory_login")
  }
  stages {
    stage('Install dependencies') {
      steps { script {
        sh 'cd cron; npm install;'
      } }
    }
    stage('fetch smaug clients') {
      steps { script {
        sh "rm -f ${SMAUG_CLIENT_FILE}"
        sh "curl -X GET ${SMAUG_URI} -o ${SMAUG_CLIENT_FILE}"
      } }
    }
    stage('Create stat files from elk') {
      steps { script {
        sh "rm -f ${STAT_FILE}"
        sh "node cron/fetch_statistics.js '${MONTHLY}' -h '${ELK_URI}' -f '${STAT_FILTER}' -e '${STAT_ENDPOINT}' -c '${SMAUG_CLIENT_FILE}' -o '${STAT_FILE}'"
      } }
    }
  }
  post {
    failure {
      when {branch "master"} {
        script {
          slackSend(channel: 'fbi-frontend-is',
            color: 'warning',
            message: "${env.JOB_NAME} #${env.BUILD_NUMBER} failed and needs attention: ${env.BUILD_URL}",
            tokenCredentialId: 'slack-global-integration-token')
        }
      }
    }
    success {
      script {
        if ("${env.BRANCH_NAME}" == 'master') {
          sh "echo archive ${STAT_FILE}"
          archiveArtifacts "${STAT_FILE}"
          sh "echo push to ${ARTIFACTORY_GENERIC}${STAT_FILE}"
          sh "curl -u ${ARTIFACTORY_LOGIN} -T ${STAT_FILE} ${ARTIFACTORY_GENERIC}${STAT_FILE}"
          slackSend(channel: 'fbi-frontend-is',
            color: 'good',
            message: "${env.JOB_NAME} #${env.BUILD_NUMBER} completed, and pushed ${STAT_FILE} to ${ARTIFACTORY_GENERIC}",
            tokenCredentialId: 'slack-global-integration-token')
        }
      }
    }
    fixed {
      slackSend(channel: 'fbi-frontend-is',
        color: 'good',
        message: "${env.JOB_NAME} #${env.BUILD_NUMBER} back to normal: ${env.BUILD_URL}",
        tokenCredentialId: 'slack-global-integration-token')

    }
  }
}
