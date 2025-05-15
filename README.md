# 🌐 RouteX

**Live Site:** [RouteX](https://visa-portal.netlify.app)

## 🧭 Overview

**RouteX** is a dynamic web application designed to simplify the visa process. Users can check visa requirements, apply online, and track their visa status. Built with performance and user experience in mind, RouteX offers a secure, responsive, and feature-rich platform for global travelers.

---

## ✨ Features

- 🔐 **User Authentication**  
  Secure login & registration with Email/Password and Google sign-in (Firebase Auth).

- 📝 **Visa Application**  
  Apply for visas with simple and intuitive forms.

- 🗂️ **Visa Management**  
  Users can add, view, update, or delete visa entries from their dashboard.

- 🌍 **Dynamic Visa List**  
  Browse and filter available visas with country, type, fee, processing time, and application method.

- 📦 **Visa Tracking**  
  Monitor all applications with status updates and cancel if needed.

- 💡 **Theme Support**  
  Toggle between Dark and Light modes for a personalized experience.

- 📱 **Responsive Design**  
  Mobile-first UI compatible with all devices.

- 🔔 **Enhanced UX**  
  Integrated animations, toast notifications, and smooth navigation.

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Tailwind CSS
- React Router
- Lottie React (for animations)
- Recharts (data visualization applied in future)

### Backend

- Node.js
- Express.js
- MongoDB

### Authentication

- Firebase Authentication (Email/Password & Google OAuth)

---

## ⚙️ Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/)
- Set up a [MongoDB](https://www.mongodb.com/) database
- Configure [Firebase](https://firebase.google.com/) for authentication

---

### Installation & Running the Project

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/RouteX.git
cd RouteX
```

#### 2. Setup and run the client (frontend)

```
cd client
npm install
npm run dev

```

#### 🔑 Environment Variables

```
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_API_BASE_URL=
```
