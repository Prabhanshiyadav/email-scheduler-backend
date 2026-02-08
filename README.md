📧 Email Scheduler Application

A full-stack Email Scheduling System that allows users to compose emails and schedule them for future delivery. Built with a modern tech stack using Next.js, Express, TypeORM, and SQLite.

🚀 Features

✅ Schedule emails for future date & time
✅ Store email details in a database
✅ View all scheduled emails in a dashboard
✅ RESTful API backend
✅ Responsive UI built with Next.js
✅ Full TypeScript support

🖼️ Project Screenshots
🏠
![Home Page](<screenshots/Screenshot 2026-02-07 205742.png>)
📬
![Scheduled Email List](<screenshots/Screenshot 2026-02-07 205919.png>)
⚙️ 
![Backend Server Running](<screenshots/Screenshot 2026-02-07 210019.png>)

🛠️ Tech Stack
Frontend

Next.js (React Framework)

TypeScript

Axios

Tailwind CSS

Backend

Node.js

Express.js

TypeScript

TypeORM

SQLite

📂 Project Structure
reachinbox-email-scheduler/
│
├── backend/           # Express + TypeORM API
├── frontend/          # Next.js frontend
├── screenshots/       # Project screenshots for README
└── README.md

⚙️ How to Run Locally
🔹 1. Clone the Repository
git clone https://github.com/Prabhanshiyadav/email-scheduler-backend.git
cd reachinbox-email-scheduler

🔹 2. Setup Backend
cd backend
npm install
npm run dev


Backend will run on:

http://localhost:5000

🔹 3. Setup Frontend

Open a new terminal:

cd frontend
npm install
npm run dev


Frontend will run on:

http://localhost:3000

🔌 API Endpoints
Method	Endpoint	Description
POST	/api/emails/schedule	Schedule a new email
GET	/api/emails	Get all scheduled emails
🧠 How It Works

User composes an email in the frontend

Email data is sent to the backend API

Backend stores email in SQLite database

Scheduled emails are fetched and displayed in a table

🌱 Future Improvements

⏰ Background job to send emails at scheduled time

🔐 User authentication

📎 File attachments

☁️ Deploy backend & frontend to cloud

👨‍💻 Author

Prabhanshi Yadav
Full Stack Developer | AI & Software Enthusiast