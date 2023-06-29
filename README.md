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

Para levantar el servidor con la base de datos deploy

````
npm run db
````
---
# Endpoints

---

# Login User

## POST `/auth/login`

Endpoint encargado de perrmitir el ingreso de un usuario

### Parámetros body

|param|descripción|
|---|---|
|username|nombre del usuario|
|password|contraseña del usuario|

### Ejemplo Body 

```json
{
	"username": "test-admin",
	"password": "Redtron2023"
}
```

---

Respuesta en caso de éxito:

```json
{
	"error": false,
	"data": {
		"id": "e5827ffc-11b1-46c5-b413-0f6eaa83e22e",
		"username": "test-admin",
		"password": "",
		"phone": "561-711-0225 x10741",
		"role": "ADMIN",
		"email": "test-admin@hotmail.com",
		"status": "ACTIVE",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNTgyN2ZmYy0xMWIxLTQ2YzUtYjQxMy0wZjZlYWE4M2UyMmUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODgwNTkyNzQsImV4cCI6MTY4ODA2Mjg3NH0.eVKK3JKwHlO8LY3jmNTV4Nyn6xW5oIzbuZ2SX7TNvgs",
		"percent_agreement": "100",
		"total_balance": null,
		"last_settle_date": null,
		"activation_date": null,
		"createdAt": "2023-06-29T17:17:12.649Z"
	}
}
```
---

# User

--- 

## POST `/users`

Endpoint encargado de crear un nuevo user/cajero

### Parámetros body

|param|descripción|
|---|---|
|username|nombre del usuario|
|phone|telefono del usuario|
|email|email del usuario|
|percent_agreement|porcentaje de ganancia del usuario|

### Ejemplo Body 

```json
{
	"username": "test-cajero",
    "phone": "561-711-0225 x107415",
    "email": "test-cajero@hotmail.com",
	"percent_agreement": 40
}
```

---

Respuesta en caso de éxito:

```json
{
	"error": false,
	"data": {
		"username": "test-cajero",
		"phone": "561-711-0225 x107415",
		"email": "test-cajero@hotmail.com",
		"percent_agreement": 40,
		"password": "",
		"token": null,
		"total_balance": null,
		"last_settle_date": null,
		"activation_date": null,
		"id": "a4b1bca3-81b8-4747-8c2c-72e55b33ab8c",
		"role": "TELLER",
		"status": "INACTIVE",
		"createdAt": "2023-06-29T17:44:48.694Z"
	}
}
```
---



