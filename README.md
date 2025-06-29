# Задание по react для ШРИ 2025

## Подъем приложения

Поннять frontend

```bash
cd intergalactic_analytics
npm run dev
```

Приложения frontend поднимется на http://localhost:5173/

Поднять backend

```bash
cd shri2025-back-main
npm run start
```

Приложения backend поднимется на http://localhost:3000/

## Библиотеки

`classnames` - склеивание классов

`react-router` - клиентский роутинг

`zustand` - стейт менеджер/ работа с LocalStorage,

## Структура папок

Все компоненты frontend расположены в src

`components` - отдельные компоненты

`layouts` - шаблон для всех страниц приложения

`api` - работа с api, и прибитые урлы

`pages` - страницы приложения

`store` - стор на zustand

`share` - вспомогательные функции

`main.jsx` - файл точки входа, в котором расположен и роутинг

## Тесты

### 1. unit tests

Основная логика frontend части приложения покрыта `unit` тестами на `vitest`

```bash
✓ src/pages/GenerationPage/GeneratePage.test.jsx (3 tests)
✓ src/pages/HistoryPage/HistoryPage.test.jsx (3 tests)
✓ src/router/AppRouter.test.jsx (3 tests)
✓ src/pages/ParsingPage/ParsingPage.test.jsx (5 tests)
```

**Запуск всех `unit` тестов**

```
cd intergalactic_analytics
npm run test
```

### 1. e2e tests

Основная логика frontend части приложения покрыта `e2e` тестами на `playwright`

```bash
Listing tests:
  [chromium] › GenerationPage.spec.js:5:7 › Тесты на GenerationPage › страница открывается
  [chromium] › GenerationPage.spec.js:13:7 › Тесты на GenerationPage › генерация файла проходит успешно
  [chromium] › HistoryPage.spec.js:5:7 › Тесты на HistoryPage › страница открывается
  [chromium] › HistoryPage.spec.js:13:7 › Тесты на HistoryPage › на страница есть элемент истории
  [chromium] › HistoryPage.spec.js:24:7 › Тесты на HistoryPage › при клике на кнопку очистки история очищается
  [chromium] › HistoryPage.spec.js:36:7 › Тесты на HistoryPage › при клике на элемент истории открывается модалка
  [chromium] › ParsingPage.spec.js:6:7 › Тесты на GenerationPage › страница открывается
  [chromium] › ParsingPage.spec.js:13:7 › Тесты на GenerationPage › файл грузиться и появляются хайлайты
```

**Запуск всех `e2e` тестов**

```bash
cd integration_tests
npm i
npx playwright test --project=chromium
```
