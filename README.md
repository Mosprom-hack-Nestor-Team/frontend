# AeroDocs

React + TypeScript веб-приложение для управления табличными данными

## Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Приложение откроется по адресу: http://localhost:5173
```

## Другие команды

```bash
# Сборка для production
npm run build

# Превью сборки
npm run preview

# Проверка кода
npm run lint
```

##  📁 Структура проекта

```bash
frontend/
├── public/                 # Статические файлы
│   ├── vite.svg
│   └── ...
├── src/
│   ├── components/         # React компоненты
│   │   ├── AeroLinesBackground.tsx  # Фоновые аэродинамические линии
│   │   ├── Dashboard.tsx            # Главная страница с таблицами
│   │   ├── DataTable.tsx            # Базовый редактор таблиц с CRUD
│   │   ├── Footer.tsx               # Нижний колонтитул
│   │   ├── Grid.tsx                 # Кастомный Grid компонент
│   │   ├── Header.tsx               # Верхняя панель (устаревшая)
│   │   ├── Navbar.tsx               # Основная навигационная панель
│   │   ├── Notification.tsx         # Компонент уведомлений
│   │   ├── SpreadsheetEditor.tsx    # Продвинутый редактор таблиц
│   │   ├── SpreadsheetList.tsx      # Список таблиц
│   │   └── TableCard.tsx            # Карточка таблицы для Dashboard
│   ├── pages/              # Страницы приложения
│   │   ├── AboutPage.tsx            # Страница "О нас"
│   │   ├── DashboardPage.tsx        # Панель управления
│   │   ├── DepartmentPage.tsx       # Страница отдела (мониторинг задач)
│   │   ├── HomePage.tsx             # Домашняя страница
│   │   ├── LoginPage.tsx            # Страница входа
│   │   ├── NotificationsPage.tsx    # Страница уведомлений
│   │   ├── ProfilePage.tsx          # Профиль пользователя
│   │   ├── RegisterPage.tsx         # Страница регистрации
│   │   └── SpreadsheetPage.tsx      # Страница таблицы
│   ├── services/           # API сервисы и утилиты
│   │   └── api.ts                   # Сервис для работы с API
│   ├── theme.ts                      # Тема Material-UI
│   ├── App.tsx                      # Корневой компонент приложения
│   ├── main.tsx                     # Точка входа
│   └── index.css                    # Глобальные стили
├── конфигурационные файлы
│   ├── .env.development             # Переменные для разработки
│   ├── .env.production              # Переменные для production
│   ├── .gitignore                   # Игнорируемые файлы Git
│   ├── eslint.config.js             # Конфигурация ESLint
│   ├── index.html                   # HTML шаблон
│   ├── package-lock.json            # Лок файл зависимостей
│   ├── package.json                 # Зависимости и скрипты
│   ├── tsconfig.app.json            # TS конфиг для приложения
│   ├── tsconfig.json                # Основной TS конфиг
│   ├── tsconfig.node.json           # TS конфиг для Node
│   └── vite.config.ts               # Конфигурация Vite
└── README.md                        # Документация
```

##  🛠 Технологии
- React 18 + TypeScript
- Material-UI для интерфейса
- Vite для сборки

##  🎯 Функционал
- Главная страница с карточками таблиц
- Редактор таблиц с CRUD-операциями
- Поддержка типов данных: текст, числа, даты, списки
- Интерфейс пользователя с разными ролями

##  🎨 Дизайн система

### Цветовая палитра
- Основной синий: #002664 (Cobalt Blue)
- Акцентный синий: #0f4dbc (Gentian Blue)
- Светлый синий: #87c8dc (Light Blue)
- Дополнительные: #00afa5 (Light Green), #eb735a (Warm Red)

### Типографика
- Шрифт: Arial
- Аэродинамический стиль с градиентами и мягкими тенями

## 🎯 Основной функционал

### 📊 Главная страница (Dashboard)
- Сетка карточек таблиц (1-5 колонок в зависимости от экрана)
- Поиск по таблицам
- Статистика по колонкам и записям
- Быстрое создание новых таблиц

### ✏️ Редактор таблиц
- Типы данных: текст, числа, даты/время, выпадающие списки
- Inline-редактирование с валидацией
- Удаление и добавление записей
- Визуальные индикаторы статусов

### 👤 Система пользователей
- Интерфейс для разных ролей (Admin, Creator, User)
- Информация о текущем пользователе

## 🔄 Основные workflow

### Аутентификация
```bash
LoginPage → api.ts (login) → Navbar (обновление состояния)
```

### Работа с таблицами
```bash
DashboardPage → SpreadsheetList → SpreadsheetPage → SpreadsheetEditor
```

### Совместное редактирование
```bash
SpreadsheetEditor → WebSocket → Real-time обновления
```

### Мониторинг активности
```bash
DepartmentPage → Отслеживание задач сотрудников
```
