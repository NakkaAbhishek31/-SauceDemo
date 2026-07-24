pipeline {
    agent any

    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Choose the browser for the Playwright test run.'
        )

        string(
            name: 'TEST_TARGET',
            defaultValue: 'tests',
            description: 'Enter tests to run. Example: tests/cart.spec.ts. Keep tests to run all tests.'
        )

        string(
            name: 'WORKERS',
            defaultValue: '1',
            description: 'Number of parallel test workers.'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'call npm.cmd ci'
            }
        }

        stage('Install Playwright browser') {
            steps {
                bat 'call npx.cmd playwright install %BROWSER%'
            }
        }

        stage('Run Playwright tests') {
            steps {
                bat 'call npx.cmd playwright test "%TEST_TARGET%" --project=%BROWSER% --workers=%WORKERS%'
            }
        }
    }

   post {
    always {
        allure commandline: 'Allure 2.44.0',
               includeProperties: false,
               results: [[path: 'allure-results']]

        archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
    }
}
}