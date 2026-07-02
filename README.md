Lumé Studio

A full-stack beauty salon booking application built as a portfolio project. Clients can book appointments through a multi-step form, while admins have a dedicated dashboard to manage bookings.

Show Image
Show Image
Show Image
Show Image

🌐 Live Demo

[lume-studio.vercel.app <!-- replace with actual link -->](https://lume-studio-ashen.vercel.app/)

✨ Features


Multi-step booking form – book appointments through several steps, with form state persisted between steps
Conflict detection – prevents double-booking by checking for overlapping appointment times
Admin dashboard – view and manage all bookings, with the ability to cycle through booking statuses
Authentication – login and protected admin routes powered by NextAuth
Animations – smooth stagger animations on content load (Framer Motion)
Responsive design – adapted for all screen sizes


🛠️ Tech Stack


Frontend: Next.js, React, Tailwind CSS, Framer Motion
Backend: Next.js API routes
Database: MongoDB (Mongoose ODM), hosted on MongoDB Atlas
Authentication: NextAuth.js
Deployment: Vercel


🎨 Design

The visual identity follows an elegant black/white/gold (#DE9E36) color palette, paired with the Playfair Display font for a luxurious, salon-like feel.

🚀 Running Locally


Clone the repository


bashgit clone https://github.com/your-username/lume-studio.git
cd lume-studio


Install dependencies


bashnpm install


Create a .env.local file and add the required environment variables


envMONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000


Run the development server


bashnpm run dev

The app will be available at http://localhost:3000


📚 What I Learned

This was my first serious full-stack project, and through building it I learned:


Working with server and client components in the Next.js App Router
Managing complex, multi-step form state
Implementing conflict detection for appointment scheduling
Deploying a full-stack app (Vercel + MongoDB Atlas) and troubleshooting issues like localhost URLs in server components and prerendering failures


📄 License

This project was built for educational purposes as part of a portfolio.
