// scripts/create-admin.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Creating admin user...')
    
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin',
      },
    })
    
    console.log('✅ Admin user created successfully!')
    console.log('Email:', admin.email)
    console.log('Password: admin123')
    console.log('\n⚠️  Please change this password after first login!')
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })