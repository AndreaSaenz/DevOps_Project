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
        stage('Run test cases') {
            build job: 'JenkinsfileDeploy', parameters: [string(name: 'branch', value: '$GIT_BRANCH | cut -d'/' -f 2'), string(name: 'buildNumber', value: '$BUILD_NUMBER')]
        }
    }
}
