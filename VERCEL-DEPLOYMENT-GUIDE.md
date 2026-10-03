# 🚀 OKURMEN - Полное Руководство по Деплою на Vercel

## 📋 Предварительные Требования

### ✅ Что нужно иметь:
1. **Vercel Account** - https://vercel.com/signup
2. **GitHub Repository** - код должен быть в GitHub
3. **Neon Database** - https://neon.tech (PostgreSQL)
4. **Upstash Redis** - https://upstash.com (для rate limiting)
5. **Google OAuth** - https://console.cloud.google.com
6. **Gmail App Password** - для 2FA email

---

## 🎯 Архитектура Деплоя

```
OKURMEN Monorepo
├── apps/web      → okurmen.vercel.app        (Main Website)
├── apps/api      → okurmen-api.vercel.app    (Backend API)
├── apps/admin    → okurmen-admin.vercel.app  (Admin Panel)
├── apps/employee → okurmen-employee.vercel.app (Employee Panel)
└── apps/student  → okurmen-student.vercel.app (Student Panel)
```

**Каждое приложение деплоится ОТДЕЛЬНО!**

---

## 📝 Шаг 1: Подготовка Базы Данных (Neon)

### 1.1 Создать проект в Neon
1. Зайти на https://console.neon.tech
2. Create New Project
3. Название: `okurmen-production`
4. Region: выбрать ближайший (например, AWS US East)

### 1.2 Получить Connection String
```
postgresql://username:password@ep-xxxx.us-east-2.aws.neon.tech/okurmen?sslmode=require
```

### 1.3 Применить миграции (локально)
```bash
# В корне проекта
cd packages/database
DATABASE_URL="postgresql://..." npx prisma migrate deploy
DATABASE_URL="postgresql://..." npx prisma db seed
```

---

## 🔐 Шаг 2: Настроить Upstash Redis

### 2.1 Создать базу
1. https://console.upstash.com
2. Create Database
3. Name: `okurmen-rate-limit`
4. Type: Regional
5. Region: выбрать ближайший

### 2.2 Получить credentials
- REST URL: `https://xxxxx.upstash.io`
- REST Token: `AxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ`

---

## 🔑 Шаг 3: Настроить Google OAuth

### 3.1 Создать проект
1. https://console.cloud.google.com
2. Create Project → `OKURMEN`

### 3.2 Настроить OAuth
1. APIs & Services → Credentials
2. Create Credentials → OAuth 2.0 Client ID
3. Application type: Web application
4. Name: `OKURMEN Web`

### 3.3 Authorized redirect URIs
Добавить (замените домен на ваш):
```
https://okurmen.vercel.app/api/auth/callback/google
https://okurmen-admin.vercel.app/api/auth/callback/google
https://okurmen-employee.vercel.app/api/auth/callback/google
```

### 3.4 Сохранить credentials
- Client ID: `xxxxx.apps.googleusercontent.com`
- Client Secret: `GOCSPX-xxxxx`

---

## 📧 Шаг 4: Gmail App Password

1. Google Account → Security
2. 2-Step Verification (включить если не включено)
3. App passwords
4. Select app: Mail
5. Select device: Other → `OKURMEN API`
6. Generate → Сохранить пароль

---

## 🔐 Шаг 5: Генерация Секретов

Запустите в PowerShell:
```powershell
# JWT_SECRET
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# JWT_REFRESH_SECRET
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# NEXTAUTH_SECRET
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

Сохраните все 3 секрета!

---

## 🚀 Шаг 6: Деплой API (Первым!)

### 6.1 Создать проект в Vercel
1. https://vercel.com/new
2. Import Git Repository
3. Select: ваш репозиторий OKURMEN
4. Project Name: `okurmen-api`
5. Framework Preset: Next.js
6. Root Directory: `apps/api` ✅ ВАЖНО!

### 6.2 Build Settings
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 6.3 Environment Variables
Добавить ВСЕ эти переменные:

```env
# Database
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/okurmen?sslmode=require

# JWT
JWT_SECRET=ваш-сгенерированный-секрет-32-chars
JWT_REFRESH_SECRET=ваш-сгенерированный-секрет-32-chars
NEXTAUTH_SECRET=ваш-сгенерированный-секрет-32-chars

# Node
NODE_ENV=production

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=ваш-токен
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

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=ваш-app-password

# Frontend URLs (заполним после деплоя web)
WEB_URL=https://okurmen.vercel.app
ADMIN_URL=https://okurmen-admin.vercel.app
EMPLOYEE_URL=https://okurmen-employee.vercel.app
```

### 6.4 Deploy
1. Click **Deploy**
2. Дождаться успешного деплоя
3. Получить URL: `https://okurmen-api-xxxx.vercel.app`
4. **Сохранить этот URL!**

### 6.5 Проверить Health
```bash
curl https://okurmen-api-xxxx.vercel.app/api/health
```

Должен вернуть:
```json
{
  "status": "ok",
  "checks": {
    "redis": "healthy",
    "database": "healthy"
  }
}
```

---

## 🌐 Шаг 7: Деплой WEB (Main Website)

### 7.1 Создать проект
1. Vercel → New Project
2. Same repository
3. Project Name: `okurmen-web`
4. Root Directory: `apps/web` ✅ ВАЖНО!

### 7.2 Environment Variables
```env
# NextAuth
NEXTAUTH_URL=https://okurmen-web-xxxx.vercel.app
NEXTAUTH_SECRET=ваш-nextauth-secret-из-шага-5

# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx

# Database
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/okurmen?sslmode=require

# API URL (из шага 6.4)
NEXT_PUBLIC_API_URL=https://okurmen-api-xxxx.vercel.app

# Node
NODE_ENV=production
```

### 7.3 Deploy
1. Click **Deploy**
2. Получить URL: `https://okurmen-web-xxxx.vercel.app`

### 7.4 Проверить
Откройте в браузере и проверьте:
- ✅ Главная страница загружается
- ✅ БИЛБАРС появляется (intro)
- ✅ Все секции со scroll анимациями
- ✅ Навигация работает

---

## 👨‍💼 Шаг 8: Деплой ADMIN Panel

### 8.1 Создать проект
- Project Name: `okurmen-admin`
- Root Directory: `apps/admin`

### 8.2 Environment Variables
```env
NEXTAUTH_URL=https://okurmen-admin-xxxx.vercel.app
NEXTAUTH_SECRET=тот-же-секрет
GOOGLE_CLIENT_ID=тот-же
GOOGLE_CLIENT_SECRET=тот-же
DATABASE_URL=тот-же
NEXT_PUBLIC_API_URL=https://okurmen-api-xxxx.vercel.app
NODE_ENV=production
```

### 8.3 Deploy

---

## 👔 Шаг 9: Деплой EMPLOYEE Panel

### 9.1 Создать проект
- Project Name: `okurmen-employee`
- Root Directory: `apps/employee`

### 9.2 Environment Variables
```env
NEXTAUTH_URL=https://okurmen-employee-xxxx.vercel.app
NEXTAUTH_SECRET=тот-же-секрет
DATABASE_URL=тот-же
NEXT_PUBLIC_API_URL=https://okurmen-api-xxxx.vercel.app
NODE_ENV=production
```

### 9.3 Deploy

---

## 🎓 Шаг 10: Деплой STUDENT Panel

### 10.1 Создать проект
- Project Name: `okurmen-student`
- Root Directory: `apps/student`

### 10.2 Environment Variables
Те же что в employee

### 10.3 Deploy

---

## 🔄 Шаг 11: Обновить URL во всех проектах

### 11.1 API - обновить Frontend URLs
```env
WEB_URL=https://okurmen-web-xxxx.vercel.app
ADMIN_URL=https://okurmen-admin-xxxx.vercel.app
EMPLOYEE_URL=https://okurmen-employee-xxxx.vercel.app
```
Redeploy API!

### 11.2 Google OAuth - добавить все redirect URIs
```
https://okurmen-web-xxxx.vercel.app/api/auth/callback/google
https://okurmen-admin-xxxx.vercel.app/api/auth/callback/google
https://okurmen-employee-xxxx.vercel.app/api/auth/callback/google
```

---

## 🌍 Шаг 12: Custom Domains (Опционально)

### 12.1 Добавить домен в Vercel
1. Project Settings → Domains
2. Add Domain: `okurmen.kz`
3. Следовать инструкциям DNS

### 12.2 Настроить поддомены
- `api.okurmen.kz` → okurmen-api
- `admin.okurmen.kz` → okurmen-admin
- `employee.okurmen.kz` → okurmen-employee
- `student.okurmen.kz` → okurmen-student

### 12.3 Обновить Environment Variables
Заменить все `.vercel.app` на ваши домены!

---

## ✅ Финальная Проверка

### Web App
- [ ] Главная страница загружается
- [ ] БИЛБАРС intro работает
- [ ] Все секции видны
- [ ] Scroll анимации работают
- [ ] Изображения загружаются
- [ ] Responsive работает на mobile

### API
- [ ] Health check возвращает OK
- [ ] Rate limiting работает
- [ ] Database подключена
- [ ] Redis работает

### Auth
- [ ] Google OAuth работает
- [ ] Login/Logout работает
- [ ] 2FA email приходит

### Admin Panel
- [ ] Загружается
- [ ] Авторизация работает
- [ ] CRUD операции работают

---

## 🐛 Troubleshooting

### Build Failed
```bash
# Проверить локально
cd apps/web
npm run build

# Если ошибка - исправить и push
```

### Environment Variables не работают
- Проверить что добавлены в Vercel
- Проверить названия (case-sensitive)
- Redeploy после добавления

### Database Connection Error
- Проверить DATABASE_URL
- Проверить `?sslmode=require`
- Проверить что миграции применены

### Rate Limiting не работает
- Проверить Upstash credentials
- Проверить ENABLE_RATE_LIMIT=true

### OAuth Error
- Проверить redirect URIs в Google Console
- Проверить Client ID и Secret
- Проверить NEXTAUTH_URL

---

## 📊 Monitoring

### Vercel Dashboard
- Analytics: Traffic, Performance
- Logs: Real-time logs
- Deployments: History

### Проверить Performance
- Lighthouse в Chrome DevTools
- Web Vitals в Vercel Analytics

---

## 🎉 Готово!

Ваш проект OKURMEN успешно задеплоен на Vercel!

### URLs:
- 🌐 Web: https://okurmen-web-xxxx.vercel.app
- 🔧 API: https://okurmen-api-xxxx.vercel.app
- 👨‍💼 Admin: https://okurmen-admin-xxxx.vercel.app
- 👔 Employee: https://okurmen-employee-xxxx.vercel.app
- 🎓 Student: https://okurmen-student-xxxx.vercel.app

---

**Время деплоя**: ~30-60 минут
**Сложность**: Средняя
**Стоимость**: Free (Hobby Plan) + Neon Free Tier

**Удачи! 🚀**
