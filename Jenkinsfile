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
                sh 'brch=$(echo $GIT_BRANCH | cut -d"/" -f 2)'
                sh 'bldNum=$(echo $BUILD_NUMBER)'
                sh 'echo $env.brch'
                build job: 'DevOpsProject-QA-Deploy', parameters: [string(name: 'branch', value: '$(echo $GIT_BRANCH | cut -d"/" -f 2)' ), string(name: 'buildNumber', value: '$bldNum')]
            }
        }
    }
}
