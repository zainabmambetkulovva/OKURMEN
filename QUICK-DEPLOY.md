# 🚀 Быстрый деплой OKURMEN на Vercel

## ✅ Вы готовы! Vercel CLI установлен и настроен

### Аккаунт: zainabmambetkulovva-9591
### Команда: prrojectt (Hobby)

---

## 🎯 ПРОСТОЙ ДЕПЛОЙ (3 минуты)

### Шаг 1: Запустите деплой
Откройте PowerShell в папке проекта и выполните:

```powershell
vercel
```

### Шаг 2: Ответьте на вопросы

```
? Set up and deploy "~\OneDrive\Desktop\OKURMEN"? 
→ Y (нажмите Enter)

? Which scope do you want to deploy to? 
→ prrojectt (выберите вашу команду)

? Link to existing project? 
→ N (создать новый проект)

? What's your project's name? 
→ okurmen (или любое другое имя)

? In which directory is your code located? 
→ ./ (нажмите Enter)
```

### Шаг 3: Готово! 🎉

Vercel автоматически:
- ✅ Создаст проект
- ✅ Соберет приложение
- ✅ Задеплоит на preview URL
- ✅ Даст вам ссылку типа: `https://okurmen-xxx.vercel.app`

---

## 🔐 ВАЖНО: После первого деплоя

### 1. Добавьте переменные окружения

Перейдите в настройки проекта:
https://vercel.com/prrojectt/okurmen/settings/environment-variables

Добавьте эти переменные:

```
DATABASE_URL=postgresql://username:password@ep-example.us-east-2.aws.neon.tech/okurmen?sslmode=require
NEXTAUTH_URL=https://ваш-домен.vercel.app
NEXTAUTH_SECRET=ваш-секретный-ключ
GOOGLE_CLIENT_ID=ваш-google-client-id
GOOGLE_CLIENT_SECRET=ваш-google-client-secret
```

### 2. Redeploy после добавления переменных

```powershell
vercel --prod
```

### 3. Обновите Google OAuth

Зайдите в Google Cloud Console и добавьте:
- Authorized redirect URI: `https://ваш-домен.vercel.app/api/auth/callback/google`

---

## 🎨 ДЕПЛОЙ В PRODUCTION

После тестирования preview версии:

```powershell
vercel --prod
```

Это создаст production деплой на вашем основном домене!

---

## 📱 ДЕПЛОЙ ДРУГИХ ПРИЛОЖЕНИЙ

### API Backend
```powershell
cd apps/api
vercel --prod
```

### Admin Panel
```powershell
cd apps/admin
vercel --prod
```

### Employee Panel
```powershell
cd apps/employee
vercel --prod
```

### Student Panel
```powershell
cd apps/student
vercel --prod
```

---

## 🛠️ ПОЛЕЗНЫЕ КОМАНДЫ

```powershell
# Посмотреть список деплоев
vercel ls

# Посмотреть логи
vercel logs https://ваш-url.vercel.app

# Отменить последний деплой
vercel rollback

# Удалить проект
vercel remove okurmen
```

---

## 🐛 ЕСЛИ ЧТО-ТО ПОШЛО НЕ ТАК

### Build failed?
1. Проверьте логи в терминале
2. Убедитесь что все зависимости установлены
3. Попробуйте: `vercel --prod --force`

### 404 Error?
1. Проверьте `vercel.json` конфигурацию
2. Убедитесь что `outputDirectory` правильный
3. Проверьте что Next.js собрался правильно

### Database connection failed?
1. Проверьте `DATABASE_URL` в Vercel environment variables
2. Убедитесь что `?sslmode=require` добавлен
3. Проверьте что Neon DB работает

---

## 🎯 ГОТОВЫ? ЗАПУСТИТЕ:

```powershell
vercel
```

**Или сразу в production:**

```powershell
vercel --prod
```

---

## 📚 Полезные ссылки

- 📊 Dashboard: https://vercel.com/prrojectt
- 📖 Документация: https://vercel.com/docs
- 💬 Support: https://vercel.com/support

---

**Время деплоя: ~2-3 минуты**
**Стоимость: Free (Hobby plan)**

**Удачи! 🚀**
