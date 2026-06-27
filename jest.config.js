/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    collectCoverage: true,
    coverageThreshold: {
        global: {
            statements: 70,
            functions: 70,
            lines: 70
        }
    },
    globalTeardown: './test/db/teardown.js',
    globalSetup: './test/db/setup.js'
}
