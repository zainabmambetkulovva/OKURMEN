# ✅ Чеклист перед деплоем OKURMEN

## 🔍 Проверка готовности

### 1. ✅ Структура проекта
- [x] Monorepo настроен правильно
- [x] `vercel.json` создан
- [x] `next.config.ts` имеет `output: 'standalone'`
- [x] Turbo настроен для сборки

### 2. 📦 Зависимости
- [ ] Все `package.json` имеют правильные версии
- [ ] Node.js >=20.0.0 указан в engines
- [ ] Нет конфликтов зависимостей

### 3. 🔐 Переменные окружения

#### Обязательные для WEB:
```
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DATABASE_URL=
```

#### Обязательные для API:
```
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=
```

### 4. 🗄️ База данных
- [ ] Neon PostgreSQL работает
- [ ] Миграции применены
- [ ] Seed данные загружены (опционально)
- [ ] SSL включен в connection string

### 5. 🔑 OAuth настройки

#### Google Console (https://console.cloud.google.com):
- [ ] Authorized JavaScript origins добавлен:
  - `https://ваш-домен.vercel.app`
- [ ] Authorized redirect URIs добавлен:
  - `https://ваш-домен.vercel.app/api/auth/callback/google`

### 6. 📝 Код готов
- [ ] Нет console.log в production коде
- [ ] Нет hardcoded URLs (все через env)
- [ ] Error handling настроен
- [ ] Loading states добавлены

### 7. 🎨 Статические файлы
- [ ] Все изображения в `public/`
- [ ] Favicon настроен
- [ ] robots.txt создан (если нужен)
- [ ] sitemap.xml создан (если нужен)

## 🚀 Порядок деплоя

### Шаг 1: Задеплоить API первым
```powershell
cd apps/api
vercel --prod
```
**Получите URL:** `https://okurmen-api-xxx.vercel.app`

### Шаг 2: Обновить переменные для WEB
Добавьте в Vercel Dashboard для WEB:
```
NEXT_PUBLIC_API_URL=https://okurmen-api-xxx.vercel.app
```

### Шаг 3: Задеплоить WEB
```powershell
cd ..
vercel --prod
```

### Шаг 4: Обновить Google OAuth
Добавьте реальный URL в Google Console

### Шаг 5: Протестировать
- [ ] Главная страница загружается
- [ ] API endpoints отвечают
- [ ] Авторизация работает
- [ ] База данных подключена

## 🔧 После деплоя

### Немедленно:
1. Проверить все страницы
2. Протестировать формы
3. Проверить логи: `vercel logs`
4. Настроить мониторинг

### В течение дня:
1. Проверить аналитику
2. Мониторить ошибки
3. Проверить производительность
4. Собрать feedback

## 🐛 Если что-то пошло не так

### API не отвечает
```powershell
vercel logs https://your-api-url.vercel.app --follow
```

### База данных не подключается
- Проверьте DATABASE_URL в env variables
- Проверьте SSL mode: `?sslmode=require`
- Проверьте IP whitelist в Neon (если есть)

### OAuth не работает
- Проверьте redirect URI в Google Console
- Проверьте NEXTAUTH_URL и NEXTAUTH_SECRET
- Очистите cookies и попробуйте снова

### Build failed
```powershell
# Проверить локально
cd apps/web
npm run build

# Если ошибка, исправить и задеплоить снова
vercel --prod --force
```

## 📊 Мониторинг после деплоя

### Vercel Dashboard
- Deployments: https://vercel.com/prrojectt/okurmen/deployments
- Analytics: https://vercel.com/prrojectt/okurmen/analytics
- Logs: https://vercel.com/prrojectt/okurmen/logs

### Что проверить:
- [ ] Response time <1s
- [ ] Error rate <1%
- [ ] Build time
- [ ] Bundle size

## 🎯 Готовы к деплою?

**Команда для деплоя:**
```powershell
# Из корня проекта
vercel --prod
```

**Или шаг за шагом:**
```powershell
# 1. Preview деплой (тест)
vercel

# 2. Если все ОК, в production
vercel --prod
```

---

**Статус:** Проект готов к деплою! 🚀

**Следующий шаг:** Запустите `vercel --prod` и следуйте инструкциям
