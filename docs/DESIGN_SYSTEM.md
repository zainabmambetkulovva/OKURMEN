# 🎨 OKURMEN Design System

> Premium Modern EdTech Design System  
> **Цветовая концепция**: WHITE + BLUE + ORANGE

---

## 📋 Содержание

1. [Визуальное направление](#визуальное-направление)
2. [Цветовая система](#цветовая-система)
3. [Типографика](#типографика)
4. [Spacing System](#spacing-system)
5. [UI Компоненты](#ui-компоненты)
6. [Responsive Design](#responsive-design)
7. [Анимации](#анимации)
8. [Правила использования](#правила-использования)

---

## 🎯 Визуальное направление

**Premium Modern EdTech**
- Чистый, светлый, технологичный, но не холодный
- Минималистичный подход к UI
- Фокус на контенте и читаемости
- Профессиональный и доверительный образ

**Принципы:**
- ✅ Clarity (Ясность)
- ✅ Consistency (Консистентность)
- ✅ Accessibility (Доступность)
- ✅ Premium feel (Премиум качество)

**Избегаем:**
- ❌ Purple/Violet оттенки
- ❌ Neon gradients
- ❌ Excessive glow effects
- ❌ Glassmorphism
- ❌ Dark-heavy backgrounds
- ❌ Случайные декоративные элементы

---

## 🎨 Цветовая система

### Primary Blue (Основной синий)
**Использование**: Кнопки, ссылки, акценты, иконки

```
primary-50:  #E8F2FF  // Lightest backgrounds
primary-100: #D0E5FF  // Light backgrounds
primary-200: #A3CCFF  // Hover states
primary-300: #75B3FF
primary-400: #4799FF
primary-500: #1A80FF  // ⭐ Main saturated blue
primary-600: #0066E6  // Hover for primary-500
primary-700: #004DB3  // Dark blue
primary-800: #003380
primary-900: #001A4D  // Darkest
```

### Accent Orange (Акцент)
**Использование**: CTA кнопки, важные элементы, выделения

```
accent-50:  #FFF4E6
accent-100: #FFE9CC
accent-200: #FFD399
accent-300: #FFBD66
accent-400: #FFA733
accent-500: #FF9100  // ⭐ Main vibrant orange
accent-600: #E68200  // Hover
accent-700: #B36500
accent-800: #804800
accent-900: #4D2B00
```

### Dark (Текст и нейтральные оттенки)
**Использование**: Основной текст, заголовки, borders

```
dark-50:  #F0F4F8  // Light backgrounds
dark-100: #D9E2EC  // Borders light
dark-200: #BCCCDC
dark-300: #9FB3C8
dark-400: #829AB1
dark-500: #627D98
dark-600: #486581
dark-700: #334E68  // ⭐ Main text color
dark-800: #243B53
dark-900: #102A43  // Darkest text
```

### Semantic Colors
```
White:   #FFFFFF  // Main background
Success: primary-500
Warning: accent-500
Error:   #EF4444
Info:    primary-500
```

### Комбинации цветов

**Основные паттерны:**
- `primary-600` + `accent-500` — Градиенты
- `white` + `primary-50` — Светлые секции
- `primary-600` + `white` — CTA секции
- `dark-700` + `white` — Основной текст

---

## 📝 Типографика

### Font Family
```css
Primary: 'Inter', system-ui, sans-serif
```

**Настройки:**
- `-webkit-font-smoothing: antialiased`
- `-moz-osx-font-smoothing: grayscale`

### Размеры и веса

#### Заголовки

**H1 (Hero Title)**
```
Desktop:  text-5xl (48px) / text-6xl (60px)
Mobile:   text-4xl (36px)
Weight:   font-bold (700)
Line-height: leading-tight (1.25)
Letter-spacing: tracking-tight (-0.02em)
```

**H2 (Section Title)**
```
Desktop:  text-4xl (36px) / text-5xl (48px)
Mobile:   text-3xl (30px)
Weight:   font-bold (700)
Line-height: leading-tight (1.25)
```

**H3 (Subsection Title)**
```
Desktop:  text-2xl (24px) / text-3xl (30px)
Mobile:   text-xl (20px)
Weight:   font-bold (700)
Line-height: leading-snug (1.375)
```

**H4 (Card Title)**
```
Size:     text-xl (20px)
Weight:   font-bold (700)
Line-height: leading-snug (1.375)
```

#### Body Text

**Large Body**
```
Size:     text-lg (18px)
Weight:   font-normal (400)
Line-height: leading-relaxed (1.625)
```

**Regular Body**
```
Size:     text-base (16px)
Weight:   font-normal (400)
Line-height: leading-relaxed (1.625)
```

**Small Text**
```
Size:     text-sm (14px)
Weight:   font-normal (400)
Line-height: leading-normal (1.5)
```

**Extra Small**
```
Size:     text-xs (12px)
Weight:   font-normal (400)
Line-height: leading-normal (1.5)
```

#### UI Text

**Button Text**
```
Small:    text-sm (14px) + font-semibold (600)
Medium:   text-base (16px) + font-semibold (600)
Large:    text-lg (18px) + font-bold (700)
```

**Label Text**
```
Size:     text-sm (14px)
Weight:   font-semibold (600)
```

**Badge/Tag Text**
```
Size:     text-xs (12px) / text-sm (14px)
Weight:   font-semibold (600)
```

### Color Usage

```
Primary text:   text-dark-900 / text-dark-700
Secondary text: text-dark-600
Tertiary text:  text-dark-500
Light text:     text-dark-400
On dark bg:     text-white
Links:          text-primary-600 hover:text-primary-700
```

---

## 📏 Spacing System

### Scale (Tailwind)
```
0    0px
1    4px
2    8px
3    12px
4    16px
5    20px
6    24px
8    32px
10   40px
12   48px
16   64px
20   80px
24   96px
32   128px
```

### Применение

**Padding секций:**
```
Desktop: py-24 (96px)
Tablet:  py-20 (80px)
Mobile:  py-16 (64px)
```

**Margin между элементами:**
```
Large gap:  mb-16 (64px)
Medium gap: mb-12 (48px)
Small gap:  mb-8 (32px)
Tiny gap:   mb-6 (24px)
```

**Карточки:**
```
Padding: p-6 (24px) / p-8 (32px)
Gap:     gap-6 (24px) / gap-8 (32px)
```

---

## 🧩 UI Компоненты

### Buttons

#### Primary (Orange CTA)
```tsx
bg-accent-500 hover:bg-accent-600
text-white
shadow-orange on hover
```

#### Secondary (Blue)
```tsx
bg-primary-600 hover:bg-primary-700
text-white
shadow-soft on hover
```

#### Outline
```tsx
border-2 border-primary-600
text-primary-600
hover:bg-primary-50
```

#### Sizes
```
sm:  px-4 py-2 text-sm rounded-lg
md:  px-6 py-3 text-base rounded-lg
lg:  px-8 py-4 text-lg rounded-xl
```

#### States
```
Hover:    scale + shadow
Active:   scale-95
Disabled: opacity-50 cursor-not-allowed
Focus:    ring-2 ring-offset-2
```

### Cards

**Default Card**
```tsx
bg-white
rounded-2xl / rounded-3xl
p-6 / p-8
shadow-soft
border border-gray-100 (optional)
```

**Hover Card**
```tsx
hover:shadow-soft-lg
hover:-translate-y-1
transition-all duration-300
```

**Accent Cards**
```tsx
// Blue accent
bg-gradient-to-br from-primary-50 to-primary-100
border border-primary-200

// Orange accent
bg-gradient-to-br from-accent-50 to-accent-100
border border-accent-200
```

### Containers

```
sm:   max-w-3xl (768px)
md:   max-w-5xl (1024px)
lg:   max-w-7xl (1280px)
full: max-w-full

Padding: px-4 sm:px-6 lg:px-8
Margin:  mx-auto
```

### Borders

**Border Radius**
```
Small:  rounded-lg (8px)
Medium: rounded-xl (12px)
Large:  rounded-2xl (16px)
XLarge: rounded-3xl (24px)
Full:   rounded-full
```

**Border Width**
```
Default: border (1px)
Thick:   border-2 (2px)
```

**Border Colors**
```
Light:   border-gray-100
Default: border-gray-200
Dark:    border-gray-300
Primary: border-primary-200
Accent:  border-accent-200
```

### Shadows

```
// Soft blue-tinted
shadow-soft:    0 2px 15px rgba(26, 128, 255, 0.08)
shadow-soft-lg: 0 10px 40px rgba(26, 128, 255, 0.12)

// Orange-tinted for CTA
shadow-orange:  0 4px 20px rgba(255, 145, 0, 0.15)

// Default Tailwind
shadow-sm, shadow-md, shadow-lg, shadow-xl
```

### Icons

**Размеры:**
```
Small:  w-4 h-4 (16px)
Medium: w-5 h-5 (20px)
Large:  w-6 h-6 (24px)
XLarge: w-8 h-8 (32px)
Hero:   w-12 h-12 (48px) / w-16 h-16 (64px)
```

**Icon Containers:**
```tsx
// Blue
bg-primary-100 rounded-xl

// Orange
bg-accent-100 rounded-xl

// Neutral
bg-gray-100 rounded-xl
```

### Badges/Tags

```tsx
px-4 py-2 / px-5 py-2
rounded-full
text-sm font-semibold
bg-primary-100 text-primary-700
bg-accent-100 text-accent-700
bg-white shadow-soft
```

### Form Elements

**Input Fields**
```tsx
px-4 py-3
border border-gray-200
rounded-xl
focus:ring-2 focus:ring-primary-500
focus:border-transparent
bg-gray-50 focus:bg-white
```

**Labels**
```tsx
text-sm font-semibold text-dark-800
mb-2
```

**Select/Textarea**
```tsx
// Same as input
rounded-xl
focus:ring-2 focus:ring-primary-500
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)

```
sm:   640px   // Mobile landscape / Small tablet
md:   768px   // Tablet
lg:   1024px  // Desktop
xl:   1280px  // Large desktop
2xl:  1536px  // Extra large
```

### Grid Layouts

**Hero / Two-Column**
```tsx
grid grid-cols-1 lg:grid-cols-2 gap-12
```

**Cards / Three-Column**
```tsx
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

**Cards / Two-Column**
```tsx
grid grid-cols-1 md:grid-cols-2 gap-8
```

### Typography Responsive

```tsx
// Heading
text-4xl sm:text-5xl

// Body
text-base lg:text-lg

// Padding
py-16 md:py-20 lg:py-24
```

### Mobile-First Approach

```tsx
// ✅ Правильно
<div className="text-base lg:text-lg">

// ❌ Неправильно
<div className="lg:text-base text-lg">
```

---

## 🎬 Анимации

### Transitions

**Default**
```tsx
transition-all duration-300
```

**Fast**
```tsx
transition-all duration-200
```

**Slow**
```tsx
transition-all duration-500
```

### Hover Effects

**Cards**
```tsx
hover:shadow-soft-lg
hover:-translate-y-1
```

**Buttons**
```tsx
hover:shadow-orange
active:scale-95
```

**Links**
```tsx
hover:text-primary-700
transition-colors duration-200
```

### Animations (CSS)

**Fade In**
```tsx
animate-fade-in
// 0.6s ease-out
```

**Slide Up**
```tsx
animate-slide-up
// 0.6s ease-out
```

**Scale In**
```tsx
animate-scale-in
// 0.6s ease-out
```

**Delay Utilities**
```tsx
animation-delay-100
animation-delay-200
animation-delay-300
```

### Focus States

```tsx
focus:outline-none
focus:ring-2 focus:ring-offset-2
focus:ring-primary-500

// Global (CSS)
*:focus-visible {
  outline: 2px solid #FF9100;
  outline-offset: 2px;
}
```

---

## ✅ Правила использования

### DO ✅

1. **Используйте только утвержденные цвета**
   - Primary Blue, Accent Orange, Dark для текста
   
2. **Следуйте spacing system**
   - Используйте кратные 4px значения
   
3. **Консистентность border-radius**
   - lg, xl, 2xl, 3xl в зависимости от размера элемента
   
4. **Используйте soft shadows**
   - shadow-soft и shadow-soft-lg для карточек
   
5. **Typography scale**
   - Соблюдайте иерархию размеров
   
6. **Responsive подход**
   - Mobile-first дизайн

### DON'T ❌

1. **Не используйте purple/violet цвета**
   
2. **Не создавайте custom градиенты**
   - Только primary-to-accent или single color
   
3. **Не используйте жирные тени**
   - Только soft shadows
   
4. **Не добавляйте случайные декоративные элементы**
   - Минимализм и чистота
   
5. **Не используйте glassmorphism**
   - backdrop-blur только для специальных случаев
   
6. **Не создавайте new spacing значения**
   - Используйте существующий scale

---

## 🎨 Примеры использования

### Section Header

```tsx
<div className="text-center mb-16">
  <h2 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-4">
    Заголовок секции
  </h2>
  <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
</div>
```

### CTA Button

```tsx
<Button variant="primary" size="lg" className="font-bold">
  Оставить заявку
</Button>
```

### Info Card

```tsx
<div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300">
  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-4xl mb-4">
    🎓
  </div>
  <h3 className="text-xl font-bold text-dark-900 mb-3">
    Заголовок
  </h3>
  <p className="text-dark-600 leading-relaxed">
    Описание карточки
  </p>
</div>
```

### Gradient Background Section

```tsx
<section className="py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
  {/* Content */}
</section>
```

---

## 📦 Экспорт переменных

### CSS Variables (globals.css)

```css
:root {
  --background: #ffffff;
  --foreground: #334E68;
  --primary: #1A80FF;
  --accent: #FF9100;
}
```

### Tailwind Config

См. `apps/web/tailwind.config.ts`

---

## 🔄 Обновления

**Version**: 1.0.0  
**Last Updated**: 2026-09-24  
**Maintainer**: OKURMEN Team

---

**Вопросы?** Обратитесь к команде дизайна OKURMEN.
