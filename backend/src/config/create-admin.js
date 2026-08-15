require("dotenv/config");

const bcrypt = require("bcrypt");
const prisma = require("./prisma");

async function createAdmin() {
  try {
    const email = "admin@skillbridge.com";
    const password = "admin123";
    const name = "SkillBridge Admin";

    // Check whether admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Admin created successfully!");
    console.log({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    console.error("Failed to create admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
