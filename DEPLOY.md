# 🚀 Деплой OKURMEN на Vercel

## ✅ Текущий статус
- **Vercel CLI**: Установлен ✓
- **Аккаунт**: zainabmambetkulovva-9591 ✓
- **Команда**: prrojectt (Hobby план) ✓
- **Проект ID**: prj_JXjTDQrcluv6AyXWWq9xIyWbmpp2 ✓

## 📋 Что нужно задеплоить

У вас монорепо с несколькими приложениями:
1. **apps/web** - Основной сайт (Next.js)
2. **apps/api** - API бэкенд (Next.js API routes)
3. **apps/admin** - Админ панель
4. **apps/employee** - Панель сотрудника
5. **apps/student** - Панель студента

## 🎯 Шаг 1: Деплой Web приложения (главный сайт)

### Вариант А: Быстрый деплой (рекомендуется)

```powershell
# Деплой в production
vercel --prod

# Или сначала в preview
vercel
```

### Вариант Б: С указанием директории

```powershell
cd apps/web
vercel --prod
```

## 🔐 Шаг 2: Настройка переменных окружения

После деплоя нужно добавить переменные в Vercel Dashboard:

### Обязательные переменные для WEB:
```bash
NEXTAUTH_URL=https://ваш-домен.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=postgresql://username:password@ep-example.us-east-2.aws.neon.tech/okurmen?sslmode=require
```

### Два способа добавить переменные:

#### Способ 1: Через веб-интерфейс
1. Откройте: https://vercel.com/prrojectt/okurmen/settings/environment-variables
2. Добавьте каждую переменную
3. Выберите окружения: Production, Preview, Development

#### Способ 2: Через CLI
```powershell
# Добавить переменную
vercel env add NEXTAUTH_SECRET

# Или загрузить из файла
vercel env pull
```

## 🏗️ Шаг 3: Деплой API приложения

API нужно задеплоить отдельно:

```powershell
cd apps/api
vercel --prod
```

**Важно!** После деплоя API получите его URL и обновите в web приложении:
```
API_URL=https://your-api.vercel.app
```

## 📱 Шаг 4: Деплой остальных приложений (опционально)

### Admin панель
```powershell
cd apps/admin
vercel --prod
```

### Employee панель
```powershell
cd apps/employee
vercel --prod
```

### Student панель
```powershell
cd apps/student
vercel --prod
```

## 🔧 Важные настройки

### 1. Обновить URLs после деплоя

После получения доменов обновите в `.env`:
```env
WEB_URL=https://okurmen.vercel.app
API_URL=https://okurmen-api.vercel.app
ADMIN_URL=https://okurmen-admin.vercel.app
EMPLOYEE_URL=https://okurmen-employee.vercel.app
STUDENT_URL=https://okurmen-student.vercel.app
```

### 2. Google OAuth

Добавьте новые URLs в Google Console:
- Authorized redirect URIs: `https://ваш-домен.vercel.app/api/auth/callback/google`

### 3. Database

Убедитесь что Neon PostgreSQL доступен из Vercel:
- Проверьте IP whitelist (обычно не нужно для Neon)
- SSL должен быть включен (`?sslmode=require`)

## 📊 Мониторинг деплоя

### Проверить статус
```powershell
vercel ls
```

### Посмотреть логи
```powershell
vercel logs https://ваш-домен.vercel.app
```

### Отменить деплой
```powershell
vercel remove okurmen
```

## 🎨 Настройка кастомного домена (опционально)

```powershell
vercel domains add okurmen.kz
```

Или через веб-интерфейс: Settings → Domains

## ⚡ Оптимизация для production

### 1. Включить кэширование
В `next.config.ts`:
```typescript
const config = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  images: {
    domains: ['ваш-cdn-домен.com']
  }
}
```

### 2. Настроить rewrites для API
В `vercel.json` уже настроен базовый конфиг.

### 3. Edge Functions (опционально)
Для быстрого ответа добавьте:
```typescript
export const config = {
  runtime: 'edge',
}
```

## 🐛 Решение проблем

### Ошибка сборки
```powershell
# Очистить кэш и пересобрать
vercel --force
```

### Ошибки с зависимостями
```powershell
# Проверить package.json engines
node --version  # должно быть >=20.0.0
```

### Ошибки базы данных
- Проверьте DATABASE_URL в переменных окружения Vercel
- Убедитесь что база доступна извне

## 📞 Полезные команды

```powershell
# Посмотреть текущий проект
vercel inspect

# Список деплоев
vercel ls

# Алиасы
vercel alias set https://your-deployment.vercel.app okurmen.vercel.app

# Переключить команду
vercel switch

# Линк проекта
vercel link
```

## 🎯 Быстрый старт (TL;DR)

```powershell
# 1. Деплой web
vercel --prod

# 2. Добавить переменные окружения через dashboard
# https://vercel.com/prrojectt/okurmen/settings/environment-variables

# 3. Готово! 🎉
```

## 📚 Полезные ссылки

- Dashboard: https://vercel.com/prrojectt
- Документация: https://vercel.com/docs
- CLI Reference: https://vercel.com/docs/cli

---

**Готовы к деплою? Запустите:** `vercel --prod` 🚀
