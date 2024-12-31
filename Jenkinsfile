pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'todo-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
        NODEJS_VERSION = '18.x'
        TRIVY_SEVERITY = 'HIGH,CRITICAL'
    }
    
    stages {
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

        stage('Install Trivy') {
            steps {
                sh '''
                    curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin v0.48.1
                    trivy --version
                '''
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    // Génère un rapport détaillé
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
                    echo '✅ Security scan passed - No critical vulnerabilities found'
                    archiveArtifacts 'trivy-report.txt'
                }
                failure {
                    echo '❌ Security scan failed - Critical vulnerabilities detected!'
                    archiveArtifacts 'trivy-report.txt'
                    slackSend(
                        color: 'danger',
                        message: """
                            🚨 Security vulnerabilities detected in ${DOCKER_IMAGE}:${DOCKER_TAG}
                            Check detailed report: ${env.BUILD_URL}artifact/trivy-report.txt
                        """
                    )
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    sh 'docker-compose exec -T frontend npm test -- --watchAll=false'
                }
            }
            post {
                success {
                    echo '✅ Tests passed'
                }
                failure {
                    echo '❌ Tests failed'
                }
            }
        }

        stage('Build for Netlify') {
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
                    echo '✅ Build successful'
                }
                failure {
                    echo '❌ Build failed'
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input '🚀 Deploy to production?'
                
                script {
                    sh """
                        npx netlify-cli deploy \
                            --dir=dist \
                            --auth=\${NETLIFY_AUTH_TOKEN} \
                            --site=\${NETLIFY_SITE_ID} \
                            --prod \
                            --message="Production deployment from Jenkins #${env.BUILD_NUMBER}"
                    """
                }
            }
            post {
                success {
                    slackSend(
                        color: 'good',
                        message: """
                            ✅ Deployment successful!
                            🔗 Application: https://your-app.netlify.app
                            📦 Version: ${env.BUILD_NUMBER}
                        """
                    )
                }
                failure {
                    slackSend(
                        color: 'danger',
                        message: """
                            ❌ Deployment failed!
                            🏗️ Build: ${env.BUILD_NUMBER}
                            🔍 Check logs: ${env.BUILD_URL}console
                        """
                    )
                }
            }
        }
    }
    
    post {
        always {
            // Nettoyage
            sh 'docker-compose down --rmi all -v'
            cleanWs()
        }
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}