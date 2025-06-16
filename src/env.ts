import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import path from 'node:path'
import { z } from 'zod'

expand(
  config({
    path: path.resolve(process.cwd(), '.env'),
  })
)

// EnvSchema is ZodEffects object, which is a wrapper around a Zod schema that allows you to add custom validation logic
const EnvSchema = z
  .object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().default(4750), // turn it in a string, then turn it in a number
    DATABASE_URL: z.string().url(), // need to be a valid url
    DATABASE_AUTH_TOKEN: z.string().optional(), // no need to specify when running locally
  })
  .superRefine((input, ctx) => {
    // input: the fully parsed object from your schema
    // ctx: the context object that you can use to add issues to the schema
    // if we are in production mode, and the DATABASE_AUTH_TOKEN is not set, we add an issue to the schema
    if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'undefined',
        path: ['DATABASE_AUTH_TOKEN'], // custom error directly onto the DATABASE_AUTH_TOKEN property
        message: "Must be set when NODE_ENV is 'production'",
      })
    }
  })

// get the type of EnvSchema
// other module can import this type
export type env = z.infer<typeof EnvSchema>

let env: env

try {
  env = EnvSchema.parse(process.env)
} catch (e) {
  const error = e as z.ZodError
  console.error('❌ Invalid environment variables ❌')
  // error.flatten().fieldErrors, zod error format
  console.error(error.flatten().fieldErrors)
  process.exit(1)
}

export default env
