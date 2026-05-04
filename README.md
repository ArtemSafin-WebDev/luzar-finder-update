# LUZAR parts finder

Статичная демо-верстка подборщика запчастей по Figma. Подбор работает на обычном JavaScript: UI рендерится из JSON-ответа, а данные и `disabled`-состояния селектов приходят из API-слоя. В демо по умолчанию используется моковый API, для production можно подключить реальные endpoint'ы через конфиг.

## Файлы

- `index.html` - страница с подключенным подборщиком.
- `styles/luzar-base.css` - базовые стили проекта, без стилей подборщика.
- `styles/parts-finder.css` - стили компонента подборщика.
- `scripts/parts-finder.js` - логика UI, fetch-адаптер, рендеринг селектов и истории.
- `scripts/parts-finder-request-modal.js` - отдельный компонент модалки заявки на индивидуальный подбор.
- `scripts/parts-finder-mock-api.js` - моковый API для демо-сайта.
- `mock/parts-finder-response.json` - пример JSON-контракта для бэкенда.
- `images/parts-finder/modal-bg.png` - фон модалки заявки.

## Как запустить

Можно открыть `index.html` напрямую в браузере. Для проверки через локальный сервер:

```bash
python3 -m http.server 8080
```

Затем открыть `http://localhost:8080`.

## Поведение

Изначально активен режим `Подобрать по авто`. Вкладку `Подобрать по VIN и госномеру` можно сделать активной сразу через JSON-ответ (`mode: "vin"` и `tabs[].active`) или через конфиг `initialMode: "vin"`.

Селекты разблокируются последовательно:

1. `brand` - Марка.
2. `model` - Модель, после выбора марки.
3. `year` - Год, после выбора модели.
4. `engine` - Объем двигателя, после выбора года.
5. `modification` - Модификация, после выбора двигателя.
6. `productGroups` - Группа товаров, после полного выбора автомобиля.

Одиночные селекты открываются как searchable dropdown: ввод фильтрует текущий список на фронте. При выборе значения все зависимые поля ниже очищаются, затем выполняется точечный запрос за новым набором `controls`, без перерендера всего подборщика.

`productGroups` работает как мультиселект. В открытом состоянии показывает теги выбранных групп, кнопку `Еще` после трех тегов, раскрытие всех тегов и `Сбросить`. `Выбрать все` выбирает все группы и закрывает список; при повторном открытии эта же кнопка снимает выбор всех групп.

`Мои авто` приходит отдельным мини-контрактом `history`. Фронт не сохраняет историю в `localStorage` и сам не добавляет авто в список: UI просто рендерит историю из backend. Кнопка `Выбрать` заполняет нужные поля точечно, кнопка удаления отправляет запрос на удаление авто и обновляет только кнопки/панель истории.

Во вкладке `Подобрать по VIN и госномеру` верхнее поле отправляется обычной формой (`POST`) без AJAX. Если сервер вернул `vinSearch.state: "found"`, под формой показывается найденное авто и кнопка `Не мое авто`, которая открывает отдельную модалку заявки. Если сервер вернул `vinSearch.state: "not-found"`, во вкладке показывается форма заявки: `Марка` и `Модель` работают как селекты из JSON, `Мои авто` заполняют бренд, модель, VIN и госномер, а кнопка `Отправить запрос` становится активной после заполнения обязательных полей.

## Endpoint

По умолчанию демо использует такие адреса:

```http
GET /api/parts-finder
```

Этот endpoint нужен для первичной загрузки экрана и смены режима. Дальше UI использует маленькие endpoint'ы:

```http
GET /api/parts-finder/controls
GET /api/parts-finder/history
GET /api/parts-finder/vin-request/options
DELETE /api/parts-finder/history/{id}
```

Выбранные параметры для `state` и `controls` передаются как search params:

```http
/api/parts-finder?brand=volkswagen&model=tiguan&year=2016&engine=20-petrol&modification=tsi-14-20&group=water-pumps&group=fans
```

Кнопка `Подобрать` отправляет обычную форму на этот же endpoint без AJAX:

```http
POST /api/parts-finder
```

Получение текущей истории:

```http
GET /api/parts-finder/history
```

Удаление авто из `Мои авто`:

```http
DELETE /api/parts-finder/history/{id}
```

Ответ на получение/удаление истории должен быть только мини-контрактом истории:

```json
{
  "enabled": true,
  "label": "Мои авто",
  "items": []
}
```

Получение марок/моделей для формы заявки:

```http
GET /api/parts-finder/vin-request/options?brand=volkswagen
```

Поиск по VIN/госномеру:

```http
POST /api/parts-finder/vin
```

Заявка на индивидуальный подбор:

```http
POST /api/parts-finder/vin-request
```

Фронт не вычисляет доступность полей самостоятельно для production-сценария: он использует `controls[].disabled`, `controls[].options`, `controls[].value` из ответа. В моковом API эта логика реализована внутри `MockPartsFinderApi`. Пользовательские действия обновляют только нужный DOM-фрагмент: controls, историю, VIN request controls или disabled-состояние кнопки.

## JSON-контракты

Первичный `state` всё ещё может вернуть полный экран:

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
  "vinSearch": {
    "endpoint": "/api/parts-finder/vin",
    "queryKey": "vin",
    "value": "",
    "state": "",
    "vehicle": null,
    "submit": {
      "label": "Подобрать товары",
      "disabled": true
    }
  },
  "vinRequest": {
    "endpoint": "/api/parts-finder/vin-request",
    "controls": [],
    "submit": {
      "label": "Отправить запрос",
      "disabled": true
    }
  },
  "history": {
    "enabled": true,
    "label": "Мои авто",
    "items": []
  }
}
```

Описание ключевых полей:

- `mode` - активный режим: `vehicle` или `vin`.
- `tabs[]` - вкладки режимов. Активную вкладку можно передать через `tabs[].active`; `vin` теперь доступна.
- `controls[]` - список селектов в порядке отображения.
- `controls[].id` - стабильный ключ поля: `brand`, `model`, `year`, `engine`, `modification`, `productGroups`.
- `controls[].type` - `single` или `multi`.
- `controls[].disabled` - управляет активностью поля.
- `controls[].value` - выбранное значение: объект `{ "id": "...", "label": "..." }`, для `multi` массив объектов.
- `controls[].options` - варианты текущего поля.
- `controls[].queryKey` - имя search-параметра для backend.
- `controls[].allSelected` - только для `productGroups`, true если выбраны все группы.
- `submit.disabled` - доступность кнопки подбора.
- `vinSearch` - состояние формы поиска по VIN/госномеру. `state` может быть пустым, `found` или `not-found`.
- `vinSearch.vehicle` - найденный автомобиль для состояния `found`, структура полей такая же, как у `history.items[]`.
- `vinRequest.controls[]` - селекты заявки по VIN, сейчас используются `brand` и `model`.
- `vinRequest.submit.disabled` - серверное значение доступности кнопки заявки; фронт также включает кнопку при заполнении обязательных полей на текущей странице.
- `history.items[]` - список авто из backend. Фронт только рендерит эти данные и не сохраняет историю сам.

Полный пример лежит в `mock/parts-finder-response.json`.

Мини-контракт `controls`:

```json
{
  "controls": [],
  "submit": {
    "label": "Подобрать",
    "disabled": true
  }
}
```

Мини-контракт `vinRequestOptions`:

```json
{
  "controls": [],
  "brandOptions": [],
  "modelOptions": {},
  "submit": {
    "label": "Отправить запрос",
    "disabled": true
  }
}
```

Мини-контракт `history`:

```json
{
  "enabled": true,
  "label": "Мои авто",
  "items": []
}
```

## Интеграция с реальным API

Менять код подборщика не нужно. Перед подключением `scripts/parts-finder.js` задайте `window.PartsFinderConfig`:

```html
<script>
  window.PartsFinderConfig = {
    api: "fetch",
    endpoints: {
      state: "https://example.com/api/parts-finder",
      controls: "https://example.com/api/parts-finder/controls",
      history: "https://example.com/api/parts-finder/history",
      submit: "https://example.com/catalog/search",
      vinSubmit: "https://example.com/api/parts-finder/vin",
      vinRequest: "https://example.com/api/parts-finder/vin-request",
      vinRequestOptions: "https://example.com/api/parts-finder/vin-request/options",
      deleteHistory: "https://example.com/api/parts-finder/history/:id"
    },
    initialMode: "vin",
    fetchOptions: {
      credentials: "include"
    }
  };
</script>
<script src="scripts/parts-finder.js" defer></script>
```

`api: "mock"` можно не указывать: это режим по умолчанию для демо-сайта. Для него нужно подключить `scripts/parts-finder-mock-api.js` перед `scripts/parts-finder.js`, как в `index.html`. В production моковый файл можно не подключать; используйте `api: "fetch"` или `api: "production"`.

Назначение endpoint'ов:

- `state` - `GET`-запрос первичного состояния экрана.
- `controls` - `GET`-запрос состояния селектов после выбора/очистки. Выбранные значения уходят search-параметрами: `brand`, `model`, `year`, `engine`, `modification`, `group`.
- `history` - `GET`-запрос списка сохраненных авто.
- `submit` - `action` формы для кнопки `Подобрать`. Отправка остается обычным `POST` без AJAX.
- `vinSubmit` - `action` формы поиска по VIN/госномеру. Отправка остается обычным `POST` без AJAX.
- `vinRequest` - `action` формы заявки на индивидуальный подбор. Отправка остается обычным `POST` без AJAX.
- `vinRequestOptions` - `GET`-запрос марок/моделей для формы заявки, например `?brand=volkswagen`.
- `deleteHistory` - `DELETE`-запрос удаления авто из истории. Поддерживаются шаблоны `:id` и `{id}`. Ответ возвращает мини-контракт `history`.

`fetchOptions` прокидывается во все AJAX-запросы; можно использовать для `credentials`, заголовков и других стандартных настроек `fetch`.

Если нужен не `fetch`, а свой транспорт, в `api` можно передать объект с методами `getState(params)`, `getControls(params)`, `getHistory()`, `getVinRequestOptions(params)` и `deleteHistory(id)`.

Стили компонента изолированы в `styles/parts-finder.css`, поэтому на другом проекте можно оставить JS-контроллер и заменить CSS/шаблоны под нужный дизайн.
