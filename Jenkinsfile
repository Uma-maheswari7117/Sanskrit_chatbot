pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'git@github.com:Uma-maheswari7117/SanskritChatbot.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing Python dependencies...'
                sh 'python3 --version'
                sh 'pip3 install -r requirements.txt'
            }
        }

        stage('Test / Validate') {
            steps {
                echo 'Validating Python files...'
                sh 'python3 -m py_compile app.py'
                sh 'python3 -m py_compile data/lessons.py'
            }
        }

        stage('Docker Build') {
    steps {
        echo 'Building Docker image...'
        sh '''
            export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"
            docker --version
            docker build -t sanskrit-chatbot:latest .
        '''
    }
}

        stage('Result') {
            steps {
                echo 'Sanskrit Chatbot CI pipeline completed successfully!'
            }
        }
    }
}
