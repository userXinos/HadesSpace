import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json' assert {type: 'json'};

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    moduleDirectories: ['node_modules', '<rootDir>'],
    testMatch: ['**/tests/**/*.[jt]s?(x)'],
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
};

