pipeline {
   agent any
    
    environment {
        DOCKER_IMAGE = 'todo-app'
        DOCKER_TAG = 'v1.0.0'
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
        NODEJS_VERSION = '18.x'
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

        stage('Construire pour Netlify') {
            steps {
                script {
                    echo '📦 Construction pour Netlify...'
                    nodejs(NODEJS_VERSION) {
                        sh '''
                            export VITE_APP_API_URL=https://api.yourapp.com
                            npm run build
                        '''
                    }
                    echo '✅ Construction réussie pour Netlify'
                }
            }
        }
        
        stage('Déployer en production') {
            when {
                branch 'main'
            }
            steps {
                input '🚀 Déployer en production ?'
                
                script {
                    echo '🚀 Démarrage du déploiement en production...'
                    sh """
                        npx netlify-cli deploy \
                            --dir=dist \
                            --auth=\${NETLIFY_AUTH_TOKEN} \
                            --site=\${NETLIFY_SITE_ID} \
                            --prod \
                            --message="Déploiement en production depuis Jenkins #${env.BUILD_NUMBER}"
                    """
                    echo '✅ Déploiement en production réussi'
                }
            }
        }
    }
    
    post {
        always {
            node {
                echo '🔄 Nettoyage final...'
                sh 'docker-compose down --rmi all -v'
                cleanWs()
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

