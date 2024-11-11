# WB Tariff Service

## Описание
Сервис для автоматического получения и обработки тарифов Wildberries. Позволяет получать актуальные данные о тарифах на доставку и хранение, сохранять их в базу данных PostgreSQL и экспортировать в Google Sheets.

## Основные возможности
- Автоматическое получение тарифов через API Wildberries
- Корректная обработка кириллицы (поддержка windows-1251)
- Сохранение данных в PostgreSQL
- Экспорт данных в Google Sheets
- Отслеживание истории изменений тарифов
- Все важные события и ошибки логируются с использованием log4js.

## Технологический стек
- TypeScript
- Node.js
- Express
- PostgreSQL
- Knex.js (для работы с БД)
- Google Sheets API
- Axios
- iconv-lite (для работы с кодировками)

## Установка и настройка

### Предварительные требования
- Node.js (версия 14+)
- PostgreSQL
- Доступ к API Wildberries
- Доступ к Google Sheets API

### Установка

Клонирование репозитория
git clone https://github.com/TimofeiSkripilev/wb-tariff-service.git cd wb-tariff-service

Установка зависимостей
npm install


### Настройка окружения
Создайте файл `.env` в корневой директории проекта:


WB_ENDPOINT=https://api.wildberries.ru/...
WB_API_KEY=ваш_ключ_api

DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=root
DB_NAME=wb-fees
PSQL_CONNECTION=postgresql://postgres:root@postgres:5432/wb-fees

GOOGLE_SERVICE_ACCOUNT_EMAIL=ваш_email@google.com
GOOGLE_PRIVATE_KEY=ваш_приватный_ключ
GOOGLE_SHEET_IDS=id1,id2,id3

## Использование

## API Endpoints

### POST /trigger-update
Загрузка и обновление тарифов



## Docker-развертывание

### Структура Docker
Проект использует Docker Compose для управления двумя контейнерами:
- Node.js приложение
- PostgreSQL база данных


### Настройка Docker и запуск

1. Убедитесь, что Docker и Docker Compose установлены на вашей системе

2. Запуск контейнеров:

# Сборка и запуск
docker-compose up --build

# Запуск в фоновом режиме
docker-compose up
