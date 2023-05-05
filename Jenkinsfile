pipeline {
    agent any
    parameters {
        string(name: 'brch', defaultValue: 'develop', description: 'branch name')
    }

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
                brch=$(echo ${GIT_BRANCH} | cut -d"/" -f 2)
                sh 'bldNum=$(echo $BUILD_NUMBER)'
                build job: 'DevOpsProject-QA-Deploy', parameters: [string(name: 'branch', value: "${params.brch}" ), string(name: 'buildNumber', value: "${BUILD_NUMBER}")]
            }
        }
    }
}
