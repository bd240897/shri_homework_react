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

`react-router` - клинетский роутинг

`zustand` - стейт менеджер/ работа с localstore

## Структура папок

Все компоненты frontend расположены в src

`components` - отдельные компоненты

`layouts` - шаблон для всех страниц приложения

`api` - работа с api, и прибитые урлы

`pages` - страницы приложения

`store` - стор на zustand

`share` - ширенные вспомогательные функции

`main.jsx` - файл точки входа, в котором расположен и роутинг
