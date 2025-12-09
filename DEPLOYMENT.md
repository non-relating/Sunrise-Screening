# GitHub Pages Deployment Setup

## Current Configuration

- **Custom Domain**: `www.sunrisescreening.com`
- **GitHub Pages**: Deployed to `non-relating/Sunrise-Screening` repository
- **Base Path**: `/Sunrise-Screening/`
- **SPA Routing**: 404.html fallback configured

## DNS Configuration

For your custom domain to work with GitHub Pages:

1. Update your domain registrar's DNS settings:
   - Create a CNAME record pointing to `non-relating.github.io`
   - Record: `www` → `non-relating.github.io`
   - Or use A records: point to GitHub Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)

2. Verify DNS propagation:

```bash
nslookup www.sunrisescreening.com
# Should resolve to: non-relating.github.io or GitHub IP addresses
```

## If Assets Return HTML (MIME Type Error)

This happens when:

1. DNS is misconfigured (domain not pointing to GitHub Pages)
2. A proxy/cache is serving stale pages
3. Domain registrar's parking page is intercepting requests

**Solution:**

- Clear browser cache and hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- Ensure DNS CNAME points to `non-relating.github.io`
- Wait 24-48 hours for DNS to fully propagate
- Check GitHub repository settings → Pages to verify deployment status

## Local Testing

To test the site locally with the production base path:

```bash
npm run preview
# Opens http://localhost:4173/Sunrise-Screening/
```

## GitHub Repository Pages Settings

Verify in your GitHub repository:

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: main, folder: / (root)
4. Custom domain: `www.sunrisescreening.com`
5. Enforce HTTPS: ✓ (checked)
