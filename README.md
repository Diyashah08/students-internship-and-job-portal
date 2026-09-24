# InternConnect – Student Internship & Job Portal

**InternConnect** is a modern, responsive full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed specifically for college students, university placement cells, and corporate recruiters. 

---

## 🌟 Key Features

### 🎓 1. Student Portal
- **Registration & Authentication**: Student sign-up with college details, degree, graduation year, technical skills, and JWT session handling.
- **Student Dashboard**: Real-time profile completion gauge, quick metric cards, personalized job recommendations matching student skills, and recent applications tracker.
- **Dynamic Job & Internship Search**:
  - Search by keyword (title, skills, company)
  - Filter by Type (**Internship** vs **Full-time Job**)
  - Filter by Work Mode (**Remote**, **On-site**, **Hybrid**)
  - Filter by Category / Domain
  - Filter by Location
  - Dynamic sorting by latest, oldest, or deadline
- **Job Details & 1-Click Application**: Detailed job overview, stipend/salary, duration, eligibility, responsibilities, requirements, and modal application form with duplicate prevention.
- **My Applications**: Track status pipeline (**Applied**, **Under Review**, **Shortlisted**, **Interview**, **Selected**, **Rejected**) with submitted cover letter & resume preview.
- **Saved Opportunities**: Bookmark and manage saved internships/jobs.
- **Student Profile Management**: Full personal, academic, and skills tag editor with resume upload and LinkedIn/GitHub links.
- **Live Notifications**: Instant alerts when recruiter updates application status.

---

### 💼 2. Recruiter / Employer Portal
- **Employer Registration**: Company name, website, location, industry, and contact info.
- **Recruiter Dashboard**: Total postings, active vs. closed listings, total applications, and recent applicant activity feed.
- **Post Internship / Job**: Rich form with stipend, salary, duration, skills, eligibility, responsibilities, requirements, and deadline.
- **Manage Postings**: Real-time status toggles (**Active** / **Closed**), edit listing, delete listing, and applicant count.
- **Applicant Review Pipeline**: View all candidates per position with academic details, skills, resume preview, and 1-click status updates (triggers student notification).
- **Company Profile**: Brand logo upload, corporate bio, and website configuration.

---

### 🛡️ 3. Platform Administration (Admin)
- **Admin Dashboard**: Comprehensive platform metrics (total students, recruiters, companies, internships, jobs, applications).
- **User Management**: Search, filter, and moderate student and recruiter accounts.
- **Opportunity Moderation**: Review all platform job postings, approve pending listings, close or delete inappropriate posts.
- **Platform Applications Audit**: System-wide candidate application tracking.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Tailwind CSS, Lucide React, Axios |
| **Backend** | Node.js, Express.js, RESTful API Architecture |
| **Database** | MongoDB & Mongoose ODM (with seamless auto-fallback for local testing) |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt password hashing |
| **File Storage** | Multer (Resume PDF & Company Logo uploads) |

---

## 📁 Project Structure

```
internconnect/
├── client/                      # React Frontend (Vite)
│   ├── src/
│   │   ├── components/          # Navbar, Footer, StatusBadge, JobCard, ApplyModal, Notifications, Loader
│   │   ├── context/             # AuthContext, NotificationContext
│   │   ├── layouts/             # MainLayout, DashboardLayout
│   │   ├── pages/               # Home, Jobs, JobDetails, Companies, About, Login, Register
│   │   │   ├── student/         # StudentDashboard, StudentProfile, MyApplications, SavedJobs
│   │   │   ├── recruiter/       # RecruiterDashboard, PostJob, ManageJobs, JobApplications, CompanyProfile
│   │   │   └── admin/           # AdminDashboard, ManageUsers, ManageJobsAdmin, AllApplicationsAdmin
│   │   ├── services/            # Axios API services (auth, jobs, applications, savedJobs, notifications, admin)
│   │   ├── utils/               # Constants, helpers, formatters
│   │   ├── App.jsx              # Routing configuration
│   │   ├── index.css            # Tailwind directives & custom CSS
│   │   └── main.jsx             # React entry point
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                      # Node.js + Express Backend
│   ├── config/                  # MongoDB connection with smart fallback
│   ├── controllers/             # Auth, Student, Recruiter, Job, Application, SavedJob, Notification, Admin
│   ├── middleware/              # JWT auth, Role authorization, Multer upload, Error handler
│   ├── models/                  # User, Company, Job, Application, SavedJob, Notification
│   ├── routes/                  # Express API routes
│   ├── seed/                    # Seed script & autoSeed module with TCS, Infosys, Wipro, Accenture, startups
│   ├── uploads/                 # Static uploads directory
│   ├── server.js                # Server entry point
│   └── package.json
│
├── package.json                 # Root orchestrator with concurrently scripts
├── .env.example
├── .env
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### 1. Installation
Install all dependencies for root, server, and client with a single command:
```bash
npm run install:all
```
*(Or run `npm install` inside root, `server/`, and `client/` respectively)*

### 2. Environment Configuration
Create a `.env` file in root or `server/` (a template is pre-configured):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/internconnect
JWT_SECRET=internconnect_super_secret_jwt_key_2024_secure_fsd_project
CLIENT_URL=http://localhost:5173
```
> **Note**: If you do not have local MongoDB running, the server automatically starts an in-memory MongoDB instance with pre-seeded demo data for 100% plug-and-play evaluation.

### 3. Run the Full Stack Application
Start both the Express backend (`http://localhost:5000`) and the Vite React frontend (`http://localhost:5173`) simultaneously:
```bash
npm run dev
```

---

## 🔑 Demo Login Credentials

The application comes with 1-click demo login buttons on the Login page, or you can use the credentials below:

| Role | Email | Password | Details |
|---|---|---|---|
| **🎓 Student** | `student@demo.com` | `password123` | Aarav Patel (IIT Bombay, CS 2025, React & MERN) |
| **💼 Recruiter** | `recruiter@demo.com` | `password123` | Priya Sharma (Tech Mahindra / Partner enterprise) |
| **💼 Recruiter 2** | `recruiter2@demo.com` | `password123` | Vikram Malhotra (TCS / Infosys hiring lead) |
| **🛡️ Admin** | `admin@demo.com` | `admin123` | System Platform Administrator |

---

## 📡 REST API Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new Student or Recruiter user
- `POST /api/auth/login` - Authenticate user & receive JWT token
- `GET /api/auth/me` - Get authenticated user & company snapshot *(Protected)*

### Opportunities & Jobs (`/api/jobs`)
- `GET /api/jobs/featured` - Get categories, top companies & homepage metrics
- `GET /api/jobs` - Search and filter jobs (`q`, `type`, `workMode`, `category`, `location`, `sort`)
- `GET /api/jobs/:id` - Get opportunity details & application count
- `POST /api/jobs` - Create a new internship or job *(Recruiter / Admin)*
- `PUT /api/jobs/:id` - Update job details *(Recruiter / Admin)*
- `DELETE /api/jobs/:id` - Delete job and related applications *(Recruiter / Admin)*
- `PATCH /api/jobs/:id/status` - Toggle job Active / Closed status *(Recruiter / Admin)*

### Candidate Applications (`/api/applications`)
- `POST /api/applications` - Submit an application with resume & cover letter *(Student)*
- `GET /api/applications/my` - Get logged-in student's applications *(Student)*
- `GET /api/applications/check/:jobId` - Check if already applied *(Student)*
- `GET /api/applications/job/:jobId` - Get all applicants for a specific job *(Recruiter / Admin)*
- `PUT /api/applications/:id/status` - Update applicant status & trigger student alert *(Recruiter / Admin)*

### Student Profile & Dashboard (`/api/students`)
- `GET /api/students/profile` - Get student profile & completion percentage *(Student)*
- `PUT /api/students/profile` - Update profile, skills, and links *(Student)*
- `POST /api/students/upload-resume` - Upload resume file *(Student)*
- `GET /api/students/dashboard` - Get metric counters & skill-matched recommendations *(Student)*

### Saved Opportunities (`/api/saved-jobs`)
- `GET /api/saved-jobs` - Get student's bookmarked jobs *(Student)*
- `GET /api/saved-jobs/check/:jobId` - Check if a specific job is saved *(Student)*
- `POST /api/saved-jobs/:jobId` - Bookmark an opportunity *(Student)*
- `DELETE /api/saved-jobs/:jobId` - Remove bookmark *(Student)*

### Notifications (`/api/notifications`)
- `GET /api/notifications` - Get user alerts & unread count *(Protected)*
- `PUT /api/notifications/:id/read` - Mark single notification as read *(Protected)*
- `PUT /api/notifications/read-all` - Mark all notifications as read *(Protected)*
- `DELETE /api/notifications/:id` - Delete notification *(Protected)*

### Platform Admin (`/api/admin`)
- `GET /api/admin/stats` - Platform-wide statistics & counts *(Admin)*
- `GET /api/admin/users` - Get all users with search and role filters *(Admin)*
- `DELETE /api/admin/users/:id` - Delete user and cascade cleanup *(Admin)*
- `GET /api/admin/jobs` - View all platform job listings *(Admin)*
- `PUT /api/admin/jobs/:id/status` - Approve / moderate job listing *(Admin)*
- `GET /api/admin/applications` - Audit all platform applications *(Admin)*

---

## 🎓 Academic / FSD Project Submission Note

This project is structured cleanly according to standard full-stack software development best practices, featuring complete separation of concerns, secure password hashing, JWT bearer tokens, role authorization guards, dynamic frontend routing, responsive UI, and clean data modeling.
