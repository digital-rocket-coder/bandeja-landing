# Bandeja — лендинг

Инвест-лендинг падел-платформы Bandeja. Стек совпадает с будущим приложением:
**React 19 + Vite + Tailwind CSS 4 + shadcn/ui**.

## Запуск

```bash
npm install
npm run dev          # локально: http://localhost:5173
npm run build        # сборка в dist/ (Vercel, GitHub Pages)
npm run build:single # один самодостаточный index.html в dist-single/ — удобно переслать
```

## Дизайн-система

Тема лежит в `src/index.css` и использует стандартные переменные shadcn/ui
(`--background`, `--primary`, `--accent`, `--border`, `--ring` …), поэтому любой компонент,
добавленный через `npx shadcn@latest add <component>`, сразу получает фирменный стиль.

| Токен | Роль | Tailwind-класс |
|---|---|---|
| `--primary` | основной тёмный (кнопки, текст) | `bg-primary` |
| `--accent` | жёлтый мяч — акценты, бейджи «бесплатно» | `bg-accent` |
| `--brand` | синий корта — ссылки, eyebrow, активные состояния | `bg-brand`, `text-brand` |
| `--court`, `--court-deep` | покрытие корта | `bg-court` |
| `--deep` | тёмные секции | `bg-deep` |

Шрифты: **Unbounded** (заголовки, `font-display`), **Onest** (текст, `font-sans`),
**JetBrains Mono** (подписи и цифры, `font-mono`). Подключены локально через `@fontsource`.

Тёмная тема — класс `.dark` на `<html>` (конвенция shadcn); по умолчанию следует настройке системы.

### Компоненты shadcn/ui

`src/components/ui/`: `button`, `card`, `badge`, `separator`. В `button` и `badge` добавлены
фирменные варианты (`accent`, `brand`, размер `xl`, форма `pill`/`chip`).
Новые компоненты: `npx shadcn@latest add dialog` и т. п. — конфиг в `components.json`.

## Структура

```
src/
  index.css            тема (дизайн-система)
  components/ui/       компоненты shadcn/ui
  components/demos/    живые демо: табло, чат, видео урока, профиль навыков…
  components/          общие элементы секций, анимация корта
  sections/            секции лендинга
public/                видео урока и обложка
```

## Деплой

- **Vercel**: Import Project → Framework Preset: Vite. Настраивать больше ничего не нужно.
- **GitHub Pages**: Settings → Pages → Source: **GitHub Actions**. Сборка запускается на каждый push в `main`
  (`.github/workflows/deploy.yml`).
