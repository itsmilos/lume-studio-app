💅 Lumé Studio

A full-stack beauty salon booking app. Clients book appointments through a slick multi-step form, admins manage everything from a dashboard — no double-bookings, no chaos.

📦 Stack


Next.js
MongoDB + Mongoose
NextAuth.js
Tailwind CSS
Framer Motion


✨ Quick start

bashnpm install
npm run dev

You'll need a .env.local with your MongoDB URI and NextAuth secret before anything works.

📅 Booking flow


Pick a service — browse and select from available treatments
Multi-step form — fills out details across steps, keeps state the whole way through
Conflict check — the backend won't let two people grab the same slot
Confirmation — booking locked in, no double-booking drama


🎨 Look & feel

Black, white, and gold (#DE9E36), with Playfair Display setting the tone. Elegant over flashy — the kind of salon that makes you sit up straighter just looking at the site.

🤖 How it works

Bookings are validated server-side before they're written to MongoDB — the API checks existing appointments for the requested time slot and rejects overlaps before they happen. The admin dashboard cycles booking status (pending → confirmed → done) with a single click, backed by Mongoose queries. Framer Motion handles the stagger animations on page load, giving lists and cards a smooth cascading entrance instead of popping in all at once.

📁 Project structure

src/
  app/
    admin/              # Admin dashboard, protected routes
    api/                # Booking + auth route handlers
    booking/            # Multi-step booking flow
  components/
    booking/            # Form steps, progress indicator
    ui/                 # Shared UI pieces
  lib/
    mongodb.ts          # DB connection
    auth.ts             # NextAuth config

👤 Author

Milos Lazendic — github.com/itsmilos
