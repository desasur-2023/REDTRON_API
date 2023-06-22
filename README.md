# REDTRON_API

API REST PARA LA APLICACION REDTRON

FORMATO DE .ENV PARA IR PROBANDO:

PG_HOST=localhost
PG_PORT=5432
PG_USER=fede
PG_PASSWORD=...
PG_DATABASE=desasur
PORT=3001
JWT_SECRET=desasur2023
MOCK_USERS_URL="https://my.api.mockaroo.com/redtron_users.json?key=784e5460"

Para levantar el servidor en modo desarrollo correr:

```
npm run dev
```

Para recargar la base de datos de usuario correr el siguiente script:

```
npm run reset-users-db
```
