pipeline {
     agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install express --save.'
            }
        }
        stage('Run test cases') {
            steps {
                sh '#npm test -- -t="fine.test.js"'
            }
        }
        stage('Call other Jenkinsfile') {
            steps {
                build job: 'DevOpsProject-QA-Deploy', parameters: [string(name: 'branch', value: '$GIT_BRANCH'), string(name: 'buildNumber', value: '$BUILD_NUMBER')]
            }
        }
    }
}
