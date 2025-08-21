# Complete URL Guide - Laravel Auth Application

## 🚀 **CORRECT URLs for Laravel Application**

All URLs work on Laravel server: **http://127.0.0.1:8000/**

### 📋 **Main Application URLs**

| Purpose             | URL                                | Description                             |
| ------------------- | ---------------------------------- | --------------------------------------- |
| **Home Page**       | `http://127.0.0.1:8000/`           | Main page with 2 authentication buttons |
| **Admin Panel**     | `http://127.0.0.1:8000/admin`      | Create user invitations                 |
| **Magic Link Flow** | `http://127.0.0.1:8000/magic-link` | Passwordless authentication             |
| **OTP Flow**        | `http://127.0.0.1:8000/otp`        | Email + OTP authentication              |

### 🔧 **API Endpoints**

Base URL: `http://127.0.0.1:8000/api`

| Method | Endpoint                                  | Purpose                |
| ------ | ----------------------------------------- | ---------------------- |
| `POST` | `/api/invite`                             | Create user invitation |
| `GET`  | `/api/magic-link/user?token={token}`      | Get user by magic link |
| `GET`  | `/api/verify-email?email={email}`         | Verify email for OTP   |
| `GET`  | `/api/send-otp?email={email}`             | Send OTP code          |
| `GET`  | `/api/verify-otp?email={email}&otp={otp}` | Verify OTP             |
| `POST` | `/api/user/profile`                       | Save user profile      |
| `GET`  | `/api/wellness-interests`                 | Get wellness interests |
| `POST` | `/api/wellness-interests`                 | Save user interests    |
| `GET`  | `/api/wellbeing-pillars`                  | Get wellbeing pillars  |
| `POST` | `/api/wellbeing-pillars`                  | Save user pillars      |

## 📋 **Step-by-Step Testing Guide**

### **Step 1: Start Application**

```bash
# Terminal 1: Start Laravel
php artisan serve

# Terminal 2: Compile assets
npm run dev
```

### **Step 2: Create User Invitation**

1. **Go to Admin Panel**: `http://127.0.0.1:8000/admin`
2. **Fill the form**:
    - First Name: `palkesh`
    - Last Name: `patel`
    - Email: `patel.palkesh@gmail.com`
3. **Click "Send Invitation"**
4. **See success message**

### **Step 3A: Test Magic Link Flow**

1. **Go to Home**: `http://127.0.0.1:8000/`
2. **Click "Magic Link Authentication"** (purple button)
3. **URL changes to**: `http://127.0.0.1:8000/magic-link`
4. **System processes magic link** → Complete profile

### **Step 3B: Test OTP Flow**

1. **Go to Home**: `http://127.0.0.1:8000/`
2. **Click "Email + OTP Authentication"** (green button)
3. **URL changes to**: `http://127.0.0.1:8000/otp`
4. **Enter email**: `patel.palkesh@gmail.com`
5. **Get OTP code** (check Laravel logs)
6. **Enter OTP** → Complete profile

## 🎯 **For Interview Demo**

### **Show these URLs to interviewer:**

1. **Admin Panel**: `http://127.0.0.1:8000/admin`

    - "Here's where admin creates invitations"

2. **Main App**: `http://127.0.0.1:8000/`

    - "Simple 2-button interface as required"

3. **Magic Link**: `http://127.0.0.1:8000/magic-link`

    - "Passwordless authentication flow"

4. **OTP Flow**: `http://127.0.0.1:8000/otp`
    - "Email + OTP authentication flow"

### **Test Commands:**

```bash
# Show all tests passing
php artisan test

# Show API routes
php artisan route:list --path=api

# Show database tables
php artisan migrate:status
```

## ✅ **Quick Verification**

Open these URLs to verify everything works:

-   ✅ Home Page: `http://127.0.0.1:8000/`
-   ✅ Admin Panel: `http://127.0.0.1:8000/admin`
-   ✅ API Test: `http://127.0.0.1:8000/api/wellness-interests`

**All URLs should work immediately after running `php artisan serve`!**

---

**Perfect for Interview! 🚀**
