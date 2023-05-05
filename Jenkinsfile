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
                sh 'echo brch'
                sh 'bldNum=$(echo $BUILD_NUMBER)'
                sh 'echo $(bldNum)'
                build job: 'DevOpsProject-QA-Deploy', parameters: [run(name: 'brnch', value: '$brch'), string(name: 'bldNumber', value: '$bldNum')]
            }
        }
    }
}
