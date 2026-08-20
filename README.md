# 🎓 SkillBridge

> **Learn. Connect. Grow.**

SkillBridge is a full-stack mentoring platform that connects **students with mentors** for personalized skill-based learning.

Students can discover mentors, explore their skills, check available timings, book sessions, make payments, join online sessions through Google Meet, and provide reviews.

Mentors can manage their profiles, skills, availability, bookings, meeting links, and mentoring sessions.

---

## ✨ What SkillBridge Does

```text
                    ┌─────────────────────┐
                    │      SkillBridge    │
                    └──────────┬──────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
        👨‍🎓 STUDENT                         👨‍🏫 MENTOR
              │                                 │
        Find Mentor                       Create Profile
              │                                 │
        View Skills                       Add Skills
              │                                 │
     View Availability                  Set Availability
              │                                 │
       Book Session                    Manage Bookings
              │                                 │
         Payment                       Accept / Reject
              │                                 │
       Google Meet                     Add Meet Link
              │                                 │
          Review                         Complete Session
              │                                 │
              └──────────────┬──────────────────┘
                             │
                       🎓 Skill Learning
```

---

# 🚀 Main Features

## 👨‍🎓 Student

* Register and login
* Browse mentors
* View mentor profiles
* View mentor skills
* View mentor availability
* Book mentoring sessions
* View booking status
* Cancel bookings
* Make payments
* Join Google Meet sessions
* Review and rate mentors

## 👨‍🏫 Mentor

* Register and login
* Manage mentor profile
* Add skills
* Remove skills
* Create availability slots
* Update availability
* Delete availability
* View student bookings
* Accept or reject bookings
* Add Google Meet links
* Mark sessions as completed

## 🛠️ Admin

* Admin authentication
* Create skills
* View skills
* Update skills
* Delete skills

---

# 🧩 Booking Flow

The complete mentoring flow is:

```text
Student
   │
   ▼
Find Mentor
   │
   ▼
View Mentor Profile
   │
   ├── Skills
   │
   └── Availability
   │
   ▼
Book Session
   │
   ▼
PENDING
   │
   ▼
Mentor Accepts
   │
   ▼
ACCEPTED
   │
   ▼
Payment
   │
   ▼
Mentor Adds Google Meet Link
   │
   ▼
Student Joins Meeting
   │
   ▼
Mentoring Session
   │
   ▼
COMPLETED
   │
   ▼
Student Review
```

---

# 🏗️ Technology Stack

| Layer             | Technology   |
| ----------------- | ------------ |
| Frontend          | React        |
| Styling           | Tailwind CSS |
| Routing           | React Router |
| API Calls         | Axios        |
| Icons             | Lucide React |
| Backend           | Node.js      |
| Framework         | Express.js   |
| Authentication    | JWT          |
| Validation        | Zod          |
| Password Security | bcrypt       |
| Database          | PostgreSQL   |
| ORM               | Prisma       |
| Version Control   | Git & GitHub |
| Online Sessions   | Google Meet  |

---

# 📁 Project Structure

```text
SkillBridge/
│
├── 📂 backend/
│   │
│   ├── 📂 prisma/
│   │   └── schema.prisma
│   │
│   ├── 📂 src/
│   │   │
│   │   ├── 📂 config/
│   │   │   └── prisma.js
│   │   │
│   │   ├── 📂 middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── role.middleware.js
│   │   │
│   │   ├── 📂 modules/
│   │   │   │
│   │   │   ├── 📂 auth/
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.routes.js
│   │   │   │   ├── auth.service.js
│   │   │   │   └── auth.validation.js
│   │   │   │
│   │   │   ├── 📂 skill/
│   │   │   │   ├── skill.controller.js
│   │   │   │   ├── skill.routes.js
│   │   │   │   ├── skill.service.js
│   │   │   │   └── skill.validation.js
│   │   │   │
│   │   │   ├── 📂 mentor/
│   │   │   │   ├── mentor.controller.js
│   │   │   │   ├── mentor.routes.js
│   │   │   │   ├── mentor.service.js
│   │   │   │   └── mentor.validation.js
│   │   │   │
│   │   │   ├── 📂 availability/
│   │   │   │   ├── availability.controller.js
│   │   │   │   ├── availability.routes.js
│   │   │   │   ├── availability.service.js
│   │   │   │   └── availability.validation.js
│   │   │   │
│   │   │   ├── 📂 booking/
│   │   │   │   ├── booking.controller.js
│   │   │   │   ├── booking.routes.js
│   │   │   │   ├── booking.service.js
│   │   │   │   └── booking.validation.js
│   │   │   │
│   │   │   ├── 📂 review/
│   │   │   │   ├── review.controller.js
│   │   │   │   ├── review.routes.js
│   │   │   │   ├── review.service.js
│   │   │   │   └── review.validation.js
│   │   │   │
│   │   │   └── 📂 payment/
│   │   │       ├── payment.controller.js
│   │   │       ├── payment.routes.js
│   │   │       ├── payment.service.js
│   │   │       └── payment.validation.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── 📂 frontend/
│   │
│   ├── 📂 src/
│   │   │
│   │   ├── 📂 components/
│   │   │   └── reusable UI components
│   │   │
│   │   ├── 📂 pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Mentors.jsx
│   │   │   ├── MentorProfile.jsx
│   │   │   ├── MentorMyProfile.jsx
│   │   │   ├── MentorBookings.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Payment.jsx
│   │   │   └── ...
│   │   │
│   │   ├── 📂 services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── package.json
├── package-lock.json
└── README.md
```

---

# 🔐 Authentication

SkillBridge uses **JWT-based authentication**.

```text
Register
   ↓
Login
   ↓
Credentials Verified
   ↓
JWT Token Generated
   ↓
Token Stored by Frontend
   ↓
Protected API Request
   ↓
Authentication Middleware
   ↓
Role Verification
   ↓
Protected Resource
```

### User Roles

```text
STUDENT
MENTOR
ADMIN
```

---

# 📅 Availability System

Mentors can create their available time slots.

Example:

```text
Date: 21 Aug 2026

10:00 AM ───────── 11:00 AM
       Available
```

The system prevents overlapping availability slots.

Students can view the mentor's available timings before booking.

---

# 📦 Booking Status

```text
PENDING
   │
   ├── ACCEPTED
   │      │
   │      └── COMPLETED
   │
   ├── REJECTED
   │
   └── CANCELLED
```

### Meaning

| Status      | Meaning            |
| ----------- | ------------------ |
| `PENDING`   | Waiting for mentor |
| `ACCEPTED`  | Mentor accepted    |
| `REJECTED`  | Mentor rejected    |
| `CANCELLED` | Student cancelled  |
| `COMPLETED` | Session finished   |

---

# 🎥 Google Meet

After accepting a booking, the mentor can add a Google Meet link.

The student can then use:

```text
Join Google Meet
```

to enter the mentoring session.

The meeting link is shown while the booking is active and is hidden after the session is completed.

---

# 🗄️ Database

SkillBridge uses:

**PostgreSQL + Prisma ORM**

Main entities include:

```text
User
 │
 ├── Student
 │
 └── Mentor
       │
       ├── MentorSkill
       │       └── Skill
       │
       ├── Availability
       │
       └── Booking
               │
               ├── Payment
               │
               └── Review
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/sushmitha-cse/SkillBridge.git
cd SkillBridge
```

## 2. Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
DATABASE_URL="your_postgresql_database_url"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

Run Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

## 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL provided by Vite.

---

# 🔗 Main API Modules

```text
/api/auth
/api/skills
/api/mentors
/api/availability
/api/bookings
/api/reviews
/api/payments
```

---

# 🧪 Development Workflow

```text
Create Feature
      ↓
Develop
      ↓
Test
      ↓
git status
      ↓
git add .
      ↓
git commit
      ↓
git push
```

Useful commands:

```bash
git status
git add .
git commit -m "Your message"
git push origin main
```

---

# 🌱 Future Improvements

* Automatic Google Meet generation
* Real payment gateway integration
* Email notifications
* Mentor search and filtering
* Student-Mentor chat
* Notification system
* Profile images
* Advanced dashboards
* Deployment
* Mobile responsive improvements

---

# 👩‍💻 Project Purpose

SkillBridge is built as a **full-stack learning and mentoring platform** to provide students with an easy way to find mentors, schedule sessions, learn skills, and receive personalized guidance.

---

## ⭐ SkillBridge

**Learn skills. Connect with mentors. Build your future.**

