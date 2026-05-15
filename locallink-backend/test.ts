import { prisma } from './src/lib/prisma'; prisma.job.count().then(console.log).finally(() => prisma.\$disconnect())
