# comp440-project

A Node.js MVC-style web application with user authentication using Express, MySQL, and server-side sessions. Includes a simple frontend built with HTML, CSS, and JavaScript.

## Youtube Links
- **Part 1:** `https://youtu.be/-R__Od3O9Cc`
---

## Tech Stack

- **Backend:** Node.js, Express (ES Modules)
- **Database:** MySQL (mysql2)
- **Auth:** Sessions (express-session + express-mysql-session)
- **Security:** Helmet (CSP), CORS
- **Logging:** Morgan
- **Validation:** Zod (env validation)
- **Frontend:** HTML, CSS, JavaScript

---

## Project Structure

```
comp440-project/
├── config/
│   ├── db.js
│   └── validateEnv.js
├── controllers/
│   └── authController.js
├── database/
│   └── schema.sql
├── dtos/
│   └── userDTO.js
├── middleware/
│   ├── errorHandler.js
│   └── sessionMiddleware.js
├── models/
│   └── userModel.js
├── repositories/
│   └── userRepository.js
├── routes/
│   ├── authRoutes.js
│   └── router.js
├── views/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   └── home.html
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── app.js
├── index.js
└── .env
```

---

## Setup

### 1. Install dependencies

```bash
Go to project directory for this ~/comp440-project
npm install
```

### 2. Create `.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=comp440
PORT=3000
SESSION_SECRET=your_secret_key
```

### 3. Set up database

```bash
mysql -u root -p < database/schema.sql
```

### 4. Run the app

```bash
# Development
npm run dev

# Production
npm start
```

---

## Access

**Frontend:**  
http://localhost:3000/login.html  

**API:**  
http://localhost:3000/api/v1/auth/

---

## API Endpoints

| Method | Endpoint               | Description   |
|--------|----------------------|---------------|
| POST   | /api/v1/auth/register | Register user |
| POST   | /api/v1/auth/login    | Login user    |
| POST   | /api/v1/auth/logout   | Logout user   |

---

## Authentication

- Uses server-side sessions  
- Sessions stored in MySQL  
- Cookie: `connect.sid`  
- Passwords hashed with argon2  

---

## Data Flow

```
Request → Route → Controller → Model → Repository → MySQL
                                      ↓
Response ← Controller ← DTO ←─────────┘
```

---

## Notes

- SQL injection is prevented using parameterized queries  
- Passwords are securely hashed before storage  
- Duplicate username, email, and phone are validated during registration  
- Sessions persist using MySQL (not in-memory)
