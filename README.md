# REDTRON_API

API REST PARA LA APLICACION REDTRON

.ENV PARA IR PROBANDO:

PG_HOST=localhost
PG_PORT=5432
PG_USER=fede
PG_PASSWORD=...
PG_DATABASE=desasur
PORT=3001
JWT_SECRET=desasur2023
SALT=10
EMAIL=hugoschierano@gmail.com
EMAIL_PASSWORD=keummkqrhmplhkgv

Deploy de Base de Datos
DATABASE_URL=postgresql://postgres:9jC0dGsnUSv1drbDjIIX@containers-us-west-139.railway.app:7048/railway

MOCK_USERS_URL="https://my.api.mockaroo.com/redtron_users.json?key=784e5460"

------
Deploy de Base de Datos
DATABASE_URL= ````postgresql://postgres:9jC0dGsnUSv1drbDjIIX@containers-us-west-139.railway.app:7048/railway````

-----

Para levantar el servidor en modo desarrollo correr:

```
npm run dev
```

Para recargar la base de datos de usuario correr el siguiente script:

```
npm run reset-users-db
```

