# Laravel Auth Coding Challenge - Magic Link & OTP Flows

A Laravel application implementing two authentication flows as specified in the coding challenge requirements.

## 🎯 Project Overview

This application demonstrates two distinct authentication flows:

### Flow 1: Magic Link Authentication (Passwordless)

-   Admin invites users via email with magic link
-   Users click magic link to authenticate
-   Complete user profile setup and preferences

### Flow 2: Email + OTP Authentication

-   Users verify email against invitations
-   OTP-based authentication
-   Complete user profile setup and preferences

## 🚀 Quick Start

### Prerequisites

-   PHP 8.2 or higher
-   Composer
-   Node.js 18+ and npm
-   MySQL 8.x or SQLite
-   Mailhog (for email testing)

### Installation

1. **Clone and setup**

    ```bash
    git clone <repository>
    cd react-auth-coding
    composer install
    npm install
    ```

2. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

3. **Database setup**

    ```bash
    # Update .env with your database credentials
    php artisan migrate
    php artisan db:seed
    ```

4. **Start servers**

    ```bash
    # Terminal 1: Laravel server
    php artisan serve

    # Terminal 2: Vite dev server
    npm run dev
    ```

5. **Access the application**
    - **Main Application**: http://127.0.0.1:8000/
    - **Admin Panel**: http://127.0.0.1:8000/admin
    - **API Endpoints**: http://127.0.0.1:8000/api

## 📋 Application Flow

### Home Page

-   Simple interface with 2 buttons:
    -   **Magic Link Authentication** (purple button)
    -   **Email + OTP Authentication** (green button)

### Magic Link Flow

1. Admin invites user via `/api/invite`
2. User receives email with magic link
3. User clicks magic link → `/api/magic-link/user?token={token}`
4. User completes profile setup
5. User selects wellness interests
6. User selects exactly 3 wellbeing pillars

### OTP Flow

1. User enters email on verification page
2. System verifies email → `/api/verify-email?email={email}`
3. System sends OTP → `/api/send-otp?email={email}`
4. User enters OTP → `/api/verify-otp?email={email}&otp={otp}`
5. User completes profile setup
6. User selects wellness interests
7. User selects exactly 3 wellbeing pillars

## 📚 API Endpoints

### Invitation

```http
POST /api/invite
{
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
}
```

### Magic Link

```http
GET /api/magic-link/user?token={token}
```

### OTP Flow

```http
GET /api/verify-email?email={email}
GET /api/send-otp?email={email}
GET /api/verify-otp?email={email}&otp={otp}
```

### User Profile

```http
POST /api/user/profile
{
    "user_id": 1,
    "password": "SecurePassword123!",
    "dob": "1990-01-01",
    "contact_number": "+1234567890",
    "confirmation_flag": true
}
```

### Wellness Interests

```http
GET /api/wellness-interests
POST /api/wellness-interests
{
    "user_id": 1,
    "wellness_interest_ids": [1, 2, 3]
}
```

### Wellbeing Pillars

```http
GET /api/wellbeing-pillars
POST /api/wellbeing-pillars
{
    "user_id": 1,
    "wellbeing_pillar_ids": [1, 2, 3]
}
```

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Test results: 7/7 tests passing
```

## 📁 Project Structure

```
react-auth-coding/
├── app/Http/Controllers/Auth/     # Authentication controllers
├── app/Models/                    # Eloquent models
├── database/migrations/           # Database schema
├── resources/js/pages/           # React components
│   ├── Home.jsx                  # Main page with 2 buttons
│   ├── MagicLink/               # Magic link flow
│   ├── Otp/                     # OTP flow
│   └── components/              # Shared components
├── routes/api.php               # API routes
└── tests/Feature/               # Tests
```

## 🔒 Security Features

-   Single-use magic links with expiration
-   Time-limited OTP codes (10 minutes)
-   Password validation with Laravel defaults
-   Email verification against invitation records
-   Secure token generation
-   Input validation and sanitization

## 📝 Files for Interview

-   ✅ **Complete Laravel application** with both flows
-   ✅ **All API endpoints** implemented and tested
-   ✅ **Frontend** with simple 2-button interface
-   ✅ **Tests passing** (7/7)
-   ✅ **Postman collection** (`postman_collection.json`)
-   ✅ **Documentation** (this README)

## 🎯 How to Test

1. **Start the application** (see Quick Start above)
2. **Create invitation**: Go to **http://127.0.0.1:8000/admin** and invite a user
3. **Open main app**: **http://127.0.0.1:8000/**
4. **Choose authentication method**:
    - Click "Magic Link Authentication" for passwordless flow
    - Click "Email + OTP Authentication" for OTP flow
5. **Follow the flow** through profile setup and preferences
6. **Test APIs** using the Postman collection

---

**Ready for Interview Review** 🚀
