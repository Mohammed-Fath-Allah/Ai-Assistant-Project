# AI Assistant Project

This is a repository containing:

- `backend/` - Symfony + API Platform
- `frontend/` - Next.js (React-based)

## Setup

### ✅ Backend (Symfony)

```bash
cd backend
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
symfony serve
```

### ✅ Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

