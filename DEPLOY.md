# Genseki Deployment Guide

## Option 1: Deploy via Vercel CLI (Recommended)

### Prerequisites
1. Sign up at vercel.com
2. Install Vercel CLI: `npm install -g vercel`

### Steps
```bash
cd /Users/code9/Projects/sparkfun

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

### Environment Variables (set in Vercel dashboard)
Go to Project Settings → Environment Variables:
- `AGENTMAIL_API_KEY` = your key from console.agentmail.to
- `JWT_SECRET` = generate a secure random string

---

## Option 2: Deploy via GitHub

### Steps
1. Push code to GitHub:
   ```bash
   cd /Users/code9/Projects/sparkfun
   git init
   git add .
   git commit -m "Genseki MVP ready for deployment"
   
   # Create repo on github.com, then:
   git remote add origin https://github.com/YOUR_USERNAME/genseki.git
   git push -u origin main
   ```

2. Go to vercel.com → Import Project → Select your repo

3. Add environment variables in Vercel dashboard

---

## Post-Deployment
- URL will be: `genseki.vercel.app`
- Update X post bio to point to new URL
- Test signup flow