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
        
        stage('Security Scan') {
            steps {
                script {
                    // Génère un rapport détaillé
                    bat """
                        wget https://github.com/aquasecurity/trivy/releases/download/v0.41.0/trivy_0.41.0_Linux-64bit.deb
                        dpkg -i trivy_0.41.0_Linux-64bit.deb
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

