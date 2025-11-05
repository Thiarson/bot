module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/test', '<rootDir>/src'],
    testMatch: ['**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleNameMapper: {
        '^@config/(.*)$': '<rootDir>/config/$1',
        '^@models/(.*)$': '<rootDir>/repo/$1',
        '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',

        '^database/(.*)$': '<rootDir>/database/$1',
        '^model/(.*)$': '<rootDir>/model/$1',
    },
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/server.ts',
    ],
};
