# LUZAR parts finder

Статичная демо-верстка подборщика запчастей по Figma. Подбор работает на обычном JavaScript: UI рендерится из JSON-ответа, а данные и `disabled`-состояния селектов приходят из мокового API-слоя.

## Файлы

- `index.html` - страница с подключенным подборщиком.
- `styles/luzar-base.css` - базовые стили проекта, без стилей подборщика.
- `styles/parts-finder.css` - стили компонента подборщика.
- `scripts/parts-finder.js` - логика UI, моковый API, рендеринг селектов и истории.
- `mock/parts-finder-response.json` - пример JSON-контракта для бэкенда.
- `images/parts-finder/desktop-bg.webp` - фон блока из Figma.

## Как запустить

Можно открыть `index.html` напрямую в браузере. Для проверки через локальный сервер:

```bash
python3 -m http.server 8080
```

Затем открыть `http://localhost:8080`.

## Поведение

Изначально активен режим `Подобрать по авто`. Вкладка `Подобрать по VIN и госномеру` отображается как disabled, логика для нее пока не реализована.

Селекты разблокируются последовательно:

1. `brand` - Марка.
2. `model` - Модель, после выбора марки.
3. `year` - Год, после выбора модели.
4. `engine` - Объем двигателя, после выбора года.
5. `modification` - Модификация, после выбора двигателя.
6. `productGroups` - Группа товаров, после полного выбора автомобиля.

Одиночные селекты открываются как searchable dropdown: ввод фильтрует текущий список на фронте. При выборе значения все зависимые поля ниже очищаются, затем выполняется новый запрос к API.

`productGroups` работает как мультиселект. В открытом состоянии показывает теги выбранных групп, кнопку `Еще` после трех тегов, раскрытие всех тегов и `Сбросить`. `Выбрать все` выбирает все группы и закрывает список; при повторном открытии эта же кнопка снимает выбор всех групп.

`Мои авто` хранится в `localStorage`. Кнопка `Выбрать` заполняет поля строки, кнопка удаления убирает строку из истории.

## Endpoint

Ожидаемый endpoint один:

```http
GET /api/parts-finder
```

Выбранные параметры передаются как search params:

```http
/api/parts-finder?brand=volkswagen&model=tiguan&year=2016&engine=20-petrol&modification=tsi-14-20&group=water-pumps&group=fans
```

Фронт не вычисляет доступность полей самостоятельно для production-сценария: он использует `controls[].disabled`, `controls[].options`, `controls[].value` из ответа. В моковом API эта логика реализована внутри `MockPartsFinderApi`.

## JSON-контракт

Минимальная форма ответа:

```json
{
  "endpoint": "/api/parts-finder",
  "request": {
    "method": "GET",
    "query": {},
    "selected": {}
  },
  "title": "Подберите детали для легковых и грузовых автомобилей",
  "mode": "vehicle",
  "tabs": [],
  "controls": [],
  "submit": {
    "label": "Подобрать",
    "disabled": true
  },
  "history": {
    "enabled": true,
    "label": "Мои авто",
    "items": []
  }
}
```

Описание ключевых полей:

- `tabs[]` - вкладки режимов. Сейчас `vin` должен приходить с `disabled: true`.
- `controls[]` - список селектов в порядке отображения.
- `controls[].id` - стабильный ключ поля: `brand`, `model`, `year`, `engine`, `modification`, `productGroups`.
- `controls[].type` - `single` или `multi`.
- `controls[].disabled` - управляет активностью поля.
- `controls[].value` - выбранное значение: объект `{ "id": "...", "label": "..." }`, для `multi` массив объектов.
- `controls[].options` - варианты текущего поля.
- `controls[].queryKey` - имя search-параметра для backend.
- `controls[].allSelected` - только для `productGroups`, true если выбраны все группы.
- `submit.disabled` - доступность кнопки подбора.
- `history.items[]` - опционально, если историю хранит backend. В демо история хранится локально.

Полный пример лежит в `mock/parts-finder-response.json`.

## Интеграция с реальным API

В `scripts/parts-finder.js` нужно заменить `MockPartsFinderApi.getState()` на реальный `fetch`:

```js
async getState(params) {
  const url = new URL("/api/parts-finder", window.location.origin);

  Object.entries(params.selected).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append("group", item.id));
    } else {
      url.searchParams.set(key, value.id);
    }
  });

  const response = await fetch(url);
  return response.json();
}
```

Стили компонента изолированы в `styles/parts-finder.css`, поэтому на другом проекте можно оставить JS-контроллер и заменить CSS/шаблоны под нужный дизайн.
