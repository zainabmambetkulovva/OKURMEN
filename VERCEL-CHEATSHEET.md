# 📝 Vercel - Шпаргалка команд

## 🚀 Основные команды

```powershell
# Деплой (preview)
vercel

# Деплой в production
vercel --prod

# Деплой с force rebuild
vercel --prod --force

# Посмотреть список проектов
vercel ls

# Линк текущей папки к проекту
vercel link
```

---

## 📊 Мониторинг

```powershell
# Логи последнего деплоя
vercel logs

# Логи конкретного URL
vercel logs https://okurmen-xxx.vercel.app

# Логи в реальном времени
vercel logs --follow

# Инспекция деплоя
vercel inspect https://okurmen-xxx.vercel.app
```

---

## 🔐 Environment Variables

```powershell
# Добавить переменную
vercel env add

# Добавить переменную для production
vercel env add VARIABLE_NAME production

# Посмотреть все переменные
vercel env ls

# Удалить переменную
vercel env rm VARIABLE_NAME

# Скачать переменные в .env.local
vercel env pull
```

---

## 🌐 Domains

```powershell
# Добавить домен
vercel domains add okurmen.kz

# Список доменов
vercel domains ls

# Удалить домен
vercel domains rm okurmen.kz

# Переместить домен
vercel domains move okurmen.kz new-project
```

---

## 🔄 Управление деплоями

```powershell
# Откатиться к предыдущей версии
vercel rollback

# Откатиться к конкретному деплою
vercel rollback https://okurmen-xxx.vercel.app

# Создать alias для деплоя
vercel alias set https://okurmen-xxx.vercel.app okurmen.com

# Удалить проект
vercel remove okurmen
```

---

## 👤 Аккаунт и команды

```powershell
# Кто я?
vercel whoami

# Логин
vercel login

# Логаут
vercel logout

# Переключить команду
vercel switch

# Список команд
vercel teams ls
```

---

## 🔍 Информация

```powershell
# Версия CLI
vercel --version

# Помощь
vercel --help

# Помощь по команде
vercel deploy --help

# Информация о текущем проекте
vercel project ls

# Статус деплоя
vercel inspect
```

---

## ⚙️ Конфигурация

```powershell
# Открыть настройки проекта
vercel project ls

# Линк проекта
vercel link --project=okurmen

# Разлинк проекта
vercel unlink
```

---

## 🐛 Отладка

```powershell
# Деплой с debug логами
vercel --debug

# Деплой с локальными файлами (игнорировать .gitignore)
vercel --local-config

# Деплой конкретной папки
vercel --cwd=./apps/web

# Пропустить build
vercel --no-build
```

---

## 📦 Специальные флаги

```powershell
# Деплой с конкретным именем
vercel --name my-deployment

# Деплой в конкретную команду
vercel --scope=prrojectt

# Публичный деплой
vercel --public

# С подтверждением
vercel --confirm

# Без ожидания (асинхронно)
vercel --no-wait
```

---

## 🎯 Быстрые сценарии

### Первый деплой
```powershell
vercel                  # Preview деплой
# Протестировать
vercel --prod          # Production деплой
```

### Срочный hotfix
```powershell
# Исправить код
vercel --prod --force  # Деплой с force rebuild
```

### Откат после проблемы
```powershell
vercel rollback        # Откат к предыдущей версии
```

### Добавить переменные
```powershell
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel --prod          # Redeploy
```

### Проверка логов после деплоя
```powershell
vercel ls              # Найти URL
vercel logs <URL>      # Посмотреть логи
```

### Настройка домена
```powershell
vercel domains add okurmen.kz
vercel alias set <deployment-url> okurmen.kz
```

---

## 🔗 Полезные URL

```
Dashboard:       https://vercel.com/dashboard
Проекты:         https://vercel.com/prrojectt
Документация:    https://vercel.com/docs
CLI Reference:   https://vercel.com/docs/cli
```

---

## 💡 Советы

### Перед деплоем
```powershell
# Проверить что все ОК
git status
# npm run build  # Локальная проверка
```

### После деплоя
```powershell
# Сразу проверить логи
vercel logs --follow
```

### Если что-то не работает
```powershell
# Debug mode
vercel --debug
# Force rebuild
vercel --prod --force
```

---

## 🎨 Алиасы (опционально)

Добавьте в PowerShell profile:

```powershell
# Быстрые алиасы
function vd { vercel }
function vp { vercel --prod }
function vl { vercel logs }
function vls { vercel ls }
function vr { vercel rollback }
```

---

## 📚 Документация

```powershell
# Открыть документацию
start https://vercel.com/docs

# Открыть dashboard
start https://vercel.com/dashboard
```

---

**Сохраните эту шпаргалку!** 📌

_Быстрый доступ к всем Vercel командам_
