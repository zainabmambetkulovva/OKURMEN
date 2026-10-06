# Admin Auth Fix - Session Persistence After 2FA

## Проблема
После успешной 2FA верификации Admin Dashboard появляется на 1-2 секунды, затем происходит редирект на `/auth/signin`. Токен сохраняется в localStorage, но не проходит валидацию при проверке через `/api/auth/me`.

## Исправления

### 1. Изменен порядок проверки userId в `/api/auth/me`
**Файл:** `apps/api/src/app/api/auth/me/route.ts`

**Было:**
```typescript
const userId = (payload.user_id || payload.id || payload.userId) as string;
```

**Стало:**
```typescript
const userId = (payload.userId || payload.user_id || payload.id) as string;
```

**Причина:** 
- `/api/auth/verify-2fa` создает JWT с полем `userId` (camelCase)
- `/api/auth/me` проверял сначала `user_id` (snake_case), что не совпадало
- Теперь оба endpoint'а используют одинаковое поле первым

### 2. Добавлено детальное логирование JWT ошибок
**Файл:** `apps/api/src/app/api/auth/me/route.ts`

Добавлен try-catch блок вокруг `jwtVerify()` с логированием конкретной ошибки:
```typescript
try {
  const verified = await jwtVerify(token, JWT_SECRET);
  payload = verified.payload;
  console.log('JWT verified successfully');
  console.log('JWT payload:', payload);
} catch (jwtError) {
  console.error('JWT verification failed:', jwtError);
  return NextResponse.json(
    { success: false, error: 'Invalid or expired token' },
    { status: 401 }
  );
}
```

### 3. Добавлен debug endpoint для проверки env variables
**Файл:** `apps/api/src/app/api/debug/env/route.ts`

Endpoint для проверки наличия переменных окружения:
```
GET /api/debug/env
```

Возвращает:
```json
{
  "hasNextAuthSecret": boolean,
  "hasAuthSecret": boolean,
  "hasDatabaseUrl": boolean,
  "hasTelegramToken": boolean,
  "hasTelegramChatId": boolean,
  "nodeEnv": string
}
```

## Проверка на Production

### 1. Проверьте, что deployment завершился успешно
```
https://vercel.com/dashboard
```

### 2. Проверьте environment variables через debug endpoint
```bash
curl https://okurmen-api.vercel.app/api/debug/env
```

Убедитесь, что `hasNextAuthSecret: true`.

### 3. Попробуйте авторизоваться в Admin
```
https://okurmen-admin.vercel.app/auth/signin
```

1. Введите email и пароль
2. Дождитесь 2FA кода в Telegram
3. Введите код
4. После успешной верификации должен открыться Dashboard **без редиректа**

### 4. Проверьте логи Vercel
```
Vercel Dashboard → okurmen-api → Deployments → [Latest] → Logs
```

Найдите логи `/api/auth/me`:
- Должно быть: `"JWT verified successfully"`
- НЕ должно быть: `"JWT verification failed"`

### 5. Проверьте сохранение сессии после refresh
После успешной авторизации обновите страницу (F5). Dashboard должен остаться открытым.

## Возможные проблемы

### Проблема 1: JWT verification failed
**Причина:** Разные секреты между `verify-2fa` и `me`

**Решение:** Проверьте, что `NEXTAUTH_SECRET` установлен в Vercel Environment Variables для `okurmen-api` Production.

### Проблема 2: User not found or inactive
**Причина:** 
- UserId из токена не найден в базе данных
- User.isActive = false

**Решение:** Проверьте базу данных:
```sql
SELECT id, email, "isActive" FROM "User" WHERE email = 'admin@okurmen.kg';
```

### Проблема 3: Token exists: false
**Причина:** Токен не передается из Admin в API

**Решение:** 
- Проверьте, что `localStorage.getItem('auth-token')` возвращает значение в браузере
- Проверьте Network tab → Request Headers → Authorization: Bearer ...

### Проблема 4: CORS error
**Причина:** API не разрешает запросы от Admin domain

**Решение:** Проверьте `ALLOWED_ORIGINS` в Vercel Environment Variables для `okurmen-api`.

## Commit
```
commit c2a8122
fix: improve JWT validation in /api/auth/me endpoint

- Change userId field check order: userId -> user_id -> id
- Add detailed JWT verification error logging
- Add debug endpoint to check environment variables
```

## Deployment
Branch: `admin-auth`
Vercel Auto-Deploy: активен для okurmen-api

После push изменений Vercel автоматически создаст новый deployment.
