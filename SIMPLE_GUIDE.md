# Simple Guide - Laravel Auth Challenge

## 🎯 What This Application Does

This is a **Laravel + React** application that shows **2 different ways to log in**:

1. **Magic Link** - Click a link in email (no password needed)
2. **Email + OTP** - Enter email, get code, enter code

## 🚀 How to Run

### Step 1: Setup

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Setup database
php artisan migrate
php artisan db:seed
```

### Step 2: Start Application

```bash
# Start Laravel application (this serves everything)
php artisan serve

# Also run Vite for asset compilation
npm run dev
```

### Step 3: Open Application

-   **Main Application**: **http://127.0.0.1:8000/**
-   **Admin Panel**: **http://127.0.0.1:8000/admin**

You'll see 2 buttons on the main page:

-   **Purple button**: Magic Link Authentication
-   **Green button**: Email + OTP Authentication

## 📱 How to Test

### Step 1: Create User Invitation (Required for both flows)

1. Go to **http://127.0.0.1:8000/admin**
2. Fill in the form:
    - First Name: `palkesh`
    - Last Name: `patel`
    - Email: `patel.palkesh@gmail.com`
3. Click **"Send Invitation"**
4. You'll see success message

### Step 2A: Test Magic Link Flow

1. Go to **http://127.0.0.1:8000/**
2. Click **"Magic Link Authentication"** (purple button)
3. User should receive email with magic link (check logs)
4. User clicks link → completes profile

### Step 2B: Test OTP Flow

1. Go to **http://127.0.0.1:8000/**
2. Click **"Email + OTP Authentication"** (green button)
3. Enter the email you invited: `patel.palkesh@gmail.com`
4. System sends OTP (check logs for development)
5. Enter the OTP code
6. Complete profile setup

## 🔧 API Testing

Use the **Postman collection** (`postman_collection.json`) to test all APIs:

1. **Invite User**: `POST /api/invite`
2. **Magic Link**: `GET /api/magic-link/user?token={token}`
3. **Verify Email**: `GET /api/verify-email?email={email}`
4. **Send OTP**: `GET /api/send-otp?email={email}`
5. **Verify OTP**: `GET /api/verify-otp?email={email}&otp={otp}`

## ✅ What's Working

-   ✅ **Home page** with 2 buttons (as shown in image)
-   ✅ **Magic Link flow** - complete
-   ✅ **OTP flow** - complete
-   ✅ **Profile setup** - complete
-   ✅ **Wellness interests** - complete
-   ✅ **Wellbeing pillars** - complete
-   ✅ **All tests passing** (7/7)
-   ✅ **Postman collection** ready

## 🎯 For Interview

**Show this to interviewer:**

1. **Home page**: "Look, simple 2-button interface"
2. **Click buttons**: "See the different flows"
3. **Run tests**: `php artisan test` (shows 7/7 passing)
4. **Show Postman**: "All APIs documented and tested"
5. **Show code**: "Clean, well-structured Laravel + React"

## 📁 Key Files

-   `resources/js/pages/Home.jsx` - The 2-button page you saw
-   `routes/api.php` - All API endpoints
-   `app/Http/Controllers/Auth/` - Backend logic
-   `tests/Feature/OtpTest.php` - Tests
-   `postman_collection.json` - API testing

---

**That's it! Simple, clean, working application.** 🚀
