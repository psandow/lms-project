# Learning Management System (LMS) Project
This is my first full‑stack application, featuring a Django‑powered backend and REST API, paired with a Vite‑bootstrapped React frontend. The project uses Python, JavaScript, HTML, and CSS throughout.
## Purpose

The purpose of this project is to design and build a fully functional full‑stack Learning Management System (LMS) that demonstrates practical competence across modern web development technologies. The application integrates a Django backend and REST API, a React (Vite) frontend, and a SQLite database, showcasing end‑to‑end development using Python, JavaScript, HTML, and CSS.

This LMS provides a structured environment where students, teachers, and admins interact with course content through clearly defined role‑based functionality. The project focuses on implementing secure authentication, intuitive navigation, accessible UI design, and clean, modular code.

## Features
- **User Authentication & Roles:**
  - Secure login and registration using Django authentication.
  - Role-based access control for students, teachers, and admins.
  - Protected API routes and frontend pages based on user permissions. 
- **Student Features:**
  - Browse all available courses with search and filtering.
  - Enroll in courses directly from the course list.
  - View a personalised dashboard showing enrolled courses.
- **Teacher Features:**
  - Create new courses with title and description.
  - Edit and manage existing courses.
  - View all courses they teach in a dedicated dashboard.
- **Admin Features:**
  - Full course management: create, edit and delete.
  - User management: edit, delete and update role
  - Access to an admin-level dashboard with system-wide visibility.
- **REST API (Django REST Framework):**
  - Token based API authentication using JWT access and refresh tokens, automatic renewal handled by frontend.
  - Separate endpoints for users to ensure clean permission handling.
  - JSON responses consumed by the React frontend.
- **Frontend (React + Vite):**
  - Responsive, multi‑page interface built with React components.
  - Role based navigation and dashboards.
  - Accessible UI with colour palette from Coolors.co
  - Interactive forms, and live filtering
- **Testing:**
  - Manual API call testing with Postman.com
  - API endpoint testing with Django test suite
  - Mock login testing with React Testing Library
  - ESLint and Prettier for JavaScript linting and quality checks

## Accessibility/Design
Wireframe design using Figma, and a consistent high contrast colour palette was chosen from Coolors.co
- **Keyboard Navigation:** Full tabbing support for users who don't use a mouse.
- **Responsive Design:** Optimised for small smartphone screens to desktop monitors.

[Figma Wireframes – LMS Project](https://www.figma.com/design/Zj6zl7RdRHQtpPI9b7ePsS/LMS-Project)

## Technologies
- Backend
  - Python
  - Django authentication, models and server-side logic
  - Django REST Framework (DRF)
  - SQLite
  - Django SimpleJWT

- Frontend
  - React
  - Vite
  - JavaScript
  - CSS3 & HTML5
  - React Router
  - Axios communication with Django API

## Deployment & How to Use
I have deployed the backend to Render and the frontend to Netlify: https://learn-lms-project.netlify.app/

## How to clone
- Prerequisites
  - Git
  - Node.js + npm
  - Python

Open a terminal eg Git Bash:
1. git clone https://github.com/psandow/lms-project.git
2. cd lms-project
3. cd frontend
4. npm install
5. npm run dev
6. cd backend (in a second terminal)
7. python -m venv venv
8. source venv/Scripts/activate
9. pip install -r requirements.txt
10. python manage.py migrate
11. python manage.py runserver
12. Then go to http://localhost:5173 in your web browser to view the frontend
13. Backend is at http://localhost:8000
