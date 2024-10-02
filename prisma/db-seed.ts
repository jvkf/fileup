import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const jay = await prisma.user.create({
    data: {
      email: 'git@p1pa.dev',
      name: 'Jay',
      password: 'test123',
    },
  });

  console.log(jay);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
