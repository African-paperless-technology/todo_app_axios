pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    
    environment {
        DOCKER_IMAGE = 'todo-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
        NODEJS_VERSION = '18.x'
        TRIVY_SEVERITY = 'HIGH,CRITICAL'
    }

    
    
    stages {

        stage('Étape 1') {
            steps {
                echo '✅ Début de l\'étape 1'
            }
        }
        
        stage('Construire l\'application') {
            steps {
                script {
                    // Installer les dépendances et démarrer les conteneurs
                    sh '''
                        npm install
                        docker-compose up -d --build
                    '''
                }
            }
            post {
                success {
                    echo '✅ Construction Docker réussie'
                }
                failure {
                    echo '❌ Échec de la construction Docker'
                }
            }
        }

        stage('Installer Trivy') {
            steps {
                sh '''
                    curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin v0.48.1
                    trivy --version
                '''
            }
        }
        
        stage('Analyse de sécurité') {
            steps {
                script {
                    // Générer un rapport détaillé
                    sh """
                        trivy image \
                            --exit-code 1 \
                            --severity \${TRIVY_SEVERITY} \
                            --format table \
                            --output trivy-report.txt \
                            ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
            post {
                success {
                    echo '✅ L\'analyse de sécurité a réussi - Aucune vulnérabilité critique trouvée'
                    archiveArtifacts 'trivy-report.txt'
                }
                failure {
                    echo '❌ Échec de l\'analyse de sécurité - Vulnérabilités critiques détectées !'
                    archiveArtifacts 'trivy-report.txt'
                    slackSend(
                        color: 'danger',
                        message: """
                            🚨 Vulnérabilités de sécurité détectées dans ${DOCKER_IMAGE}:${DOCKER_TAG}
                            Consultez le rapport détaillé : ${env.BUILD_URL}artifact/trivy-report.txt
                        """
                    )
                }
            }
        }
        
        stage('Exécuter les tests') {
            steps {
                script {
                    sh 'docker-compose exec -T frontend npm test -- --watchAll=false'
                }
            }
            post {
                success {
                    echo '✅ Les tests ont réussi'
                }
                failure {
                    echo '❌ Les tests ont échoué'
                }
            }
        }

        stage('Construire pour Netlify') {
            steps {
                nodejs(NODEJS_VERSION) {
                    sh '''
                        export VITE_APP_API_URL=https://api.yourapp.com
                        npm run build
                    '''
                }
            }
            post {
                success {
                    echo '✅ Construction réussie'
                }
                failure {
                    echo '❌ Échec de la construction'
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
                    sh """
                        npx netlify-cli deploy \
                            --dir=dist \
                            --auth=\${NETLIFY_AUTH_TOKEN} \
                            --site=\${NETLIFY_SITE_ID} \
                            --prod \
                            --message="Déploiement en production depuis Jenkins #${env.BUILD_NUMBER}"
                    """
                }
            }
            post {
                success {
                    slackSend(
                        color: 'good',
                        message: """
                            ✅ Déploiement réussi !
                            🔗 Application : https://your-app.netlify.app
                            📦 Version : ${env.BUILD_NUMBER}
                        """
                    )
                }
                failure {
                    slackSend(
                        color: 'danger',
                        message: """
                            ❌ Échec du déploiement !
                            🏗️ Build : ${env.BUILD_NUMBER}
                            🔍 Vérifiez les logs : ${env.BUILD_URL}console
                        """
                    )
                }
            }
        }
    }
    
    post {
        always {
            // Nettoyage
            sh 'docker-compose down --rmi all'
        }
    }
}
