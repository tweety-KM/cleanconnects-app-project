CleanConnects — Safety-First Cleaning Services MVP

CleanConnects is a safety-focused, location-restricted cleaning services application built as a portfolio MVP.
The app models a real-world service marketplace (similar to Uber-style flows) with role-based onboarding, verification-gated access, and location constraints to prioritise user safety.

This project was intentionally designed and built step by step to demonstrate frontend engineering fundamentals, application architecture, and security-first thinking.

Live Demo

(Coming soon — deployment via AWS Amplify / PWA install planned)

Problem Statement
South Africa presents unique safety challenges for on-demand service platforms.
This MVP explores how to prevent unsafe interactions by:
- Blocking access until users are verified
- Restricting services to a defined geographic area (Randburg)
- Enforcing role-based onboarding (Customer vs Cleaner)

Features Implemented (MVP)
Role-Based Onboarding
- Users select whether they are a Customer or Cleaner
- Signup flow dynamically adapts to the selected role
  
Verification-Gated Access
- All users start in PENDING_VERIFICATION
- Core features (dashboard, booking) are locked until VERIFIED
- Route-level guards prevent bypassing verification

📍 Location Constraint (Randburg-Only)
- Bookings are limited to Randburg suburbs only
- Prevents unsafe, uncontrolled service expansion in early stages

Protected Routing
- Users cannot access protected routes without:
- Being signed in
- Having a VERIFIED status

Demo Verification Controls
- Admin-style verification state simulation
- Enables testing of VERIFIED / REJECTED / SUSPENDED states

**Tech Stack**
React + TypeScript
Vite
Material UI (MUI)
React Router
LocalStorage (MVP Auth Simulation)
Git & GitHub

**Project Structure**
src/
├── app/               # Routing configuration
├── components/        # Route guards
├── pages/             # Application screens
├── services/          # Auth & role logic
├── types/             # Shared TypeScript types
└── assets/            # Branding & logo

**Skills Demonstrated**
- Frontend Engineering
Component-based architecture
Type-safe React development
Controlled forms & validation
Route protection logic

- Application Design
MVP scoping and feature prioritisation
Safety-first UX decisions
Role-based user flows

- State & Logic Management
Auth state simulation
Verification status handling
Conditional rendering and navigation

- Developer Workflow
Git version control
Clean commit history
Incremental feature development
Debugging environment issues (Windows + Node)

**Some Probelm Solving**
- Situation
While building the MVP, I encountered repeated issues where the development server would fail or Git commands would not work due to incorrect project directory context.

- Task
Identify the root cause of the issue and implement a permanent workflow fix rather than repeatedly applying temporary solutions.

- Action
Investigated how VS Code terminals initialise directories on Windows
Ensured the project was always opened from the correct root folder
Re-initialised Git properly inside the project directory
Standardised terminal usage habits to avoid future errors

- Result
Eliminated recurring npm and Git errors
Successfully committed and pushed the full MVP to GitHub
Improved confidence working with development tooling and environments

**Security & Safety Considerations (Planned)**
Identity verification workflows
Photo/selfie matching before bookings
Monthly re-verification checks
Abuse prevention (device & account blocking)
Background check integrations (future phase)

**Roadmap**
AWS Amplify deployment
PWA installability (iOS & Android)
Cleaner availability & matching logic
Payment integration (sandbox)
Admin verification dashboard

👩🏽‍💻 Author
Koketso Matobako
Aspiring Cloud & AI Engineer | Frontend Developer
📍 South Africa

**Disclaimer**
This project is an MVP built for learning and portfolio purposes.
No real services, payments, or personal data processing are active at this stage.
])
```
