import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'],
})

export function context(req) {
  return {
    ...req,
    prisma,
  }
}
