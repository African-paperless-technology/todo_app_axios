pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-react-app'
        DOCKER_TAG = 'v1.0.0'
        STG_API_ENDPOINT = 'http://localhost:2793'
        APP_NAME = 'my-react-app'
        CONTAINER_IMAGE = 'my-react-app:v1.0.0'
        EXTERNAL_PORT = '80'
        INTERNAL_PORT = '3000'
    }
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    echo '📦 Installation des dépendances...'
                    try {
                        // Utilisation de bat pour Windows au lieu de sh
                        bat 'npm install'
                        echo '✅ Dépendances installées'
                    } catch (err) {
                        echo "❌ Erreur lors de l'installation des dépendances: ${err}"
                        throw err
                    }
                }
            }
        }
        stage('Build Application') {
            steps {
                script {
                    // Utilisation de bat pour Windows
                    bat 'docker-compose up -d --build'
                }
            }
            post {
                success {
                    echo '✅ Docker build successful'
                }
                failure {
                    echo '❌ Docker build failed'
                }
            }
        } 

        stage('clean all containers') {
            steps {
                script {
                    bat 'docker-compose down'
                }
            }
            post {
                success {
                    echo '✅ Container deleted successful'
                }
                failure {
                    echo '❌ Container delete failed'
                }
            }
        } 
        
        stage('STAGING - Deploy App') {
            agent any
            steps {
                script {
                    sh """
                      echo  {\\"your_name\\":\\"${APP_NAME}\\",\\"container_image\\":\\"${CONTAINER_IMAGE}\\", \\"external_port\\":\\"${EXTERNAL_PORT}\\", \\"internal_port\\":\\"${INTERNAL_PORT}\\"}  > data.json 
                      curl -X POST http://${STG_API_ENDPOINT}/staging -H 'Content-Type: application/json'  --data-binary @data.json 
                    """
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        success {
            echo '✅ Pipeline terminé avec succès !'
        }
        failure {
            echo '❌ Échec du pipeline !'
        }
    }
}

