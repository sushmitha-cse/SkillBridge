const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../../config/prisma");

const JWT_SECRET = process.env.JWT_SECRET || "skillbridge_secret_key";

async function registerUser(data) {
  const { name, email, password, phone, role } = data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    },
  });

  // Create profile based on role
  if (role === "STUDENT") {
    await prisma.student.create({
      data: {
        userId: user.id,
      },
    });
  }

  if (role === "MENTOR") {
    await prisma.mentor.create({
      data: {
        userId: user.id,
      },
    });
  }

  // Don't send password to frontend
  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

async function loginUser(email, password) {
  // Find user
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Don't send password
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
}

module.exports = {
  registerUser,
  loginUser,
};
