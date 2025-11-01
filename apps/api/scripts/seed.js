const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

async function seed() {
  try {
    const defaultUser = {
      name: 'Admin',
      email: 'admin@boost.ai',
      password: 'Admin123',
    };

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: defaultUser.email },
    });

    if (existingUser) {
      console.log('Default user already exists');
      return;
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(defaultUser.password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: defaultUser.name,
        email: defaultUser.email,
        password: hashedPassword,
      },
    });

    console.log('Default user created successfully:', {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
