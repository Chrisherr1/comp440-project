# comp440-project

A Node.js MVC-style web application for online apartment rentals built with Express, MySQL, and server-side sessions. Includes a frontend built with HTML, CSS, and JavaScript.

## YouTube Links

- **Part 1:** https://youtu.be/-R__Od3O9Cc
- **Part 2:** `coming soon`
- **Part 3:** `coming soon`

---

## Tech Stack

- **Backend:** Node.js, Express (ES Modules)
- **Database:** MySQL (mysql2)
- **Auth:** Sessions (express-session + express-mysql-session)
- **Security:** Helmet (CSP), CORS
- **Password Hashing:** Argon2
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
│   ├── authController.js
│   ├── rentalUnitController.js
│   ├── reviewController.js
│   ├── queryController.js
│   └── pageController.js
├── database/
│   └── schema.sql
├── dtos/
│   └── userDTO.js
├── middleware/
│   ├── errorHandler.js
│   └── sessionMiddleware.js
├── repositories/
│   ├── userRepository.js
│   ├── rentalUnitRepository.js
│   ├── reviewRepository.js
│   └── queryRepository.js
├── services/
│   ├── userService.js
│   ├── rentalUnitService.js
│   ├── reviewService.js
│   └── queryService.js
├── routes/
│   ├── authRoutes.js
│   ├── rentalUnitRoutes.js
│   ├── reviewRoutes.js
│   ├── queryRoutes.js
│   ├── pageRoutes.js
│   └── router.js
├── views/
│   ├── login.html
│   ├── register.html
│   ├── home.html
│   ├── post-rental.html
│   ├── search.html
│   ├── write-review.html
│   └── [phase 3 query pages]
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
cd comp440-project
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
http://localhost:3000

**API:**
http://localhost:3000/api/v1/

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register user |
| POST | /api/v1/auth/login | Login user |
| POST | /api/v1/auth/logout | Logout user |

### Rental Units

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/rental-units | Create rental unit |
| GET | /api/v1/rental-units/search?feature_name= | Search by feature |

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/reviews | Create review |

### Queries (Phase 3)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/queries/most-expensive-by-feature | Most expensive unit per feature |
| GET | /api/v1/queries/two-features-same-day?featureX=&featureY= | Users who posted two units same day with different features |
| GET | /api/v1/queries/good-reviews?username= | Units by user with only Excellent/Good reviews |
| GET | /api/v1/queries/most-postings-on-date?date= | Users with most postings on a date |
| GET | /api/v1/queries/all-poor-reviews | Users whose every review is Poor |
| GET | /api/v1/queries/no-poor-reviews | Users whose units never received a Poor review |

---

## Database Schema

```sql
users(username PK, password, firstName, lastName, email UNIQUE, phone UNIQUE)
rental_units(rental_id PK AUTO_INCREMENT, username FK, title, city, state, description, price_per_night, post_date)
features(feat_id PK AUTO_INCREMENT, feature_name)
rental_features(rental_id FK, feat_id FK)
reviews(username FK, rental_id FK, rating ENUM('Excellent','Good','Fair','Poor'), comment, post_date)
```

---

## Authentication

- Uses server-side sessions
- Sessions stored in MySQL
- Cookie: `connect.sid`
- Passwords hashed with Argon2

---

## Business Rules

- Max 2 rental units per user per day
- Max 3 reviews per user per day
- Users cannot review their own rental units
- One review per user per rental unit
- Only registered and logged in users can post and review

---

## Data Flow

```
Request → Route → Controller → Service → Repository → MySQL
                                               ↓
Response ← Controller ← DTO ←────────────────┘
```

---

## Security

- SQL injection prevented using parameterized queries
- Passwords securely hashed with Argon2 before storage
- Duplicate username, email, and phone validated during registration
- Sessions persist using MySQL
- HTTP headers secured with Helmet
- Protected routes require active session
