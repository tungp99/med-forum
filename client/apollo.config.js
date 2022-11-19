module.exports = {
  client: {
    includes: ['src/**/*.{ts,tsx}'],
    excludes: ['**/node_modules', '**/__tests__', '**/generated'],
    service: {
      localSchemaFile: 'src/system/generated/schema.graphql',
    },
  },
}
