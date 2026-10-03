# 🚀 Деплой OKURMEN - Пошаговая инструкция

## 📋 Что создано для деплоя

✅ **Файлы конфигурации:**
- `vercel.json` - основная конфигурация Vercel
- `.vercelignore` - что не загружать на Vercel
- `.env.vercel.example` - шаблон переменных окружения

✅ **Документация:**
- `QUICK-DEPLOY.md` - быстрый старт (читайте это первым!)
- `DEPLOY.md` - детальная инструкция
- `PRE-DEPLOY-CHECKLIST.md` - чеклист перед деплоем

---

## 🎯 НАЧНИТЕ ОТСЮДА

### 1️⃣ Прочитайте быстрый старт
```powershell
cat QUICK-DEPLOY.md
```

### 2️⃣ Запустите деплой
```powershell
vercel
```

### 3️⃣ Добавьте переменные окружения
После первого деплоя перейдите в Vercel Dashboard и добавьте переменные из `.env.vercel.example`

### 4️⃣ Redeploy с переменными
```powershell
vercel --prod
```

---

## 📊 Структура деплоя

```
OKURMEN (монорепо)
│
├── apps/web      → vercel.com/prrojectt/okurmen-web
├── apps/api      → vercel.com/prrojectt/okurmen-api
├── apps/admin    → vercel.com/prrojectt/okurmen-admin
├── apps/employee → vercel.com/prrojectt/okurmen-employee
└── apps/student  → vercel.com/prrojectt/okurmen-student
```

**Рекомендация:** Деплойте каждое приложение как отдельный проект на Vercel.

---

## ⚡ Быстрые команды

```powershell
# Preview деплой (тест)
vercel

# Production деплой
vercel --prod

# Посмотреть список деплоев
vercel ls

# Логи последнего деплоя
vercel logs

# Отменить деплой
vercel rollback
```

---

## 🔐 Безопасность

**ВАЖНО:** Никогда не коммитьте эти файлы:
- `.env`
- `.env.local`
- `.env.production`

Все секреты должны быть только в Vercel Environment Variables!

---

## 📱 После деплоя

1. ✅ Протестируйте все страницы
2. ✅ Проверьте OAuth авторизацию
3. ✅ Проверьте подключение к базе данных
4. ✅ Настройте monitoring в Vercel Dashboard
5. ✅ Настройте custom domain (опционально)

---

## 🆘 Нужна помощь?

- 📖 Читайте `DEPLOY.md` для детальной информации
- 📋 Используйте `PRE-DEPLOY-CHECKLIST.md` перед деплоем
- 🌐 Vercel Docs: https://vercel.com/docs
- 💬 Vercel Support: https://vercel.com/support

---

## 🎉 Готовы?

### Запустите прямо сейчас:

```powershell
vercel
```

**Время деплоя: ~3 минуты**

**Удачи! 🚀**

---

## 📞 Статус

- ✅ Vercel CLI установлен
- ✅ Аккаунт: zainabmambetkulovva-9591
- ✅ Команда: prrojectt
- ✅ Конфигурация готова
- 🚀 Готов к деплою!
