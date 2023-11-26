import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper({
    '@config': ['./config'],
    '@config/*': ['./config/*'],
    '@db/*': ['./db/*'],
    '@helpers/*': ['./helpers/*'],
    '@modules/*': ['./modules/*'],
    '@constants/*': ['./constants/*'],
    '@middlewares/*': ['./middlewares/*'],
  }),
};

export default jestConfig;
