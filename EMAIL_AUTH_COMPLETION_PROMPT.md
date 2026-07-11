# Email & Authentication System Completion Prompt

## Current Status
The Genseki application has a solid foundation for authentication:
- JWT-based session management (7-day expiry) with `jose` library
- Login/signup pages with form validation
- Password hashing with bcryptjs
- Session middleware protecting `/dashboard` and `/discovery` routes
- Prisma User model with email, name, password fields
- API routes for login and signup that create sessions

## What Needs to be Built

### 1. Email Service Configuration
- Add email provider (SendGrid recommended for simplicity)
- Configure environment variables for email service
- Create email utility functions

### 2. Email Verification System
- Add `emailVerified` timestamp field to User model
- Create email verification token generation and storage
- Build verification email sending functionality
- Create email verification endpoint (`/api/auth/verify-email`)
- Update login middleware to check email verification status
- Add unverified user handling (show verification required message)

### 3. Password Reset Flow
- Create "forgot password" page and API endpoint
- Build password reset token generation and emailing
- Create password reset form and API endpoint
- Add rate limiting for password reset requests

### 4. Email Templates
- Create reusable email template components
- Design verification email template
- Design password reset email template
- Create welcome email template (optional but recommended)

## Implementation Steps

### Phase 1: Email Infrastructure Setup
1. Install email service dependencies (e.g., `@sendgrid/mail`)
2. Add email configuration to `.env` file
3. Create `src/lib/email.ts` utility file
4. Update Prisma schema to add email verification fields

### Phase 2: Email Verification Implementation
1. Modify signup flow to generate verification token
2. Send verification email after account creation
3. Create verification endpoint to handle token validation
4. Update authentication middleware to check verification status
5. Create unverified user landing page or banner

### Phase 3: Password Reset Implementation
1. Create "forgot password" page and form
2. Build forgot password API endpoint (rate-limited)
3. Create password reset token generation and email sending
4. Build password reset form page
5. Create password reset API endpoint
6. Add proper token expiration and validation

### Phase 4: Email Templates & Polish
1. Create email template utilities
2. Design and implement verification email template
3. Design and implement password reset email template
4. Test all email flows
5. Add error handling and logging

## Technical Details to Consider

### Database Changes
Add to User model in `prisma/schema.prisma`:
```prisma
model User {
  // ... existing fields
  emailVerified   DateTime?      // Null until email is verified
  verificationToken String?      // Hashed token for email verification
  verificationTokenExpires DateTime? // Expiry for verification token
  
  // Password reset fields
  resetToken String?              // Hashed reset token
  resetTokenExpires DateTime?    // Expiry for reset token
}
```

### Security Considerations
- Hash tokens in database (never store plain tokens)
- Set appropriate token expiry (verification: 24h, reset: 1h)
- Rate limit authentication endpoints
- Use secure, HTTP-only cookies for sessions
- Validate all inputs server-side
- Implement CSRF protection where needed

### Email Service Options
1. **SendGrid** - Easy to implement, good free tier
2. **SMTP** - More flexible but requires managing credentials
3. **Resend** - Modern alternative with good DX
4. **SES** - AWS option (more complex setup)

## Success Criteria
- [ ] Users receive verification email after signup
- [ ] Users must verify email before accessing protected routes
- [ ] Users can request password reset via email
- [ ] Password reset links expire and are single-use
- [ ] All email flows work in development and production
- [ ] Proper error handling and user feedback throughout
- [ ] Security best practices implemented (token hashing, rate limiting)

## Estimated Effort
- Email infrastructure: 2-3 hours
- Email verification: 3-4 hours  
- Password reset: 3-4 hours
- Testing and polish: 2-3 hours
- **Total: 10-14 hours**

This implementation will complete the authentication system making it production-ready for user acquisition and retention.