pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-react-app'
        DOCKER_TAG = 'v1.0.0'
        STG_API_ENDPOINT = 'http://localhost:3000'
        APP_NAME = 'my-react-app'
        CONTAINER_IMAGE = 'my-react-app:v1.0.0'
        EXTERNAL_PORT = '80'
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH_TOKEN')
        NETLIFY_SITE_ID = credentials('NETLIFY_SITE_ID')
    
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
                    bat """
                      echo  {\\"your_name\\":\\"${APP_NAME}\\",\\"container_image\\":\\"${CONTAINER_IMAGE}\\", \\"external_port\\":\\"${EXTERNAL_PORT}\\", \\"internal_port\\":\\"${INTERNAL_PORT}\\"}  > data.json
                      npm install --save-dev cors
                      json-server --watch db.json --port 3000 --middleware ./node_modules/cors
                      curl -X POST http://${STG_API_ENDPOINT}/staging -H 'Content-Type: application/json'  --data-binary @data.json 
                    """
                }
            }
            post {
                success {
                    echo '✅ Deploy in staging successful'
                }
                failure {
                    echo '❌ Deploy in staging failed'
                }
            }
        }

        stage('Build for Production') {
            // when {
            //     branch 'master' // Ne se déclenche que sur la branche main
            // }
            steps {
                script {
                    echo '🏗️ Building for production...'
                    try{
                    bat 'npm run build'
                    bat 'ls -la build'
                    bat 'npm install netlify-cli --save-dev' 
                    bat 'npx netlify build'
                    } catch (err) {
                        echo '⚠️ Installation globale échouée, utilisation de npx...'
                        bat 'npm install netlify-cli --save-dev'
                        bat 'npx netlify --version'
                        bat 'npx netlify build'
                        bat 'npm run build'
                    }
                    
                }
            }
            post {
                success {
                    echo '✅ build for production successful'
                }
                failure {
                    echo '❌ build for production failed'
                }
            }
        }

        stage('Deploy to Netlify') {
            // when {
            //     branch 'master' // Ne se déclenche que sur la branche main
            // }
            steps {
                script {
                    echo '🚀 Deploying to Netlify...'
                    echo "❌✅${NETLIFY_SITE_ID}"
                    echo "❌✅${NETLIFY_AUTH_TOKEN}"
                        try {
                            // Déploiement sur Netlify
                            bat "npx netlify deploy --site ${NETLIFY_SITE_ID} --auth ${NETLIFY_AUTH_TOKEN} --prod --dir build"
                            echo '✅ Production deployment successful!'
                        } catch (err) {
                            echo "❌ Production deployment failed: ${err}"
                            throw err
                        }
                    
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

