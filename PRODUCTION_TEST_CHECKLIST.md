# Production Test Checklist - Admin Auth Fix

## Commits Deployed
1. **c2a8122** - JWT validation improvements in `/api/auth/me`
2. **df00a3d** - AdminLayoutClient infinite loop fix (CRITICAL)

---

## Test Steps

### 1. Проверьте Deployment Status
Откройте Vercel Dashboard и убедитесь, что оба проекта успешно задеплоились:
- ✅ okurmen-api (commit df00a3d)
- ✅ okurmen-admin (commit df00a3d)

### 2. Проверьте Environment Variables

#### Для okurmen-api:
```bash
curl https://okurmen-api.vercel.app/api/debug/env
```

Ожидаемый результат:
```json
{
  "hasNextAuthSecret": true,
  "hasAuthSecret": false,
  "hasDatabaseUrl": true,
  "hasTelegramToken": true,
  "hasTelegramChatId": true,
  "nodeEnv": "production"
}
```

**Если `hasNextAuthSecret: false`:**
1. Откройте Vercel Dashboard → okurmen-api → Settings → Environment Variables
2. Добавьте: `NEXTAUTH_SECRET=8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d`
3. Environment: Production
4. Redeploy okurmen-api

### 3. Тест Полного Flow Авторизации

#### Шаг 1: Откройте Admin Login
```
https://okurmen-admin.vercel.app/auth/signin
```

#### Шаг 2: Введите Credentials
- Email: `admin@okurmen.kg`
- Password: `Admin123!LocalDev`

#### Шаг 3: Дождитесь 2FA кода
Код придет в Telegram (CHAT_ID: 1376366540)

#### Шаг 4: Введите 2FA код
После ввода правильного кода:
- ✅ Dashboard должен открыться
- ✅ НЕ должно быть редиректа на /auth/signin
- ✅ URL должен остаться: `https://okurmen-admin.vercel.app/admin`

#### Шаг 5: Refresh страницы (F5)
После обновления страницы:
- ✅ Dashboard должен остаться открытым
- ✅ НЕ должно быть редиректа на /auth/signin
- ✅ User info должен отображаться в sidebar

### 4. Проверьте Browser Console
Откройте DevTools (F12) → Console

**Ожидаемые логи после успешного login:**
```
[2FA] Сохранение токена в localStorage...
[2FA] Токен сохранён, длина: <number>
[2FA] Проверка: токен в localStorage: true
[2FA] Переход на /admin...
```

**Ожидаемые логи при загрузке Dashboard:**
```
Token found, checking with API...
Auth check successful, user: {id: ..., name: ..., email: ..., role: ...}
```

**НЕ должно быть:**
```
No token found, redirecting to signin
Auth check failed, clearing token and redirecting
JWT verification failed
```

### 5. Проверьте Network Tab
DevTools (F12) → Network

#### Request: `GET /api/auth/me`
- Status: **200 OK**
- Request Headers:
  - `Authorization: Bearer <token>`
- Response:
  ```json
  {
    "success": true,
    "user": {
      "id": "...",
      "name": "...",
      "email": "admin@okurmen.kg",
      "role": "ADMIN",
      "photoUrl": null
    }
  }
  ```

**Если Status 401:**
- Откройте Vercel Logs для okurmen-api
- Найдите логи `/api/auth/me`
- Проверьте причину ошибки

### 6. Проверьте localStorage
DevTools (F12) → Application → Local Storage → `https://okurmen-admin.vercel.app`

- Должен быть ключ: `auth-token`
- Значение: JWT строка (длинная)

### 7. Тест Logout
Нажмите кнопку Logout в sidebar:
- ✅ Должен произойти редирект на `/auth/signin`
- ✅ Токен должен быть удален из localStorage
- ✅ Повторный переход на `/admin` должен редиректить на `/auth/signin`

---

## Возможные Проблемы и Решения

### Проблема 1: Dashboard появляется и сразу редиректит
**Причина:** Старая версия кода все еще в production

**Решение:**
1. Проверьте commit hash в Vercel Deployment
2. Убедитесь, что это commit `df00a3d` или новее
3. Если нет - дождитесь завершения deployment

### Проблема 2: JWT verification failed
**Причина:** `NEXTAUTH_SECRET` не установлен или отличается

**Решение:**
1. Проверьте `/api/debug/env` - должно быть `hasNextAuthSecret: true`
2. Если false - добавьте в Vercel Environment Variables
3. Redeploy okurmen-api

### Проблема 3: 401 Unauthorized на /api/auth/me
**Причина:** Токен не передается или JWT невалиден

**Решение:**
1. Проверьте Network → Request Headers → Authorization
2. Проверьте Vercel Logs для детальной ошибки
3. Проверьте userId в payload совпадает с userId в базе данных

### Проблема 4: User not found or inactive
**Причина:** User с таким email не существует или isActive = false

**Решение:**
1. Проверьте базу данных:
   ```sql
   SELECT id, email, "isActive", role FROM "User" WHERE email = 'admin@okurmen.kg';
   ```
2. Если user не найден - создайте через admin seed script
3. Если isActive = false - обновите: `UPDATE "User" SET "isActive" = true WHERE email = 'admin@okurmen.kg';`

---

## Success Criteria

Тест считается успешным если:

1. ✅ Login с email + password работает
2. ✅ 2FA код приходит в Telegram
3. ✅ После ввода правильного 2FA кода Dashboard открывается
4. ✅ **НЕТ автоматического редиректа на /auth/signin**
5. ✅ Dashboard остается доступным после refresh страницы
6. ✅ Logout работает корректно
7. ✅ `/api/auth/me` возвращает 200 OK с user data
8. ✅ Console логи показывают "Auth check successful"

---

## Дополнительная Диагностика

### Проверка Vercel Logs в реальном времени
```bash
# Установите Vercel CLI (если еще не установлен)
npm i -g vercel

# Авторизуйтесь
vercel login

# Смотрите логи в реальном времени
vercel logs okurmen-api --follow
```

### Тест JWT токена локально
Скопируйте токен из localStorage и декодируйте на jwt.io:
- Проверьте payload.userId
- Проверьте exp (expiration) - не истек ли токен
- Проверьте iat (issued at)

### Прямой тест /api/auth/me через curl
```bash
# Замените <TOKEN> на реальный токен из localStorage
curl -H "Authorization: Bearer <TOKEN>" \
  https://okurmen-api.vercel.app/api/auth/me
```

---

## Контакты для поддержки

Если тесты не проходят, предоставьте следующую информацию:
1. Screenshot браузера с ошибкой
2. Console logs (F12)
3. Network tab для запроса `/api/auth/me`
4. Vercel deployment URL и commit hash
5. Результат `/api/debug/env`
