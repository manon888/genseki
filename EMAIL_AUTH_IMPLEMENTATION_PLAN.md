# Email & Authentication System Completion Plan

**Status:** Ready to implement  
**Created:** Fri 2026-05-15 22:27 PDT  
**Priority:** High - Completes core auth system for production readiness  
**Estimated Effort:** 10-14 hours

## Quick Context for Future Sessions
- Genseki has JWT-based auth (login/signup) working
- Missing: email verification & password reset flows
- Uses Next.js 16, Prisma/SQLite, jose for JWT
- Session middleware protects /dashboard and /discovery
- Plan stored in: `EMAIL_AUTH_IMPLEMENTATION_PLAN.md`
- Detailed prompt in: `EMAIL_AUTH_COMPLETION_PROMPT.md`

## Implementation Phases
1. **Email Infrastructure** (2-3h) - Setup SendGrid/email utils
2. **Email Verification** (3-4h) - Verify emails post-signup  
3. **Password Reset** (3-4h) - Forgot/reset password flows
4. **Templates & Polish** (2-3h) - Email templates, testing

## Key Files to Modify/Create
- `prisma/schema.prisma` - Add email verification fields
- `src/lib/email.ts` - Email service utilities
- `src/lib/auth.ts` - Update for verification checks
- New API routes: `/api/auth/verify-email`, `/api/auth/forgot-password`, `/api/auth/reset-password`
- New pages: forgot password, reset password, email verification handling
- Environment variables: Add email service config to `.env`

**Next Step:** Review `EMAIL_AUTH_COMPLETION_PROMPT.md` for detailed implementation guidance.