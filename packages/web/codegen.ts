import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:9000/api',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/lib/graphql/__generated__/types.ts': {
      plugins: ['typescript'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      }
    },
    './src/lib/graphql/__generated__/operations.ts': {
      preset: 'import-types',
      presetConfig: {
        typesPath: './types'
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      }
    }
  },
  ignoreNoDocuments: true
}

export default config
