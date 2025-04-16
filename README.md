Nuxt App — Авторизация и Режим Сессии

## Структура проекта (основное)
- `pages/` — маршруты: `/login`, `/account`, `/products`
- `components/` — таблицы и фильтры для пользователей и товаров
- `assets/data/`, `public/data/` — исходные JSON-данные
- `stores/user.ts` — Pinia store для авторизации
- `server/api/*.ts` — эмуляция API с JSON-файлов
- `types/*.ts` — типы `User` и `Product` (TypeScript)

## Авторизация

Логин происходит через users.json (/data/users.json в preview).

Пароль хешируется через MD5 (библиотека crypto-js).

После успешного входа:

localStorage.setItem('userSession', JSON.stringify(user))

Данные пишутся в store (currentUser, isLoggedIn)

## Выход

Очищается localStorage

store.logout() возвращает пользователя на /login

## restoreSession()

Вызывается только на клиенте, в onMounted()

Проверяет localStorage.getItem('userSession')

Если есть — парсит и записывает в store

`onMounted(() => {
  const userStore = useUserStore()
  userStore.restoreSession()

  if (!userStore.isLoggedIn) {
    return navigateTo('/login')
  }
})`

## Почему не middleware

Nuxt запускает middleware до mounted() → store ещё не знает о сессии

Даже глобальные middleware не видят localStorage

В preview SSR-контекст не даёт прокинуть cookies

Поэтому лучшее решение: не использовать middleware вообще

## Preview Mode

Команда npm run preview (или nuxi preview) запускает production-like сервер

Там не работают process.client и useCookie() как на dev

localStorage и restoreSession() — самые стабильные

## Всё работает, если:

Нет definePageMeta({ middleware: '...' })

Нет middleware/*.ts, вызывающих редирект

Есть restoreSession() в onMounted() нужных страниц

Данные читаются из localStorage

## Результат

Логин → сохранение сессии

Обновление страницы → сессия сохраняется

Перезапуск → не выкидывает

Нет middleware → нет неожиданных редиректов

Поведение стабильное и прозрачное