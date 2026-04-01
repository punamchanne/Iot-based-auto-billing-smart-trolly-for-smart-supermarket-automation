# IoT-based Auto Billing Smart Trolley for Smart Supermarket Automation

A premium, real-time QR-based billing system designed to automate supermarket checkout processes using an integrated smart trolley experience.

## 🚀 Features

- **Integrated Live QR Scanner**: Real-time product scanning directly from the dashboard/trolley view.
- **Smart Cart Synchronization**: Scanned items are instantly added to the basket with real-time total value calculation.
- **Role-Based Access**: Specialized dashboards for Admins, Cashiers, and Customers.
- **Mobile Responsive Design**: Optimized for mobile devices to simulate a real-world handheld trolley experience.
- **Automated Billing**: Generates orders and manages inventory with high-end premium UI.

## 🛠️ Tech Stack

- **Frontend**: Vite + React, Tailwind CSS, Lucide-React symbols.
- **Scanner**: Html5-Qrcode (Direct Camera API).
- **Backend**: Node.js & Express.
- **Database**: MongoDB (Local/Atlas).
- **Authentication**: JWT (JSON Web Tokens).

## 📂 Project Structure

```bash
├── backend
│   ├── config (DB configuration)
│   ├── controllers (Logic)
│   ├── models (Schemas)
│   ├── routes (API Endpoints)
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components (UI Layouts)
│   │   ├── pages (App Screens)
│   │   ├── context (State Management)
│   │   └── services (API Calls)
│   └── public
└── .gitignore
```

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/punamchanne/Iot-based-auto-billing-smart-trolly-for-smart-supermarket-automation.git
cd Iot-based-auto-billing-smart-trolly-for-smart-supermarket-automation
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file and add your MONGO_URI and JWT_SECRET
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📱 Mobile Responsiveness
The system is fully responsive. On mobile devices, use the integrated **Hamburger Menu** to navigate and use the hero section to **Activate Live Scan**.

## 🛡️ License
Custom project by Punam Channe. Licensed under MIT.
