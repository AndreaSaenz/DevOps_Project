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
                sh 'if [$runTestCases]
                        then
                        npm test
                    fi'
            }
        }
        stage('Create Docker Image') {
            steps {
                sh 'docker image ls -a'
                sh 'branch=$(echo $GIT_BRANCH | cut -d'/' -f 2)'
                sh 'echo $branch'
                sh 'docker build . -t devops_project-$branch:1.0.0-$BUILD_NUMBER'
                sh 'docker image ls -a'
                sh 'docker container ls -a'
            }
        }
        stage('Stop containers') {
            steps {
                sh 'running=$(docker ps --filter name=devops_project-$branch* --filter status=running -aq)'
                sh 'if [-z $running]
                        then
                            #Print error message
                            echo "No hay contenedores ejecutandose"
                        else
                            #Se apagan los contenedores con el mismo nombre
                            docker ps --filter name=devops_project-$branch* --filter status=running -aq | xargs docker stop
                    fi'
                sh 'docker run -d -p 8080:8080 --name sicei-container sicei-${GIT_BRANCH}:1.0.0-${BUILD_NUMBER}'
                sh 'docker container ls -a'
                sh 'docker run -p 127.0.0.1:30$BUILD_NUMBER:3000 --name devops_project-$branch-BUILD_NUMBER -d devops_project-$branch:1.0.0-$BUILD_NUMBER'
                sh 'docker container ls -a'
                sh 'docker container start devops_project-$branch-$BUILD_NUMBER'
                sh 'docker container ls'
            }
        }
    }
}
