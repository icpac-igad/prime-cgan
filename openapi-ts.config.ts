// see https://fastapi.tiangolo.com/advanced/generate-clients/#openapi-client-generators

import { defineConfig, defaultPlugins } from '@hey-api/openapi-ts';
import * as dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

export default defineConfig({
    client: '@hey-api/client-fetch',
    input: env.OPENAPI_URL || '',
    experimentalParser: true,
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: 'src/client'
    },
    plugins: [
        '@hey-api/transformers',
        '@hey-api/typescript',
        {
            dates: true,
            name: '@hey-api/transformers'
        },
        {
            enums: 'javascript',
            name: '@hey-api/typescript'
        }
    ]
});
