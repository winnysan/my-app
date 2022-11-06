import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'],
})

export const context = {
  prisma: prisma,
}
