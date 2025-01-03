pipeline {
   agent any
    
    environment {
        DOCKER_IMAGE = 'todo-app'
        DOCKER_TAG = 'v1.0.0'
        TRIVY_SEVERITY = 'HIGH,CRITICAL'
    }
    
    stages {
        stage('Construire l\'application') {
            steps {
                script {
                    echo '🔨 Démarrage de la construction de l\'application...'
                    sh 'docker-compose up -d --build'
                    echo '✅ Construction de Docker réussie'
                }
            }
        }

        stage('Installer Trivy') {
            steps {
                script {
                    echo '🔧 Installation de Trivy...'
                    sh '''
                        curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin v0.48.1
                        trivy --version
                    '''
                    echo '✅ Trivy installé avec succès'
                }
            }
        }
        
        stage('Analyse de sécurité') {
            steps {
                script {
                    echo '🔍 Démarrage de l\'analyse de sécurité...'
                    sh """
                        trivy image \
                            --exit-code 1 \
                            --severity \${TRIVY_SEVERITY} \
                            --format table \
                            --output trivy-report.txt \
                            ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                    echo '✅ Analyse de sécurité terminée'
                }
            }
        }
        
        stage('Exécuter les tests') {
            steps {
                script {
                    echo '🧪 Exécution des tests...'
                    sh 'docker-compose exec -T frontend npm test -- --watchAll=false'
                    echo '✅ Tests exécutés avec succès'
                }
            }
        }
        success {
            echo '✅ Pipeline terminé avec succès !'
        }
        failure {
            echo '❌ Échec du pipeline !'
        }
    }
}

