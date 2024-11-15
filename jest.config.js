/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    collectCoverage: true,
    coverageThreshold: {
        global: {
            statements: 70,
            branches: 70,
            functions: 70,
            lines: 70
        }
    }
}
