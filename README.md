# LUZAR parts finder

Статичная демо-верстка подборщика запчастей и страниц результатов по Figma. Проект работает без сборки: HTML-страницы подключают CSS и обычные JavaScript-модули через `defer`. Подборщик рендерится из JSON-ответа, а страницы результатов содержат серверно подготовленную разметку каталога, которую фронт оживляет локальными фильтрами, сортировкой, галереями и демо-корзиной.

В демо по умолчанию используется моковый API, для production можно подключить реальные endpoint'ы через `window.PartsFinderConfig`.

## Файлы

- `index.html` - стартовая страница с подборщиком в обычном демо-состоянии.
- `auto-not-found.html` - пример входа сразу во вкладку VIN/госномера с состоянием `not-found`.
- `auto-and-products-found.html` - пример найденного авто и найденных товаров каталога.
- `no-products.html` - пример найденного авто без подходящих товаров, формой заявки и рекомендациями.
- `styles/luzar-base.css` - базовые стили проекта, сетка, шрифты и общие утилиты.
- `styles/luzar-header.css` - стили шапки, мобильного меню и мобильного поиска.
- `styles/parts-finder.css` - стили подборщика и модалки заявки.
- `styles/catalog-results.css` - стили результатов каталога, фильтров, карточек, no-products и мобильной нижней навигации.
- `scripts/parts-finder.js` - логика UI подборщика, fetch-адаптер, рендеринг селектов, VIN-сценария и истории.
- `scripts/parts-finder-request-modal.js` - отдельный компонент модалки заявки на индивидуальный подбор.
- `scripts/parts-finder-mock-api.js` - моковый API для демо-сайта.
- `scripts/catalog-results.js` - клиентская логика результатов каталога: поиск, фильтры, сортировка, копирование кода, галереи карточек и открытие модалки заявки.
- `scripts/catalog-cart.js` - демо-поведение счетчика количества в карточке товара без обращения к серверу.
- `scripts/luzar-header.js` - мобильное меню, мобильный поиск и скролл к подборщику из шапки.
- `scripts/phone-mask.js` - маска и валидация российского телефона для всех `input[type="tel"]` и `input[data-phone-mask]`.
- `scripts/vendor/imask.min.js` - vendor-зависимость для телефонной маски.
- `mock/parts-finder-response.json` - пример JSON-контракта для бэкенда.
- `images/parts-finder/*` и `images/catalog/*` - статические изображения для подборщика, no-products и карточек каталога.

## Как все склеено

Каждая HTML-страница уже содержит нужную серверную разметку. JavaScript-компоненты инициализируются только если на странице есть их корневые элементы:

- `#parts-finder` запускает `PartsFinder` из `scripts/parts-finder.js`.
- `[data-catalog-results]` запускает `scripts/catalog-results.js`.
- `[data-luzar-header]` запускает `scripts/luzar-header.js`.
- `input[type="tel"]` и `input[data-phone-mask]` обрабатываются `window.LuzarPhoneMask`.

Конфиг подборщика задается до подключения скриптов через `window.PartsFinderConfig`. Если конфига нет, используется моковый режим. На страницах результатов конфиг используется для стартового VIN-состояния, например `initialMode`, `initialVin` и `initialVinResult`.

Рекомендуемый порядок подключения:

```html
<script>
  window.PartsFinderConfig = {
    initialMode: "vin",
    initialVin: "XW8ZZZ5NZJG000001",
    initialVinResult: "found"
  };
</script>
<script src="scripts/vendor/imask.min.js" defer></script>
<script src="scripts/phone-mask.js" defer></script>
<script src="scripts/parts-finder-mock-api.js" defer></script>
<script src="scripts/parts-finder-request-modal.js" defer></script>
<script src="scripts/parts-finder.js" defer></script>
<script src="scripts/catalog-results.js" defer></script>
<script src="scripts/catalog-cart.js" defer></script>
<script src="scripts/luzar-header.js" defer></script>
```

`catalog-results.js` умеет открыть заявку через `window.LuzarPartsFinder.openVinRequestModal()`, событие `parts-finder:open-vin-request-modal` или напрямую через `window.PartsFinderRequestModal`. Поэтому кнопки с `data-action="open-vin-request-modal"` работают и внутри каталога, и вне блока подборщика.

## Как запустить

Можно открыть HTML-файлы напрямую в браузере. Для проверки через локальный сервер:

```bash
python3 -m http.server 8080
```

Затем открыть:

- `http://localhost:8080/` - стартовый подборщик.
- `http://localhost:8080/auto-not-found.html` - авто/VIN не найден.
- `http://localhost:8080/auto-and-products-found.html` - авто и товары найдены.
- `http://localhost:8080/no-products.html` - авто найдено, товары не найдены.

Для production-режима с `api: "fetch"` локальный сервер удобнее, чем открытие через `file://`, потому что API-адреса строятся относительно `window.location.origin`.

## Подборщик

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

Стартовое VIN-состояние можно передать не только через конфиг, но и через query params: `pf_mode` или `mode`, `vin`, `plate` или `number`, `vinResult` или `vin_result`.

## Страницы результатов

`auto-and-products-found.html` и `no-products.html` показывают один и тот же верхний сценарий: подборщик открыт во вкладке VIN, авто уже найдено, а под ним отображается мобильная карточка найденного автомобиля. На desktop основная информация о найденном авто находится в самом подборщике.

`auto-and-products-found.html` содержит полноценную разметку результатов каталога. Фронт не загружает товары заново: карточки, фильтры, счетчики и баннеры уже находятся в HTML. `catalog-results.js` только синхронизирует интерактивное состояние:

- поиск внутри блока каталога очищает/помечает поле и не отправляет AJAX;
- сортировка хранится в локальном состоянии, на desktop применяется сразу, на mobile подтверждается кнопкой;
- фильтры, активные теги, скидка и price range управляются на клиенте без пересчета выдачи;
- на mobile скрипт добавляет кнопку фильтров, backdrop, заголовок, экран детализации фильтра и кнопку применения;
- галерея карточки переключает изображения по hover на desktop и свайпом на touch-устройствах;
- кнопки с `data-code` копируют артикул в буфер обмена.

`no-products.html` содержит отдельную форму заявки прямо на странице. Она отправляется обычным `POST` на `/api/parts-finder/vin-request`; кнопка активируется через `form.checkValidity()`. Блок выбора `Марка`/`Модель` внутри этой формы живет в inline-скрипте страницы: он берет начальное авто из `window.PartsFinderConfig.initialFoundVehicle`, опции из `noProductsRequest.controls`, мокового API или `vinRequestOptions`, а историю из `noProductsRequest.history`.

В рекомендациях на `no-products.html` используется тот же `data-catalog-results`, но без sidebar-фильтров. Это только витрина рекомендованных карточек с галереями, копированием кода и демо-корзиной.

## Формы и отправка

В проекте специально разделены обычные формы и AJAX-обновления:

- `Подобрать` по авто отправляет обычный `POST` на `submit`.
- Поиск по VIN/госномеру отправляет обычный `POST` на `vinSubmit`.
- Заявки на индивидуальный подбор отправляются обычным `POST` на `vinRequest`.
- Фильтры и поиск каталога в демо не отправляют запросы и не меняют список товаров.
- `catalog-cart.js` перехватывает формы корзины только для демонстрации счетчика. В production это поведение можно убрать или заменить реальной отправкой.
- Избранное в карточках каталога остается обычной формой на `/favorites/`.

AJAX используется только там, где нужно частично обновить состояние подборщика: селекты авто, история, опции формы заявки и удаление авто из истории.

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

Полезные поля `window.PartsFinderConfig`:

- `api` или `mode` - `"mock"`, `"fetch"`, `"production"` или объект своего транспорта.
- `endpoints` - переопределение адресов из `DEFAULT_ENDPOINTS`.
- `initialMode` - стартовая вкладка: `"vehicle"` или `"vin"`.
- `initialVin` - стартовое значение поля VIN/госномера.
- `initialVinResult` - стартовый результат VIN-сценария: `"found"` или `"not-found"`.
- `initialVinRequest` - начальные значения формы заявки во вкладке VIN, например `vin` и `plate`.
- `initialFoundVehicle` - найденное авто для страниц результатов; сейчас используется inline-логикой `no-products.html`.
- `noProductsRequest` - настройки встроенной формы заявки на `no-products.html`: `optionsEndpoint`, `controls`, `history` или `loadOptions(values)`.
- `fetchOptions` - общие настройки для AJAX-запросов подборщика и модалки.

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
