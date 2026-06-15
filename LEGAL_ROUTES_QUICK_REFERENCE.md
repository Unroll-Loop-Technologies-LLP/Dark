# Legal Routes - Quick Reference Guide

## 🚀 Quick Start

### Access Legal Pages
```
Privacy Policy:   https://unrollloop.com/#/privacy
Terms of Service: https://unrollloop.com/#/terms
Cookie Policy:    https://unrollloop.com/#/cookies
```

### Navigation from Code
```tsx
import { navigateTo } from "../lib/routing";

// Navigate to privacy policy
navigateTo("privacy");

// Or use direct links
<a href="#/privacy">Privacy Policy</a>
```

---

## 📁 File Structure

```
src/app/
├── components/legal/              # Legal components
│   ├── PrivacyPage.tsx           # Privacy policy page
│   ├── TermsPage.tsx             # Terms page
│   ├── CookiesPage.tsx           # Cookies page
│   ├── LegalPage.tsx             # Wrapper component
│   ├── PrivacyPolicyContent.tsx  # Privacy content
│   ├── TermsContent.tsx          # Terms content
│   ├── CookiePolicyContent.tsx   # Cookies content
│   └── index.ts                  # Exports
│
├── lib/
│   └── routing.ts                # Routing utilities
│
├── App.tsx                        # Routes integrated here
└── components/Footer.tsx          # Updated with routing
```

---

## 🔧 API Reference

### Routing Functions

**`getCurrentRoute(): AppRoute | null`**
```tsx
import { getCurrentRoute } from "../lib/routing";

const route = getCurrentRoute();
// Returns: "privacy" | "terms" | "cookies" | null
```

**`navigateTo(route: AppRoute | string): void`**
```tsx
import { navigateTo } from "../lib/routing";

navigateTo("privacy");    // Navigate to privacy page
navigateTo("terms");      // Navigate to terms page
navigateTo("cookies");    // Navigate to cookies page
navigateTo("home");       // Navigate to home page
```

**`isLegalRoute(route: string | null): boolean`**
```tsx
import { isLegalRoute } from "../lib/routing";

if (isLegalRoute(getCurrentRoute())) {
  // Currently on a legal page
}
```

---

## 📝 Content Management

### Update Privacy Policy
```tsx
// File: src/app/components/legal/PrivacyPolicyContent.tsx

export const PRIVACY_POLICY_CONTENT: PolicyContent = {
  title: "Privacy Policy",
  lastUpdated: "April 3, 2026",
  sections: [
    {
      heading: "Information We Collect",
      content: "Your content here..."
    },
    // Add more sections
  ]
};
```

### Update Terms of Service
```tsx
// File: src/app/components/legal/TermsContent.tsx

export const TERMS_CONTENT: PolicyContent = {
  title: "Terms of Service",
  lastUpdated: "April 3, 2026",
  sections: [
    // Update sections here
  ]
};
```

### Update Cookie Policy
```tsx
// File: src/app/components/legal/CookiePolicyContent.tsx

export const COOKIE_POLICY_CONTENT: PolicyContent = {
  title: "Cookie Policy",
  lastUpdated: "April 3, 2026",
  sections: [
    // Update sections here
  ]
};
```

---

## 🔗 Integration Examples

### Footer Links
```tsx
<a href="#/privacy" onClick={(e) => {
  e.preventDefault();
  navigateTo("privacy");
}}>
  Privacy Policy
</a>
```

### OAuth Configuration
```
Privacy Policy URL: https://unrollloop.com/#/privacy
Terms of Service:  https://unrollloop.com/#/terms
```

### reCAPTCHA Setup
```
Privacy Policy: https://unrollloop.com/#/privacy
Terms:          https://unrollloop.com/#/terms
```

### Contact Form Consent
```tsx
<input type="checkbox" required />
<label>
  I agree to the 
  <a href="#/privacy">Privacy Policy</a> and 
  <a href="#/terms">Terms of Service</a>
</label>
```

---

## 🧪 Testing

### Direct Access
```bash
# Test direct URL access
curl https://unrollloop.com/#/privacy
curl https://unrollloop.com/#/terms
curl https://unrollloop.com/#/cookies
```

### Browser Testing
```
1. Open: https://unrollloop.com/#/privacy
2. Verify: Content loads
3. Refresh: Content persists
4. Back button: Returns to home
```

### Navigation Testing
```
1. Click "Privacy Policy" in footer
2. Verify: URL changes to /#/privacy
3. Click "Back" button
4. Verify: Returns to home page
```

---

## 🚨 Common Issues

### URL Not Loading
```
❌ Wrong:  https://unrollloop.com/privacy
✅ Right:  https://unrollloop.com/#/privacy
```

### Navigation Not Working
```tsx
// ❌ Wrong - doesn't use routing
onClick={() => openModal("privacy")}

// ✅ Right - uses routing
onClick={(e) => {
  e.preventDefault();
  navigateTo("privacy");
}}
```

### Content Not Updating
```tsx
// ❌ Wrong - content in component
function PrivacyPage() {
  return <div>Old content</div>;
}

// ✅ Right - content centralized
export const PRIVACY_POLICY_CONTENT = { /* ... */ };
function PrivacyPage() {
  return <LegalPage content={PRIVACY_POLICY_CONTENT} />;
}
```

---

## 📊 Content Types

### PolicyContent Structure
```tsx
interface PolicyContent {
  title: string;                 // "Privacy Policy", etc.
  lastUpdated: string;          // "April 3, 2026"
  sections: PolicySection[];    // Array of sections
}

interface PolicySection {
  heading: string;              // Section title
  content: string;              // Section text
}
```

---

## 🎯 Quick Checklist

- [x] Routes created: `/privacy`, `/terms`, `/cookies`
- [x] Content components created
- [x] Page components created
- [x] Routing utilities created
- [x] App.tsx integrated
- [x] Footer.tsx updated
- [x] Build verified: 0 errors
- [x] Backward compatible
- [x] Documentation complete
- [x] Ready for production

---

## 📖 Full Documentation

For detailed information, see:
- `LEGAL_ROUTES_IMPLEMENTATION.md` - Full technical details
- `LEGAL_ROUTES_VERIFICATION.md` - Compliance verification
- `LEGAL_ROUTES_SUMMARY.md` - Complete summary

---

**Last Updated**: 2026-06-15  
**Status**: ✅ Production Ready
