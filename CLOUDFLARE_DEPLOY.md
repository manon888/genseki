# Cloudflare Pages Deployment

## Quick Deploy
1. Go to https://dash.cloudflare.com/pages
2. Connect GitHub account
3. Select repo "genseki"
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `.next`
5. Add environment variables:
   - `AGENTMAIL_API_KEY` = your key
   - `JWT_SECRET` = generate random string

## Or use CLI (after installing wrangler):
wrangler pages project create genseki
wrangler pages deploy

---
## Note: This project uses Next.js which requires server-side features. 
## Cloudflare Pages has Next.js support but may need configuration.
## See: https://developers.cloudflare.com/pages/framework-guides/nextjs/