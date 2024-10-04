# Описание
 
Сервис прокладка между RestAPI бэк и фронт. 
Выполняет все структурные изменения входящих данных, 
делает анализ данных и преобразования данных для сохранения в базе бэка.

> **NOTE**: В этой ветке используется react

# PostgreSQL

Добавляем нужные данные в `.env`

```bash
$ echo "POSTGRES_DB=..." >> .env && echo "POSTGRES_USER=..." >> .env && echo "POSTGRES_PASSWORD=..." >> .env
```

# URLs

`/swagger` - Swagger для RestAPI
`/api` - методы RestAPI
`/` - Админ часть для создания схем и пр.


# Запуск разработки

1. Сборка контейнера - `$ docker compose run backend sh` и запустить 
   ```sh
      # yarn install
    ```
2. Запуск контейнера - `$ docker compose --env-file .env up -d`, или `$ docker compose up -d`  или `$ docker compose start`
3. Остановка работы контейнеров  - `$ docker compose down` или `$ docker compose stop`
4. Вход в контейнеры - `docker compose run --user $(id -u):$(id -g) .... sh`
    > **NOTE**: Презварительно добавить в `.env` ```bash
    $ echo "UID=$(id -u)" >> .env && echo "GID=$(id -g)" >> .env
    ```
5. В браузере http://localhost:3002
