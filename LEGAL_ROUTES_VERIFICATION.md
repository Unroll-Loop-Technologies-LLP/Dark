# Legal Route URLs - Compliance Verification

## Canonical URLs

### Privacy Policy
```
Direct URL: https://unrollloop.com/#/privacy
Hash Route: /#/privacy
Page Title: Privacy Policy - Unroll Loop
Use Cases:
  - Google reCAPTCHA privacy policy field
  - Google OAuth privacy policy
  - Privacy compliance reviews
  - User consent forms
  - GDPR consent templates
```

### Terms of Service
```
Direct URL: https://unrollloop.com/#/terms
Hash Route: /#/terms
Page Title: Terms of Service - Unroll Loop
Use Cases:
  - OAuth provider terms URL
  - App Store submission terms field
  - User agreement references
  - Legal compliance docs
  - Service documentation
```

### Cookie Policy
```
Direct URL: https://unrollloop.com/#/cookies
Hash Route: /#/cookies
Page Title: Cookie Policy - Unroll Loop
Use Cases:
  - Cookie consent banner links
  - Privacy policy footer
  - GDPR compliance
  - EU cookie law compliance
  - Analytics disclosure
```

## Integration Examples

### OAuth Providers (Google, GitHub, etc.)
```
OAuth Configuration:
- Privacy Policy: https://unrollloop.com/#/privacy
- Terms of Service: https://unrollloop.com/#/terms
- Support: https://unrollloop.com/#/contact
```

### App Store Configuration

**iOS App (TestFlight/App Store)**
```
App Privacy Policy URL: https://unrollloop.com/#/privacy
App Terms of Service: https://unrollloop.com/#/terms
```

**Google Play Store**
```
Privacy Policy: https://unrollloop.com/#/privacy
Developer Program Policies: https://unrollloop.com/#/terms
```

### reCAPTCHA Configuration

**Google reCAPTCHA Admin Console**
```
Site: https://unrollloop.com
Privacy Policy: https://unrollloop.com/#/privacy
Terms of Service: https://unrollloop.com/#/terms
```

### Cookie Consent Banner

**CookieBot/OneTrust Integration**
```html
<a href="https://unrollloop.com/#/cookies">
  Cookie Policy
</a>
```

### Email Footer

**Compliance Footer**
```html
<footer>
  <p>
    <a href="https://unrollloop.com/#/privacy">Privacy</a> |
    <a href="https://unrollloop.com/#/terms">Terms</a> |
    <a href="https://unrollloop.com/#/cookies">Cookies</a>
  </p>
</footer>
```

### Contact Forms

**Compliance Checkbox**
```html
<input type="checkbox" required />
<label>
  I agree to the 
  <a href="https://unrollloop.com/#/privacy">Privacy Policy</a> and 
  <a href="https://unrollloop.com/#/terms">Terms of Service</a>
</label>
```

## Verification Checklist

### Functionality Tests

- [ ] Direct URL access works:
  - [ ] `https://unrollloop.com/#/privacy` loads privacy page
  - [ ] `https://unrollloop.com/#/terms` loads terms page
  - [ ] `https://unrollloop.com/#/cookies` loads cookies page

- [ ] Browser navigation works:
  - [ ] Back button returns to home
  - [ ] Forward button works correctly
  - [ ] URL updates in address bar
  - [ ] Page refresh preserves route

- [ ] Footer links work:
  - [ ] Click "Privacy Policy" in footer
  - [ ] Click "Terms of Service" in footer
  - [ ] Click "Cookie Policy" in footer

### Compliance Tests

- [ ] URLs are bookmarkable:
  - [ ] Bookmark privacy page
  - [ ] Bookmark terms page
  - [ ] Bookmark cookies page
  - [ ] Revisit bookmarks

- [ ] URLs are shareable:
  - [ ] Share privacy URL via email
  - [ ] Share terms URL via messaging
  - [ ] Share cookies URL via social media

- [ ] OAuth providers accept URLs:
  - [ ] Test with Google OAuth
  - [ ] Test with GitHub OAuth
  - [ ] Test with Microsoft OAuth

- [ ] URLs work in different contexts:
  - [ ] On desktop browser
  - [ ] On mobile browser
  - [ ] In incognito/private mode
  - [ ] Behind corporate firewall
  - [ ] In different time zones

### Content Tests

- [ ] Privacy Policy page content:
  - [ ] Title: "Privacy Policy"
  - [ ] Last updated date visible
  - [ ] All sections present
  - [ ] Contact information included
  - [ ] Data rights section included

- [ ] Terms of Service page content:
  - [ ] Title: "Terms of Service"
  - [ ] Last updated date visible
  - [ ] All sections present
  - [ ] Governing law specified
  - [ ] Contact information included

- [ ] Cookie Policy page content:
  - [ ] Title: "Cookie Policy"
  - [ ] Last updated date visible
  - [ ] Cookie types listed
  - [ ] Management options explained
  - [ ] Contact information included

## Status Codes & Response

### Expected Responses

```
GET https://unrollloop.com/#/privacy
HTTP/1.1 200 OK
Content-Type: text/html
Title: Privacy Policy - Unroll Loop
Body: Complete privacy policy content
```

```
GET https://unrollloop.com/#/terms
HTTP/1.1 200 OK
Content-Type: text/html
Title: Terms of Service - Unroll Loop
Body: Complete terms of service content
```

```
GET https://unrollloop.com/#/cookies
HTTP/1.1 200 OK
Content-Type: text/html
Title: Cookie Policy - Unroll Loop
Body: Complete cookie policy content
```

## Search Console Configuration

### Canonical URL Setup
```xml
<!-- In index.html head -->
<link rel="canonical" href="https://unrollloop.com" />

<!-- Per-page canonical handled by router -->
```

### Sitemap Entry
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://unrollloop.com/#/privacy</loc>
    <lastmod>2026-04-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://unrollloop.com/#/terms</loc>
    <lastmod>2026-04-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://unrollloop.com/#/cookies</loc>
    <lastmod>2026-04-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## Troubleshooting

### URL Not Loading
- Verify hash syntax: `/#/privacy` (not `/privacy`)
- Check browser console for errors
- Verify Vite build includes routing code
- Clear browser cache

### Content Not Displaying
- Check network tab for 200 OK responses
- Verify CSS loads correctly
- Check browser DevTools for layout issues
- Verify legal content is exported correctly

### Navigation Not Working
- Verify hash routing enabled
- Check `src/app/lib/routing.ts` is loaded
- Verify Footer imports `navigateTo`
- Clear browser cache and cookies

### Links Broken in Modals
- Verify no other route handlers intercept legal routes
- Check z-index conflicts with modal
- Verify modal close button returns to previous route

## Deployment Verification

### Netlify Deployment
```bash
# Verify URLs work on live deployment
curl -I https://your-site.netlify.app/#/privacy
curl -I https://your-site.netlify.app/#/terms
curl -I https://your-site.netlify.app/#/cookies
```

### Vercel Deployment
```bash
# Verify URLs work on live deployment
curl -I https://your-site.vercel.app/#/privacy
curl -I https://your-site.vercel.app/#/terms
curl -I https://your-site.vercel.app/#/cookies
```

### Custom Domain
```bash
# Verify URLs work on custom domain
curl -I https://unrollloop.com/#/privacy
curl -I https://unrollloop.com/#/terms
curl -I https://unrollloop.com/#/cookies
```

## Content Last Updated Dates

| Document | Last Updated | Next Review |
|----------|------------|------------|
| Privacy Policy | April 3, 2026 | October 3, 2026 |
| Terms of Service | April 3, 2026 | October 3, 2026 |
| Cookie Policy | April 3, 2026 | July 3, 2026 |

---

**Status**: ✅ Ready for Compliance & Production Use
