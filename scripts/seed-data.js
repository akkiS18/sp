// scripts/seed-data.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Ma\'lumotlarni bazaga yuklash boshlandi...')

  // Skills seeding
  const skills = [
    {
      name: 'Frontend',
      icon: 'FaReact',
      items: ['React Native', 'React.js', 'Next.js', 'Expo'],
      order: 1
    },
    {
      name: 'Design',
      icon: 'FaPalette',
      items: ['UI/UX', 'Responsive', 'Animations', 'Figma'],
      order: 2
    },
    {
      name: 'Telegram',
      icon: 'FaTelegramPlane',
      items: ['Bot Development', 'Telegraf.js', 'MenuBuilder', 'Automation'],
      order: 3
    },
    {
      name: 'APIs',
      icon: 'IoGlobeOutline',
      items: ['Google Maps', 'HERE & TomTom', 'Deezer API', 'REST APIs'],
      order: 4
    },
    {
      name: 'Tools',
      icon: 'FaGithub',
      items: ['Git & GitHub', 'Postman', 'VS Code', 'NPM'],
      order: 5
    },
    {
      name: 'Languages',
      icon: 'SiJavascript',
      items: ['JavaScript', 'TypeScript', 'HTML/CSS', 'Node.js'],
      order: 6
    }
  ]

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: `skill-${skill.name.toLowerCase()}` },
      update: skill,
      create: {
        id: `skill-${skill.name.toLowerCase()}`,
        ...skill
      }
    })
  }

  // Projects seeding
  // Projects seeding
  const projects = [
    {
      title: 'AKADEMX',
      type: 'Freelance platforma (talabalar uchun)',
      description: "Xavfsiz escrow to'lov tizimi orqali ishlaydigan freelance platforma.",
      tech: ['Next.js', 'NeonDB', 'AWS'],
      liveUrl: 'https://akademx.uz',
      githubUrl: '',
      published: true,
      order: 1
    },
    {
      title: 'ENVOY',
      type: 'Mobil logistika platformasi',
      description: "Yuk beruvchilar va haydovchilarni bog'laydi. App Store va Play Market da mavjud.",
      tech: ['React Native', 'Expo', 'HERE Maps'],
      liveUrl: 'https://play.google.com/store',
      githubUrl: '',
      published: true,
      order: 2
    }
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: `project-${project.title.toLowerCase()}` },
      update: project,
      create: {
        id: `project-${project.title.toLowerCase()}`,
        ...project
      }
    })
  }

  console.log('✅ Barcha ma\'lumotlar muvaffaqiyatli yuklandi!')

  // Profile seeding
  await prisma.profile.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      name: "SULTONXO'JA",
      role: 'Frontend Developer',
      bio: 'React Native va React.js da ilovalar yaratuvchi dasturchi. Mobil ilovalar va web saytlarni zamonaviy texnologiyalar bilan hayotga tatbiq etaman. Har bir loyihaga kreativlik va professionallik bilan yondashaman.',
      email: 'sulton.kalonov@icloud.com',
      github: 'https://github.com/akkiS18',
      linkedin: 'https://www.linkedin.com/in/sultonxo%CA%BBja-kalonov-268408325/',
      telegram: 'https://t.me/S18_2003',
      resumeUrl: '#'
    }
  })
  console.log('✅ Profile ma\'lumotlari yuklandi!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
