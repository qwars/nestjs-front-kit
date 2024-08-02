# Запуск разработки

1. Сборка контейнера - `$ docker compose build`
2. Запуск контейнера - `$ docker compose up -d` или `$ docker compose start`
3. Остановка работы контейнеров  - `$ docker compose down`
4. Вход в контейнеры - `docker compose run --user $(id -u):$(id -g) .... sh`
    > **NOTE**: Презварительно добавить в `.env` ```bash
    $ echo "UID=$(id -u)" >> .env && echo "GID=$(id -g)" >> .env
    ```

# Описание
 
Сервис прокладка между RestAPI бэк и фронт. 
Выполняет все структурные изменения входящих данных, 
делает анализ данных и преобразования данных для сохранения в базе бэка.

Конфиги и описание для разработки фронта с imba@1.5.2 - `config/imba.example`
Конфиги и описание для разработки фронта с react - `config/react.example`

> **NOTE**: В этой ветке используется imba

# URLs

`/swagger` - Swagger для RestAPI
`/api` - методы RestAPI
`/` - Админ часть для создания схем и пр.
