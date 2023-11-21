import SwaggerParser from '@apidevtools/swagger-parser'
import type { OpenAPIObject } from 'openapi3-ts'
import { resolveConfig } from 'prettier'
import { generateZodClientFromOpenAPI } from 'openapi-zod-client'

const main = async () => {
  const openApiDoc = (await SwaggerParser.parse('./src/petstore.json')) as OpenAPIObject
  const prettierConfig = await resolveConfig('./')
  const result = await generateZodClientFromOpenAPI({
    openApiDoc,
    distPath: './src/petstore-client.ts',
    prettierConfig,
    options: {
      shouldExportAllTypes: true,
    },
  })
  console.log(result)
}

main()
