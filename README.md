# 🍱 FoodRescue — Food Rescue & Donation Platform

> **Rescue Food. Reduce Waste. Feed Communities. 🌱**

FoodRescue is a full-stack **MERN-based food donation and rescue platform** designed to connect food donors with verified organizations and pickup partners.

The platform provides a structured workflow for rescuing surplus food before it expires and helping ensure that it reaches people in need.

---

## 📌 Project Overview

A large amount of safe surplus food from restaurants, hostels, hotels, events, canteens, and households can go to waste.

FoodRescue provides a digital platform where:

**Donors** can report surplus food → **Organizations** can accept available donations → **Pickup Partners** can collect the food → Food can be marked as delivered → The system tracks the overall social impact through analytics.

### Complete Workflow

```text
Food Prepared
      ↓
Food Consumed
      ↓
Surplus Food
      ↓
Safety & Eligibility Check
      ↓
Donation Reported
      ↓
Organization Accepts
      ↓
Pickup Partner Accepts
      ↓
Food Picked Up
      ↓
Food Delivered
      ↓
Impact Analytics
```

---

## 🎯 Problem Statement

Food wastage is a major social and environmental problem. At the same time, many people and communities require access to food.

There is a need for a simple system that can:

* Connect food donors with organizations
* Track surplus food donations
* Prevent expired food from being distributed
* Coordinate food pickup
* Track donation status
* Measure the impact of rescued food

---

## 💡 Solution

FoodRescue provides a centralized platform for managing the complete food rescue process.

The system supports three primary user roles:

| Role              | Responsibility                      |
| ----------------- | ----------------------------------- |
| 🏪 Donor          | Reports surplus food                |
| 🏢 Organization   | Accepts available donations         |
| 🚚 Pickup Partner | Collects and delivers accepted food |

This creates a clear and trackable chain from **food donation to delivery**.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Role-based access control
* Separate dashboards for different user roles
* Protected API routes

### 🥗 Food Donation Management

Donors can report:

* Food name
* Food category
* Quantity
* Unit
* Description
* Preparation time
* Best-before time
* Pickup address
* Pickup city
* Pickup time window
* Food safety confirmation

### 🏢 Organization Dashboard

Organizations can:

* View available donations
* View donor information
* Accept available food donations
* View their accepted donations
* Track donation status
* View pickup partner details

### 🚚 Pickup Partner Dashboard

Pickup partners can:

* View available pickups
* Accept pickup assignments
* View donor and organization details
* Mark food as picked up
* Mark food as delivered
* Track assigned pickups

### ⏰ Automatic Expiry Management

The backend periodically checks donation expiry times.

Donations that pass their best-before time are automatically marked as:

```text
expired
```

This helps prevent outdated donations from remaining available in the system.

### 📊 Impact Analytics

The platform provides analytics including:

* Total donations
* Completed deliveries
* Organizations served
* Total food rescued in kilograms
* Total servings rescued
* Monthly donation statistics
* Food category statistics

---

## 🔄 Donation Status Flow

A donation moves through the following states:

```text
Pending
   ↓
Accepted
   ↓
Pickup Assigned
   ↓
Picked Up
   ↓
Delivered
```

Other possible states include:

```text
Expired
Cancelled
```

---

## 🛡️ Safety & Validation

FoodRescue includes validation at the backend level to ensure reliable data.

Examples:

* Required fields validation
* Email validation
* Indian mobile number validation
* Password length validation
* Quantity validation
* Allowed food categories
* Allowed account types
* Preparation time validation
* Best-before validation
* Pickup window validation
* Food safety confirmation
* Expired donation protection
* Donation ownership checks
* MongoDB ObjectId validation

---

## 🔒 Security

The application uses several security practices:

* JWT authentication
* Password hashing using bcrypt
* Protected API endpoints
* Role-based authorization
* Environment variables for sensitive configuration
* MongoDB credentials kept outside source code
* `.env` excluded from Git
* Backend validation for client-submitted data

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* Vite
* Material UI (MUI)
* Axios
* React Router
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

### Development Tools

* Git
* GitHub
* VS Code
* Postman / Hoppscotch
* MongoDB Atlas

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │   Vite + MUI        │
                    └──────────┬──────────┘
                               │
                               │ Axios / REST API
                               ↓
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │     Node.js         │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ↓                ↓                ↓
        Authentication     Donation         Analytics
          & JWT            Management        & Expiry
              │                │                │
              └────────────────┼────────────────┘
                               ↓
                    ┌─────────────────────┐
                    │    MongoDB Atlas     │
                    └─────────────────────┘
```

---

## 📁 Project Structure

```text
foodrescue/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── donationController.js
│   │   │   ├── organizationController.js
│   │   │   ├── pickupController.js
│   │   │   ├── analyticsController.js
│   │   │   └── expiryController.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Donation.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── donationRoutes.js
│   │   │   ├── organizationRoutes.js
│   │   │   ├── pickupRoutes.js
│   │   │   └── analyticsRoutes.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── public/
│
├── src/
│   ├── pages/
│   │   ├── DonorDashboard.jsx
│   │   ├── ReportDonation.jsx
│   │   ├── OrganizationDashboard.jsx
│   │   ├── PickupDashboard.jsx
│   │   └── AnalyticsDashboard.jsx
│   │
│   ├── App.jsx
│   ├── Register.jsx
│   ├── login.jsx
│   └── main.jsx
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Donations

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | `/api/donations`    | Create a donation     |
| GET    | `/api/donations/my` | Get donor's donations |

### Organizations

| Method | Endpoint                                  | Description             |
| ------ | ----------------------------------------- | ----------------------- |
| GET    | `/api/organizations/donations`            | Get available donations |
| PUT    | `/api/organizations/donations/:id/accept` | Accept donation         |
| GET    | `/api/organizations/my-donations`         | Get accepted donations  |

### Pickup Partners

| Method | Endpoint                               | Description            |
| ------ | -------------------------------------- | ---------------------- |
| GET    | `/api/pickups/donations`               | Get available pickups  |
| PUT    | `/api/pickups/donations/:id/accept`    | Accept pickup          |
| PUT    | `/api/pickups/donations/:id/picked-up` | Mark food as picked up |
| PUT    | `/api/pickups/donations/:id/delivered` | Mark food as delivered |
| GET    | `/api/pickups/my-pickups`              | Get assigned pickups   |

### Analytics

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| GET    | `/api/analytics/impact` | Get impact analytics |

---

## 🗄️ Database Models

### User

The User model stores:

```text
fullName
email
phone
accountType
password
createdAt
updatedAt
```

Supported account types:

```text
donor
organization
pickup
```

### Donation

The Donation model stores:

```text
donor
foodName
foodCategory
quantity
unit
description
preparedAt
bestBefore
pickupAddress
pickupCity
pickupStart
pickupEnd
safetyConfirmed
status
organization
pickupPartner
createdAt
updatedAt
```

---

## 📊 Analytics

FoodRescue calculates impact from completed deliveries.

The analytics system tracks:

### Overall Impact

* Total donations
* Completed deliveries
* Organizations served
* Food rescued in kg
* Food rescued in servings

### Monthly Statistics

Donation activity can be grouped by:

```text
Year
Month
Number of donations
Food rescued (kg)
Servings rescued
```

### Category Statistics

The system also tracks donations by food category such as:

```text
Cooked Food
Packaged Food
Fruits
Vegetables
Bakery
Other
```

---

## ⏰ Expiry Automation

Food safety is an important part of the platform.

The backend periodically checks donation expiry times.

The expiry process runs automatically and changes eligible donations to:

```text
expired
```

This prevents expired donations from being accepted or assigned for pickup.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd foodrescue
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd Backend
npm install
```

### 4. Configure backend environment variables

Create:

```text
Backend/.env
```

Add:

```env
PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

### 5. Configure frontend environment variables

Create:

```text
.env
```

Add:

```env
VITE_API_URL=http://localhost:8000
```

### 6. Start the backend

From the `Backend` directory:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:8000
```

### 7. Start the frontend

From the project root:

```bash
npm run dev
```

The Vite development server will provide the frontend URL in the terminal.

---

## 🧪 Testing

The complete donation workflow has been tested using multiple user roles.

### Tested Flow

```text
Donor
  ↓
Create Donation
  ↓
Organization
  ↓
Accept Donation
  ↓
Pickup Partner
  ↓
Accept Pickup
  ↓
Mark Picked Up
  ↓
Mark Delivered
  ↓
Analytics Updated
```

The application also includes testing for:

* Registration
* Login
* Invalid credentials
* Protected routes
* Role-based access
* Donation creation
* Donation acceptance
* Pickup assignment
* Pickup status updates
* Delivery completion
* Donation expiry
* Analytics

---

## 🌐 Deployment

The planned production architecture is:

```text
Frontend → Vercel
Backend  → Render
Database → MongoDB Atlas
```

Production environment variables will be configured separately on the deployment platforms.

The frontend API URL will point to the deployed backend instead of the local development server.

---

## 🚀 Future Improvements

Potential future enhancements include:

* Automatic donor-organization matching
* Location-based donation matching
* Google Maps integration
* Real-time notifications
* Email/SMS notifications
* Organization verification
* Pickup partner verification
* Admin dashboard
* Donation image uploads
* QR-based pickup verification
* Advanced impact reports
* Food safety verification workflow
* Mobile application
* AI-based demand prediction
* Real-time pickup tracking

---

## 🌱 Why FoodRescue?

FoodRescue is more than a CRUD application.

It demonstrates a complete real-world workflow involving:

* Authentication
* Authorization
* Multiple user roles
* REST APIs
* MongoDB database design
* Secure password handling
* JWT authentication
* Data validation
* Status-based workflow
* Automated expiry handling
* Analytics
* Full-stack integration
* Production deployment architecture

---

## 📸 Screenshots

Screenshots of the application will be added here after the final deployment.

Suggested screenshots:

1. Home Page
2. Registration
3. Login
4. Donor Dashboard
5. Report Donation
6. Organization Dashboard
7. Pickup Dashboard
8. Analytics Dashboard
9. Completed Delivery

---

## 🔗 Project Links

**Live Demo:**
Coming soon

**GitHub Repository:**
Coming soon

---

## 👩‍💻 Author

### Tanya Sen

B.Tech Computer Science & Engineering
Shri Ram Institute of Science & Technology, Jabalpur

**Skills:**
MERN Stack • Java • JavaScript • React.js • Node.js • Express.js • MongoDB • SQL

---

## 📄 License

This project is developed for educational, portfolio, and demonstration purposes.

---

⭐ If you find this project useful, consider giving the repository a star!
