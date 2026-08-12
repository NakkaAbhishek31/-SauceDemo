pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
        allure 'Allure'
    }

    parameters {
        choice(
            name: 'BROWSER',
            choices: [
                'chromium',
                'firefox',
                'webkit'
            ],
            description:
                'Choose the browser'
        )

        string(
            name: 'TEST_TARGET',
            defaultValue: 'tests',
            description:
                'Example: tests/cart.spec.ts or tests'
        )

        choice(
            name: 'WORKERS',
            choices: [
                '1',
                '2',
                '4'
            ],
            description:
                'Number of Playwright workers'
        )
    }

    options {
        skipDefaultCheckout(true)
        timestamps()
        disableConcurrentBuilds()

        timeout(
            time: 90,
            unit: 'MINUTES'
        )

        buildDiscarder(
            logRotator(
                numToKeepStr: '10'
            )
        )
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Clean and Checkout') {
            steps {
                // Removes previous Allure results and
                // every other old workspace file.
                deleteDir()

                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                bat 'call node --version'
                bat 'call npm.cmd --version'
                bat 'call npx.cmd playwright --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'call npm.cmd ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat '''
                    call npx.cmd playwright install %BROWSER%
                '''
            }
        }

        stage('Clean Test Reports') {
            steps {
                bat '''
                    if exist allure-results rmdir /s /q allure-results
                    if exist allure-report rmdir /s /q allure-report
                    if exist playwright-report rmdir /s /q playwright-report
                    if exist test-results rmdir /s /q test-results
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    def testTarget =
                        params.TEST_TARGET.trim()

                    if (!testTarget) {
                        testTarget = 'tests'
                    }

                    if (
                        testTarget.contains('..')
                    ) {
                        error(
                            'Parent directory references are not allowed'
                        )
                    }

                    def testCommand =
                        'call npx.cmd playwright test ' +
                        "\"${testTarget}\" " +
                        "--project=${params.BROWSER} " +
                        "--workers=${params.WORKERS} " +
                        '--retries=0'

                    echo(
                        "Running: ${testCommand}"
                    )

                    catchError(
                        buildResult: 'FAILURE',
                        stageResult: 'FAILURE'
                    ) {
                        bat testCommand
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (
                    fileExists(
                        'allure-results'
                    )
                ) {
                    echo(
                        'Publishing fresh Allure report'
                    )

                    allure([
                        includeProperties: false,
                        jdk: '',
                        commandline: 'Allure',
                        results: [[
                            path: 'allure-results'
                        ]]
                    ])
                } else {
                    echo(
                        'No Allure results were generated'
                    )
                }
            }

            archiveArtifacts(
                artifacts:
                    'allure-report/**, ' +
                    'playwright-report/**, ' +
                    'test-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'All Playwright tests passed'
        }

        unsuccessful {
            echo 'Some Playwright tests failed'
        }
    }
}