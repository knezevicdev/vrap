const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
    {
        serverUrl: "https://sonarcloud.io",
        token: "f438072deec309eca7adc118ff8aa41cc1c15e17",
        options: {
            "sonar.sources": "./src",
            "sonar.exclusions": "**/__tests__/**",
            "sonar.tests": "./src/__tests__",
            "sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
            "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
            "sonar.testExecutionReportPaths": "reports/test-report.xml",
        },
    },
    () => {},
);