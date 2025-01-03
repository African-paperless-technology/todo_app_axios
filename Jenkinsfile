pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-react-app'
        DOCKER_TAG = 'v1.0.0'
        NODEJS_VERSION = '6.x'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo '📦 Installation des dépendances...'
                    nodejs(NODEJS_VERSION) {
                        sh 'npm ci'
                    }
                    echo '✅ Dépendances installées'
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    echo '🔍 Exécution des tests de lint...'
                    nodejs(NODEJS_VERSION) {
                        sh 'npm run lint'
                    }
                    echo '✅ Tests de lint passés'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo '🧪 Exécution des tests unitaires...'
                    nodejs(NODEJS_VERSION) {
                        sh 'npm test -- --watchAll=false'
                    }
                    echo '✅ Tests unitaires passés'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo '📦 Construction de l\'application...'
                    nodejs(NODEJS_VERSION) {
                        sh 'npm run build'
                    }
                    echo '✅ Construction réussie'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    echo '🐳 Construction de l\'image Docker...'
                    docker.withRegistry('', 'docker-credentials') {
                        def dockerImage = docker.build("$DOCKER_IMAGE:$DOCKER_TAG")
                        dockerImage.push()
                    }
                    echo '✅ Image Docker poussée avec succès'
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


