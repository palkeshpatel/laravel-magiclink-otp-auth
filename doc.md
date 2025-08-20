Laravel Auth Coding Challenge – Magic Link & OTP Flows
Design reference: Figma file linked by the recruiter. Treat visuals as guidance for copy, fields, and basic screens. Focus on backend/auth correctness, UX parity, and security.
Figma Link - Click Here https://www.figma.com/design/funQTECAudHhmAOAEyVece/Assignment?node-id=1-20268&t=fZGASStpoAWf3Rq4-0
Goal
Build two authentication flows that align with the Figma:
Flow 1 – Login with Magic Link (without OTP)

Flow 2 – Login without Magic Link (classic email + OPT)

Provide a minimal UI (Blade or Inertia/React) that matches the Figma steps, but prioritize clean Laravel code, security, and tests.
Target stack
PHP 8.2+

Laravel 11.x

MySQL 8.x (or SQLite for quick setup)

Mailhog/SMTP for email preview
What You Need to Submit:
Complete Laravel APP Source Code on GitHub (public repo)
Postman collection
Loom video of Postman API
README.md must include:
App Overview
Screenshots of the ech API response
Setup Instructions
Libraries/Tools used
Timeline – within 48 hours
Deliverables
Need to create only APIs, not views.
A working Laravel app with both flows implemented end‑to‑end.
Seeded demo user(s) and simple UI for the screens in Figma.
Tests (Pest or PHPUnit) covering happy paths + key edge cases.
README.md with setup, .env.example, and decisions.
Short Loom or screenshots showing both flows.

Repo structure suggestion:
app/
Http/Controllers/Auth/
Http/Middleware/
Models/
Notifications/
Services/
Actions/
config/
database/migrations/
database/seeders/
routes/api.php
tests/Feature/Auth/

Functional Requirements
Common
Email is the unique login identifier.

Admin will send the invite to users to register on platform. Need to create user invitation table and API to invite the user by adding user details, First name, last name, Email.
When Admin invites the users, users should receive the invitation for to join platform by clicking here magic link button
The magic link URL must be unique for each other and with that url we will identify the user and fetch the user's details, First name, last name, and Email
Flow 1 — Magic Link (Passwordless)
User story: Admin will send the invite to users, the user clicks on that email and the system will identify the user by a unique URL and then it will return the user details: First name, last name, and Email
Rules
Email form: email (required, RFC compliant).

On submit, create a single‑use login token and send a signed link.

Token becomes used immediately after first successful login.

If email does not exist, optionally create a pending user or return a generic success (don’t leak existence). For this challenge, return generic success and create a user only on link click.

APIs Flow
Invite User API
Endpoint: POST /api/invite
Accepts: email, first-name, last-name
Creates a pending user record and sends a magic link email. (Email designs must be the same as Figma)
Get User Details by Magic Link
Endpoint: GET /api/magic-link/user?token={token}
Validates the magic link token and returns associated user details (limited profile).
API to Save Password, DOB, Contact Details, and User Confirmation
Endpoint: POST /api/user/profile
Accepts: password, dob, contact_number, confirmation_flag
Updates the authenticated user’s record.
API to Get Wellness Interests
Endpoint: GET /api/wellness-interests
Seeder populates sample wellness interests (e.g., Yoga, Meditation, Fitness, Nutrition).
API to Save User‑Selected Wellness Interests
Endpoint: POST /api/wellness-interests
Accepts array of interest IDs and associates them with the user.
API to Get Wellbeing Pillars
Endpoint: GET /api/wellbeing-pillars
Seeder populates pillars (e.g., Physical, Mental, Social, Financial, Emotional).
API to Save User‑Selected Wellbeing Pillars (3 Required)
Endpoint: POST /api/wellbeing-pillars
Accepts exactly 3 pillar IDs.
Validates that exactly 3 are selected.
Marks the registration as complete once saved.

Flow 2 — Email + OTP (No Magic Link)
User story: In this flow, only user can register if they are invited by the admin. But these users are not coming from the magic link; they will directly come from the website
Rules
Verify: email (check the user exists in the user invitation table)

Password policy: min 8, mixed case or digits, and compromised‑password check (use Password::defaults() with uncompromised() if available).
Login with email + OTP
APIs Flow
Invite User API
Endpoint: POST /api/invite
Accepts: email, first-name, last-name
Creates a pending user record and sends a magic link email. (Email designs must be the same as Figma)
Get User Details by Email ID
Endpoint: GET /api/verify-email
Validates the user with email and returns associated user details (limited profile).
Generate OTP
Endpoint: GET /api/send-otp
Generate the and send OTP email to the mentioned email ID

        Verify OTP

Endpoint: GET /api/verify-otp
Check entire OTP is correct and allow user to proceed
API to Save Password, DOB, Contact Details, and User Confirmation
Endpoint: POST /api/user/profile
Accepts: password, dob, contact_number, confirmation_flag
Updates the authenticated user’s record.
API to Get Wellness Interests
Endpoint: GET /api/wellness-interests
Seeder populates sample wellness interests (e.g., Yoga, Meditation, Fitness, Nutrition).
API to Save User‑Selected Wellness Interests
Endpoint: POST /api/wellness-interests
Accepts array of interest IDs and associates them with the user.
API to Get Wellbeing Pillars
Endpoint: GET /api/wellbeing-pillars
Seeder populates pillars (e.g., Physical, Mental, Social, Financial, Emotional).
API to Save User‑Selected Wellbeing Pillars (3 Required)
Endpoint: POST /api/wellbeing-pillars
Accepts exactly 3 pillar IDs.
Validates that exactly 3 are selected.
Marks the registration as complete once saved.

Acceptance Criteria (Extended)
AC8: Invite User API sends a magic link email.
AC9: User details can be retrieved with a valid magic link token.
AC10: User can save password, DOB, contact details, and confirmation.
AC11: Wellness interests and wellbeing pillars are seeded and retrievable via API.
AC12: User can save multiple wellness interests.
AC13: User must select exactly 3 wellbeing pillars to complete registration.
Note: Both the flow are smiler only first 2 steps are different so you need to create APIs for both the flow.
