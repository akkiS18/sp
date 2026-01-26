# 🕷️ Spider-Verse Portfolio - Miles Morales Theme

Professional portfolio website built with Next.js 14, inspired by Spider-Man: Into the Spider-Verse (Miles Morales).

## 🚀 Features

- **Anomaly Glitch Effects** - Text glitches appear every 5-10 seconds (just like in the movie!)
- **Miles Morales Color Scheme** - Red (#E31837), Black, and White
- **React Icons** - Professional SVG icons
- **Responsive Design** - Works on all devices
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **SEO Optimized** - Meta tags and Open Graph

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
spider-portfolio-nextjs/
├── app/
│   ├── globals.css        # Global styles with animations
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page
├── components/
│   ├── Navigation.tsx     # Navigation bar
│   ├── Hero.tsx           # Hero section with glitch effect
│   ├── Skills.tsx         # Skills grid with icons
│   ├── Projects.tsx       # Project cards
│   ├── Contact.tsx        # Contact section with social links
│   └── Footer.tsx         # Footer
├── public/                # Static files (images, etc.)
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change colors:
```javascript
colors: {
  primary: '#E31837',    // Main red color
  secondary: '#000000',  // Black
  accent: '#FFFFFF',     // White
}
```

### Glitch Timing
Edit `components/Hero.tsx` to change glitch frequency:
```javascript
// Current: 5-10 seconds
const nextGlitchDelay = 5000 + Math.random() * 5000
```

### Content
Edit the following files to update content:
- `components/Hero.tsx` - Name, bio, avatar
- `components/Skills.tsx` - Skills and technologies
- `components/Projects.tsx` - Project details
- `components/Contact.tsx` - Social media links

## 🔮 Future Features (Admin Panel)

This portfolio is ready for backend integration:
- Add `/app/admin` route for admin panel
- Use Next.js API routes (`/app/api`)
- Connect to database (MongoDB, PostgreSQL, etc.)
- Add authentication (NextAuth.js)
- Manage projects dynamically

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌐 Deployment

Deploy to Vercel (recommended):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or deploy to:
- Netlify
- Railway
- AWS Amplify
- Your own server

## 📄 License

Free to use for personal and commercial projects.

## 👨‍💻 Author

Sultonxo'ja Kalonov
- Portfolio: [Your URL]
- GitHub: [@akkiS18](https://github.com/akkiS18)
- Telegram: [@S18_2003](https://t.me/S18_2003)

---

**Made with ❤️ in Uzbekistan**
