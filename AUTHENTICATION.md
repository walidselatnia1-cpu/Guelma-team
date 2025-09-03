# Admin Authentication Setup

This document explains how the admin authentication system works and how to set it up.

## Overview

The admin authentication system uses JWT (JSON Web Tokens) to protect admin routes and API endpoints. It includes:

- **Login page** at `/admin/login`
- **Protected admin dashboard** at `/admin`
- **JWT-based authentication** for API routes
- **Middleware protection** for routes and APIs
- **Development mode bypass** for easier testing

## Quick Setup

1. **Copy environment variables**:

   ```bash
   cp .env.example .env.local
   ```

2. **Set a strong JWT secret** in `.env.local`:

   ```env
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-make-it-long-and-random
   ```

3. **Set authentication mode** in `.env.local`:

   ```env
   # For development (bypasses auth)
   SKIP_AUTH=true

   # For production (enforces auth)
   SKIP_AUTH=false
   ```

## Default Admin Credentials

For testing purposes, use these default credentials:

- **Email**: `admin@guelma.com`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials in production by updating the `authenticateUser` function in `/app/api/auth/login/route.ts`.

## Authentication Flow

### 1. Login Process

1. User visits `/admin/login`
2. Enters credentials
3. System verifies credentials via `/api/auth/login`
4. On success, receives JWT token
5. Token stored in localStorage
6. User redirected to `/admin`

### 2. Protected Routes

- **Admin pages** (`/admin/*`): Protected by client-side checks
- **API routes** (`/api/*`): Protected by middleware (except public routes)
- **File uploads**: Require valid JWT token

### 3. Token Verification

- Tokens are verified on each API request
- Invalid/expired tokens result in 401 Unauthorized
- Client automatically redirects to login on auth failure

## API Protection

### Protected Endpoints

All API routes are protected except:

- `/api/auth/login` - Login endpoint
- `/api/auth/verify` - Token verification
- `/api/uploads/*` - File serving (public)

### Using Protected APIs

Include the JWT token in requests:

```javascript
fetch("/api/recipe/upload", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});
```

Or use the provided API client:

```javascript
import { apiClient, uploadRecipeImage } from "@/lib/api-client";

// Upload with automatic auth
const result = await uploadRecipeImage(file, recipeId);

// Generic authenticated request
const data = await apiClient.get("/api/some-endpoint");
```

## Development vs Production

### Development Mode

- Set `SKIP_AUTH=true` in `.env.local`
- Authentication is bypassed for easier testing
- All API routes remain accessible
- Admin pages still show login flow for testing

### Production Mode

- Set `SKIP_AUTH=false` in `.env.local`
- Full authentication is enforced
- Invalid tokens result in 401 errors
- Admin pages require valid login

## File Structure

```
├── app/
│   ├── admin/
│   │   ├── login/page.tsx          # Login page
│   │   ├── page.jsx                # Protected admin dashboard
│   │   └── test-auth/page.tsx      # Auth testing page
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts      # Login API
│       │   └── verify/route.ts     # Token verification API
│       └── recipe/
│           └── upload/route.ts     # Protected upload API
├── lib/
│   ├── auth.ts                     # Auth utilities
│   ├── jwt.ts                      # JWT functions
│   └── api-client.ts               # Authenticated API client
└── middleware.ts                   # Route protection middleware
```

## Testing Authentication

1. **Login Test**:

   - Visit `/admin/login`
   - Use default credentials
   - Should redirect to `/admin`

2. **API Test**:

   - Visit `/admin/test-auth`
   - Test token verification
   - Test file upload
   - Test token clearing

3. **Protection Test**:
   - Clear localStorage token
   - Try accessing `/admin` (should redirect to login)
   - Try API calls (should return 401)

## Customization

### Change Default Credentials

Edit `/app/api/auth/login/route.ts`:

```typescript
async function authenticateUser(email: string, password: string) {
  // Replace with your credentials or database lookup
  if (email === "your-admin@email.com" && password === "your-password") {
    return { id: 1, email, role: "admin" };
  }
  return null;
}
```

### Add Database Authentication

Replace the hardcoded credentials with database queries:

```typescript
async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: { email, role: "admin" },
  });

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    return { id: user.id, email: user.email, role: user.role };
  }
  return null;
}
```

### Add More Protected Routes

Update `middleware.ts` to protect additional routes:

```typescript
// Protect more API routes
const protectedApiRoutes = [
  "/api/admin",
  "/api/recipe/upload",
  "/api/recipe/create",
  // Add more routes
];
```

## Security Notes

1. **JWT Secret**: Use a strong, random secret in production
2. **HTTPS**: Always use HTTPS in production for token security
3. **Token Expiry**: Tokens expire after 7 days by default
4. **Password Hashing**: Use bcrypt for password storage in production
5. **Environment Variables**: Never commit secrets to version control

## Troubleshooting

### Common Issues

1. **"Invalid token" errors**:

   - Check JWT_SECRET is set correctly
   - Ensure token hasn't expired
   - Verify token format in requests

2. **Login redirects not working**:

   - Check localStorage support
   - Verify redirect URLs
   - Check browser console for errors

3. **API calls failing**:

   - Ensure token is included in headers
   - Check middleware configuration
   - Verify route patterns in middleware

4. **Development mode issues**:
   - Set `SKIP_AUTH=true` for testing
   - Check environment variable loading
   - Restart development server after env changes
