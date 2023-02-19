# Messenger ![status](https://img.shields.io/static/v1?label=status&message=InProgress&color=yellow) ![stable version](https://img.shields.io/static/v1?label=StableVerison&message=deploy&color=green) ![node version](https://img.shields.io/static/v1?label=node&message=v19.6.0&color=green)

## [Ссылка на сайт](https://fluffy-cocada-cc5661.netlify.app/)

## Описание

### Онлайн мессенджер, имеющий базовый функционал, регистрацию, авторизацию, групповое и личное общение, а также отправку фотографий.

## Установка

Для запуска требуется установка

[![node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/)

### Запуск приложения

Стабильная версия приложения находится в ветке deploy

- `npm install` — установка стабильной версии,
- `npm run dev` — запуск версии для разработчика,
- `npm run build` — сборка стабильной версии.

### Запуск сервера

Статика раздается при помощи сервера express, запущенном на порте 3000

- `npm run start` — запуск сервера.

##  Документация
Ссылка на фигму:

[![Ссылка на макет](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1&t=Vzz0Zd4h3Uu2pPS5-0)


## Реализация

При написании используется архитектура FSD (https://feature-sliced.design/docs/get-started/overview).

Для сборки проекта используется сборщик Parsel (https://en.parceljs.org/getting_started.html).

В качестве шаблонизатора выбран Handlebars (https://handlebarsjs.com/guide/#what-is-handlebars).

Для написания стилей используется препроцессор Sass, используется синтаксис Scss (https://sass-lang.com/).

В стилях используется подход ConcentricCSS (https://rhodesmill.org/brandon/2011/concentric-css/).