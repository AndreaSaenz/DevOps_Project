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
                sh 'echo "Ejecutando test cases"'
                sh '#npm test -- -t="fine.test.js"'
            }
        }
        stage('Call other Jenkinsfile') {
            steps {
                sh 'echo $GIT_BRANCH'
                sh 'echo $BUILD_NUMBER'
                build job: 'DevOpsProject-QA-Deploy', parameters: [string(name: 'branch', value: '${GIT_BRANCH}'), string(name: 'buildNumber', value: '$BUILD_NUMBER')]
            }
        }
    }
}
