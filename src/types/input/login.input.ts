import { inputObjectType } from 'nexus'

export const LoginInput = inputObjectType({
  name: 'LoginInput',
  description: 'Input for logging in a user',
  definition(t) {
    t.string('username', { required: true })
    t.string('password', { required: true })
  }
})
