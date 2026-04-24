# LUZAR compatible starter

Легкая статичная заготовка для верстки страниц, визуально совместимых с текущим сайтом LUZAR.

## Файлы

- `index.html` - демо-страница с шапкой, hero-блоком, карточками и формой.
- `styles/luzar-base.css` - базовые стили: шрифты, переменные, reset, контейнер, типографика, кнопки, карточки, формы.
- `vendor/fonts/` - локальные файлы шрифтов.

## Основные классы

- `.page__center` - контейнер шириной 1200px на desktop и 560px на tablet/mobile.
- `.page__h1`, `.page__h2`, `.page__h3` - базовые заголовки.
- `.l-index__title` / `.eyebrow` - синий uppercase-заголовок секции.
- `.btn`, `.btn-filled`, `.btn-outline` - кнопки.
- `.catalog-grid`, `.catalog-card` - сетка и карточка.
- `.input-default` - поле формы.

## Цвета

Ключевые токены лежат в `:root`:

```css
--color-brand: #204a8f;
--color-brand-hover: #1b3f7a;
--color-accent: #3a8dde;
--color-page: #f1f1f2;
--color-panel: #ffffff;
```

Открывать можно напрямую через `index.html`.
