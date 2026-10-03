# 🚀 Vercel Deployment Guide - OKURMEN

## 🎯 Полное руководство по деплою на Vercel

---

## ⚠️ ВАЖНО: Monorepo Configuration

Этот проект использует **Turborepo monorepo** структуру. Vercel требует специальной настройки.

---

## 📋 Pre-Deployment Checklist

### 1. External Services Setup (30 мин)

#### A. Neon Database (PostgreSQL)
1. Зайти на https://neon.tech
2. Create New Project
3. Name: `okurmen-production`
4. Region: выбрать ближайший
5. Скопировать `DATABASE_URL`
   ```
   postgresql://username:password@ep-xxxx.us-east-2.aws.neon.tech/okurmen?sslmode=require
   ```

#### B. Upstash Redis (Rate Limiting)
1. Зайти на https://console.upstash.com
2. Create Database
3. Name: `okurmen-redis`
4. Region: выбрать ближайший
5. Скопировать:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

#### C. Google OAuth
1. Зайти на https://console.cloud.google.com
2. Create Project: `okurmen`
3. APIs & Services → Credentials
4. Create OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs (временно):
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Скопировать:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

#### D. Gmail App Password (для 2FA)
1. Google Account → Security
2. 2-Step Verification → ON
3. App passwords
4. Generate for "Mail"
5. Скопировать 16-символьный пароль

#### E. Generate Secrets
В PowerShell выполнить **3 раза**:
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

Сохранить:
- `JWT_SECRET` = `_____________________________`
- `JWT_REFRESH_SECRET` = `_____________________________`
- `NEXTAUTH_SECRET` = `_____________________________`

---

## 🚀 Deployment Steps

### ВАЖНО: Порядок деплоя!
1. **API** → получить URL
2. **Web** → использовать API URL
3. Admin/Employee/Student → использовать API URL

---

## 📦 1. Deploy API (Backend)

### Шаг 1: Create New Project
1. Vercel Dashboard → **Add New** → **Project**
2. Import Git Repository: `zainabmambetkulovva/OKURMEN`
3. Project Settings:
   - **Project Name**: `okurmen-api`
   - **Root Directory**: `apps/api` ✅
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`

### Шаг 2: Environment Variables
Добавить ВСЕ переменные (Settings → Environment Variables):

```env
# Database
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/okurmen?sslmode=require

# JWT Secrets (сгенерированные!)
JWT_SECRET=<ваш-секрет-32-chars>
JWT_REFRESH_SECRET=<ваш-секрет-32-chars>
NEXTAUTH_SECRET=<ваш-секрет-32-chars>

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=<ваш-токен>
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
EMAIL_PASSWORD=<app-password-16-chars>

# Frontend URLs (пока временные, обновим позже)
WEB_URL=https://okurmen-web.vercel.app
ADMIN_URL=https://okurmen-admin.vercel.app
EMPLOYEE_URL=https://okurmen-employee.vercel.app

# Auto-set by Vercel
NODE_ENV=production
```

### Шаг 3: Deploy
1. Нажать **Deploy**
2. Подождать ~2-3 минуты
3. **Сохранить URL**: `https://okurmen-api-xxxx.vercel.app`

### Шаг 4: Test API
```bash
curl https://okurmen-api-xxxx.vercel.app/api/health
```

Expected:
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

## 🌐 2. Deploy Web (Frontend)

### Шаг 1: Create New Project
1. Vercel Dashboard → **Add New** → **Project**
2. Import Git Repository: `zainabmambetkulovva/OKURMEN`
3. Project Settings:
   - **Project Name**: `okurmen-web`
   - **Root Directory**: `apps/web` ✅
   - **Framework Preset**: Next.js
   - **Build Command**: оставить пустым (используется package.json)
   - **Install Command**: `npm install`

### Шаг 2: Environment Variables

```env
# NextAuth
NEXTAUTH_URL=https://okurmen-web-xxxx.vercel.app
NEXTAUTH_SECRET=<тот-же-секрет-что-в-API>

# Database
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/okurmen?sslmode=require

# API URL (из предыдущего шага!)
NEXT_PUBLIC_API_URL=https://okurmen-api-xxxx.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx

# Auto-set
NODE_ENV=production
```

### Шаг 3: Deploy
1. Нажать **Deploy**
2. Подождать ~3-4 минуты
3. **Сохранить URL**: `https://okurmen-web-xxxx.vercel.app`

### Шаг 4: Test Web
1. Открыть в браузере
2. Должна появиться анимация БИЛБАРСА
3. Проверить scroll animations

---

## 🔧 3. Update Configuration

### A. Update Google OAuth Redirect URIs
1. Google Console → Credentials
2. Edit OAuth Client
3. Add redirect URI:
   ```
   https://okurmen-web-xxxx.vercel.app/api/auth/callback/google
   ```
4. Save

### B. Update API Environment Variables
1. Vercel → `okurmen-api` → Settings → Environment Variables
2. Update:
   ```
   WEB_URL=https://okurmen-web-xxxx.vercel.app
   ```
3. Redeploy: Deployments → ... → Redeploy

---

## 👨‍💼 4. Deploy Admin Panel

### Project Settings:
- **Project Name**: `okurmen-admin`
- **Root Directory**: `apps/admin` ✅
- **Framework**: Next.js

### Environment Variables:
```env
NEXTAUTH_URL=https://okurmen-admin-xxxx.vercel.app
NEXTAUTH_SECRET=<тот-же-секрет>
DATABASE_URL=<та-же-база>
NEXT_PUBLIC_API_URL=https://okurmen-api-xxxx.vercel.app
GOOGLE_CLIENT_ID=<тот-же>
GOOGLE_CLIENT_SECRET=<тот-же>
NODE_ENV=production
```

Deploy и сохранить URL.

---

## 👔 5. Deploy Employee Panel

### Project Settings:
- **Project Name**: `okurmen-employee`
- **Root Directory**: `apps/employee` ✅
- **Framework**: Next.js

### Environment Variables:
```env
NEXTAUTH_URL=https://okurmen-employee-xxxx.vercel.app
NEXTAUTH_SECRET=<тот-же-секрет>
DATABASE_URL=<та-же-база>
NEXT_PUBLIC_API_URL=https://okurmen-api-xxxx.vercel.app
GOOGLE_CLIENT_ID=<тот-же>
GOOGLE_CLIENT_SECRET=<тот-же>
NODE_ENV=production
```

Deploy и сохранить URL.

---

## 🎓 6. Deploy Student Panel

### Project Settings:
- **Project Name**: `okurmen-student`
- **Root Directory**: `apps/student` ✅
- **Framework**: Next.js

### Environment Variables:
```env
NEXTAUTH_URL=https://okurmen-student-xxxx.vercel.app
NEXTAUTH_SECRET=<тот-же-секрет>
DATABASE_URL=<та-же-база>
NEXT_PUBLIC_API_URL=https://okurmen-api-xxxx.vercel.app
GOOGLE_CLIENT_ID=<тот-же>
GOOGLE_CLIENT_SECRET=<тот-же>
NODE_ENV=production
```

Deploy и сохранить URL.

---

## ✅ 7. Post-Deployment Verification

### A. API Health Check
```bash
curl https://okurmen-api-xxxx.vercel.app/api/health
```

### B. Web App Tests
- [ ] Homepage loads (`/`)
- [ ] БИЛБАРС intro animation plays
- [ ] Scroll animations work
- [ ] Images load correctly
- [ ] Navigation works
- [ ] Mobile responsive

### C. Authentication Tests
- [ ] Google OAuth works
- [ ] Login redirects correctly
- [ ] Session persists

### D. Database Connection
- [ ] Prisma connects
- [ ] Queries work
- [ ] No connection errors in logs

---

## 🐛 Troubleshooting

### Build Failed: "No such file or directory"

**Problem**: Vercel не находит файлы в monorepo.

**Solution**: 
1. Убедитесь что **Root Directory** установлена правильно (`apps/web`, `apps/api` и т.д.)
2. Проверьте что `vercel.json` файл существует в каждой app

### Environment Variables Not Working

**Problem**: Переменные не применяются.

**Solution**:
1. Settings → Environment Variables
2. Проверить spelling (case-sensitive!)
3. Убедиться что выбраны правильные environments: Production ✅, Preview ✅
4. Redeploy после добавления

### Database Connection Error

**Problem**: `Error: P1001: Can't reach database server`

**Solution**:
1. Проверить `DATABASE_URL` формат
2. Убедиться что `?sslmode=require` добавлен
3. Проверить что Neon database running
4. Проверить IP whitelist (Neon по умолчанию открыт)

### Redis Connection Error

**Problem**: Rate limiting не работает.

**Solution**:
1. Проверить `UPSTASH_REDIS_REST_URL` и `TOKEN`
2. Убедиться что `ENABLE_RATE_LIMIT=true`
3. Проверить Upstash dashboard (database active?)

### Images Not Loading (404)

**Problem**: БИЛБАРС изображения не грузятся.

**Solution**:
1. Проверить что файлы в `apps/web/public/bilbars/` (25 files)
2. Проверить Next.js Image config в `next.config.ts`
3. Check browser console для 404 errors
4. Verify paths: `/bilbars/БИЛБАРС xxx.png`

### Google OAuth Error

**Problem**: "redirect_uri_mismatch"

**Solution**:
1. Google Console → Credentials → OAuth Client
2. Add redirect URI: `https://your-domain.vercel.app/api/auth/callback/google`
3. Wait 5 minutes for propagation
4. Try again

---

## 📊 Performance Monitoring

### После деплоя, проверить:

1. **Vercel Analytics**
   - Dashboard → Analytics
   - Check Web Vitals

2. **Lighthouse**
   - Chrome DevTools → Lighthouse
   - Target: Score >90

3. **PageSpeed Insights**
   - https://pagespeed.web.dev
   - Test mobile + desktop

---

## 🔄 Update Deployment

### Когда вносите изменения в код:

```bash
# 1. Commit changes
git add .
git commit -m "feat: новая фича"

# 2. Push
git push origin main

# 3. Vercel auto-deploys!
```

Vercel автоматически создаст новый deploy при push в main.

---

## 💰 Cost Estimation

### Vercel Hobby Plan (Free):
- 100 GB bandwidth
- 100 builds/month
- Unlimited projects
- **Cost: $0/month** ✅

### External Services (Free tiers):
- Neon: 0.5 GB storage (free)
- Upstash: 10k requests/day (free)
- Google OAuth: Free
- Gmail: Free

**Total: $0/month** 🎉

---

## 🎉 Success Criteria

### ✅ Deploy successful if:
1. All 5 apps deployed without errors
2. Health check returns OK
3. Web app loads and БИЛБАРС animates
4. Authentication works (Google OAuth)
5. Database connected
6. Rate limiting active
7. No critical errors in Vercel logs
8. Performance metrics acceptable (Lighthouse >90)

---

## 📞 Support Resources

### Documentation:
- [DEPLOYMENT-READY.md](./DEPLOYMENT-READY.md)
- [ENV-SETUP-GUIDE.md](./ENV-SETUP-GUIDE.md)
- [FINAL-DEPLOYMENT-CHECKLIST.md](./FINAL-DEPLOYMENT-CHECKLIST.md)

### External:
- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Upstash Docs: https://docs.upstash.com
- Next.js Docs: https://nextjs.org/docs
- Turborepo Docs: https://turbo.build/repo/docs

---

## 🚀 Quick Reference

### Deployment Order:
1. API first
2. Web second
3. Admin/Employee/Student

### Required for ALL apps:
```env
DATABASE_URL=postgresql://...
NODE_ENV=production
```

### Required for API only:
```env
JWT_SECRET=xxx
UPSTASH_REDIS_REST_URL=xxx
EMAIL_USER=xxx
WEB_URL=xxx
```

### Required for Frontend apps:
```env
NEXTAUTH_URL=https://...
NEXTAUTH_SECRET=xxx
NEXT_PUBLIC_API_URL=https://...
GOOGLE_CLIENT_ID=xxx
```

---

**Готово! Следуйте шагам выше для успешного деплоя! 🚀**

**Время: ~1 час**  
**Сложность: Средняя**  
**Стоимость: Free**
