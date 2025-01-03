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

        stage('Install Trivy') {
    steps {
        script {
            try {
                // Télécharger le binaire Trivy
                bat 'npm install -g @aquasecurity/trivy'
                bat 'trivy --version'
            } catch (error) {
                echo "❌ Erreur lors de l'installation de trivy: ${error}"
                throw error
            }
        }
    }
}

      
        
        stage('Security Scan') {
            steps {
                script {
                    // Génère un rapport détaillé
                    bat """
                        trivy image \
                            --exit-code 1 \
                            --severity \${TRIVY_SEVERITY} \
                            --format table \
                            --output trivy-report.txt \
                            ${DOCKER_IMAGE}:${DOCKER_TAG}
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

