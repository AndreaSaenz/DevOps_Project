pipeline {
     agent any
    
    stages {
        stage('Construir el proyecto') {
            steps {
                sh 'npm install express --save.'
                sh 'npm install jest supertest --save-dev'
            }
        }
        stage('Ejecutar los test cases') {
            steps {
                sh 'npm test'
            }
        }
        stage('Crear la imagen de Docker') {
            steps {
                sh "docker build -t sicei-${GIT_BRANCH}:1.0.0-${BUILD_NUMBER} ."
            }
        }
        stage('Detener los contenedores existentes y crear uno nuevo') {
            steps {
                sh "docker stop sicei-container || true"
                sh "docker rm sicei-container || true"
                sh "docker run -d -p 8080:8080 --name sicei-container sicei-${GIT_BRANCH}:1.0.0-${BUILD_NUMBER}"
            }
        }
    }
}
