require("dotenv/config");

const prisma = require("./prisma");

async function findAdmin() {
  try {
    const admins = await prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    console.log(admins);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

findAdmin();
