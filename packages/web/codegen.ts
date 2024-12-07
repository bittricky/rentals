import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:9000/api',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/lib/graphql/__generated__/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      presetConfig: {
        gqlTagName: 'gql'
      },
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false
      }
    }
  },
  ignoreNoDocuments: true
}
 
export default config
