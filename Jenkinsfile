pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-react-app'
        DOCKER_TAG = 'v1.0.0'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                script {
                    echo '📦 Installation des dépendances...'
                    try {
                            sh 'npm install'
                        }
                        echo '✅ Dépendances installées'
                    } catch (err) {
                        echo "❌ Erreur lors de l'installation des dépendances: $err"
                        throw err
                    }
                }
            }
        stage('Build Application') {
            steps {
                script {
                    // Build et démarre les conteneurs
                    sh 'docker-compose up -d --build'
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
        }

        // Reste du pipeline

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


