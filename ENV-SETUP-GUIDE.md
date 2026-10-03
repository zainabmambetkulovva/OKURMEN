# 🔐 Environment Variables Setup Guide

## 📋 Обзор

Этот проект использует environment variables для конфигурации разных окружений.

## 🗂️ Структура Файлов

```
OKURMEN/
├── .env                           # Корневой (для Prisma)
├── apps/web/
│   ├── .env.local                # Development (git ignored)
│   ├── .env.production.example   # Template для production
│   └── .env.production.local     # Production локально (git ignored)
├── apps/api/
│   ├── .env                      # Development (git ignored)
│   └── .env.example              # Template
└── packages/database/
    └── .env                      # Database (git ignored)
```

## 🔧 Development Setup (Локальная разработка)

### 1. Корневой .env (для Prisma)
```bash
# Создать
cd c:\Users\Dell\OneDrive\Desktop\OKURMEN
echo DATABASE_URL="postgresql://username:password@localhost:5432/okurmen?sslmode=require" > .env
```

Или скопировать из Neon:
```env
DATABASE_URL=postgresql://username:password@ep-xxxx.us-east-2.aws.neon.tech/okurmen?sslmode=require
```

### 2. API .env
```bash
cd apps/api
cp .env.example .env
```

Заполнить:
```env
DATABASE_URL="postgresql://..."
JWT_SECRET=dev-secret-change-in-production
JWT_REFRESH_SECRET=dev-secret-change-in-production
NEXTAUTH_SECRET=dev-secret-change-in-production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
WEB_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
EMPLOYEE_URL=http://localhost:3004
```

### 3. Web .env.local
```bash
cd apps/web
echo NEXTAUTH_URL=http://localhost:3000 > .env.local
echo NEXTAUTH_SECRET=dev-secret >> .env.local
echo DATABASE_URL="postgresql://..." >> .env.local
echo NEXT_PUBLIC_API_URL=http://localhost:3002 >> .env.local
```

Полный .env.local:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=http://localhost:3002
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
```

## 🚀 Production Setup (Vercel)

### ⚠️ ВАЖНО: НЕ добавляйте .env файлы в production!
Все переменные добавляются через Vercel Dashboard!

### Для каждого проекта в Vercel:

#### 1. WEB App
```env
# Required
NEXTAUTH_URL=https://okurmen-web-xxxx.vercel.app
NEXTAUTH_SECRET=<сгенерированный-секрет-32-chars>
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/okurmen?sslmode=require
NEXT_PUBLIC_API_URL=https://okurmen-api-xxxx.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx

# Auto-set by Vercel
NODE_ENV=production
```

#### 2. API App
```env
# Database
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/okurmen?sslmode=require

# JWT Secrets (сгенерировать!)
JWT_SECRET=<32-random-chars>
JWT_REFRESH_SECRET=<32-random-chars>
NEXTAUTH_SECRET=<32-random-chars>

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=<your-token>
ENABLE_RATE_LIMIT=true

# Rate Limits
RATE_LIMIT_LOGIN_MAX=5
RATE_LIMIT_LOGIN_WINDOW=900
RATE_LIMIT_2FA_REQUEST_MAX=3
RATE_LIMIT_2FA_REQUEST_WINDOW=900
RATE_LIMIT_2FA_VERIFY_MAX=5
RATE_LIMIT_2FA_VERIFY_WINDOW=900
RATE_LIMIT_PUBLIC_MAX=100
RATE_LIMIT_PUBLIC_WINDOW=60
RATE_LIMIT_AUTH_MAX=300
RATE_LIMIT_AUTH_WINDOW=60

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=<app-password>

# Frontend URLs (обновить после деплоя web)
WEB_URL=https://okurmen-web-xxxx.vercel.app
ADMIN_URL=https://okurmen-admin-xxxx.vercel.app
EMPLOYEE_URL=https://okurmen-employee-xxxx.vercel.app

# Auto-set
NODE_ENV=production
```

## 🔑 Генерация Секретов

### PowerShell (Windows)
```powershell
# Сгенерировать 32-символьный секрет
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### Bash (Mac/Linux)
```bash
openssl rand -base64 32
```

### Онлайн
https://generate-secret.vercel.app/32

**Сгенерируйте 3 разных секрета:**
1. JWT_SECRET
2. JWT_REFRESH_SECRET
3. NEXTAUTH_SECRET

## 📝 Checklist

### Development
- [ ] Корневой .env с DATABASE_URL
- [ ] apps/api/.env создан и заполнен
- [ ] apps/web/.env.local создан и заполнен
- [ ] Database подключается (проверить)
- [ ] API запускается без ошибок
- [ ] Web запускается без ошибок

### Production (Vercel)
- [ ] Neon database создана
- [ ] Upstash Redis создан
- [ ] Google OAuth настроен
- [ ] Gmail App Password создан
- [ ] 3 секрета сгенерированы
- [ ] API environment variables добавлены
- [ ] WEB environment variables добавлены
- [ ] Все URLs обновлены после деплоя

## 🧪 Проверка

### Локально
```bash
# Проверить API
cd apps/api
npm run dev
# Должен запуститься на :3002

# Проверить Web
cd apps/web
npm run dev
# Должен запуститься на :3000
```

### Production
```bash
# Health check API
curl https://okurmen-api-xxxx.vercel.app/api/health

# Должен вернуть
{
  "status": "ok",
  "checks": {
    "redis": "healthy",
    "database": "healthy"
  }
}
```

## 🔒 Безопасность

### ✅ DO
- ✅ Использовать сильные, случайные секреты
- ✅ Разные секреты для development и production
- ✅ Хранить секреты в Vercel Environment Variables
- ✅ Использовать .gitignore для .env файлов

### ❌ DON'T
- ❌ Коммитить .env файлы в git
- ❌ Использовать одинаковые секреты везде
- ❌ Использовать простые секреты типа "secret123"
- ❌ Показывать секреты в коде или логах

## 🐛 Troubleshooting

### "DATABASE_URL not found"
```bash
# Проверить что .env файл в правильной папке
ls -la .env

# Проверить содержимое
cat .env
```

### "JWT_SECRET is required"
```bash
# Проверить apps/api/.env
cd apps/api
cat .env | grep JWT_SECRET
```

### Vercel: "Environment variable not set"
1. Зайти в Project Settings
2. Environment Variables
3. Проверить что переменная добавлена
4. Проверить что выбраны правильные окружения (Production/Preview/Development)
5. Redeploy проект

### "Invalid DATABASE_URL"
- Проверить формат: `postgresql://user:pass@host/db?sslmode=require`
- Проверить что `?sslmode=require` добавлено
- Проверить что база данных создана в Neon

## 📋 Quick Reference

### Обязательные для всех
```env
DATABASE_URL=postgresql://...
NODE_ENV=production
```

### API дополнительно
```env
JWT_SECRET=xxx
JWT_REFRESH_SECRET=xxx
UPSTASH_REDIS_REST_URL=xxx
UPSTASH_REDIS_REST_TOKEN=xxx
EMAIL_USER=xxx
EMAIL_PASSWORD=xxx
WEB_URL=xxx
```

### WEB дополнительно
```env
NEXTAUTH_URL=xxx
NEXTAUTH_SECRET=xxx
NEXT_PUBLIC_API_URL=xxx
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
```

---

**Готово!** Environment variables настроены ✅
