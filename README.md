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

---

Deploy de Base de Datos
DATABASE_URL= `postgresql://postgres:OrbSyrG0p1TCaF572U0C@containers-us-west-52.railway.app:7846/railway`

Deploy de api
`redtronapi-development.up.railway.app`

---

Para levantar el servidor en modo desarrollo correr:

```
npm run dev
```

Para recargar la base de datos de usuario correr el siguiente script:

```
npm run reset-users-db

```

Para recargar la base de datos de casinos correr el siguiente script:

```
npm run reset-casinos-db
```

Para levantar el servidor con la base de datos deploy

```
npm run db
```

---

# Endpoints

---

# Login User

## POST `/auth/login`

Endpoint encargado de perrmitir el ingreso de un usuario

### Parámetros body

| param    | descripción            |
| -------- | ---------------------- |
| username | nombre del usuario     |
| password | contraseña del usuario |

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

| param             | descripción                        |
| ----------------- | ---------------------------------- |
| username          | nombre del usuario                 |
| phone             | telefono del usuario               |
| email             | email del usuario                  |
| percent_agreement | porcentaje de ganancia del usuario |

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

## GET `/users`

Endpoint encargado de traer todos los user/cajero

---

Respuesta en caso de éxito:

```json

	{
	"error": false,
	"data": [
		{
			"id": "e5827ffc-11b1-46c5-b413-0f6eaa83e22e",
			"username": "test-admin",
			"password": "",
			"phone": "561-711-0225 x10741",
			"role": "ADMIN",
			"email": "test-admin@hotmail.com",
			"status": "ACTIVE",
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNTgyN2ZmYy0xMWIxLTQ2YzUtYjQxMy0wZjZlYWE4M2UyMmUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODgwODcwNjUsImV4cCI6MTY4ODA5MDY2NX0.xeh4rre1OX6LrpyIA9wGBacEcEfmo5NEiEIUL3NuQ44",
			"percent_agreement": "100",
			"total_balance": null,
			"last_settle_date": null,
			"activation_date": null,
			"createdAt": "2023-06-29T17:17:12.649Z"
		},
		{
			"id": "a4b1bca3-81b8-4747-8c2c-72e55b33ab8c",
			"username": "test-cajero",
			"password": "",
			"phone": "561-711-0225 x107415",
			"role": "ADMIN",
			"email": "test-cajero@hotmail.com",
			"status": "ACTIVE",
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNGIxYmNhMy04MWI4LTQ3NDctOGMyYy03MmU1NWIzM2FiOGMiLCJyb2xlIjoiVEVMTEVSIiwiaWF0IjoxNjg4MDg4MjgyLCJleHAiOjE2ODgwOTE4ODJ9.AHSJPDwBWHVrsYyhTUfOXo1tyodDpEfz10UvOKjmdiU",
			"percent_agreement": "40",
			"total_balance": null,
			"last_settle_date": null,
			"activation_date": "2023-06-30T01:21:18.867Z",
			"createdAt": "2023-06-29T17:44:48.694Z"
		},
		-----
			{
			"id": "d4fd0ee6-55f9-495a-a7f9-af973f26f7ce",
			"username": "test-cajero3",
			"password": "",
			"phone": "561-711-0225 x10743",
			"role": "TELLER",
			"email": "test-cajero3@hotmail.com",
			"status": "ACTIVE",
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNGZkMGVlNi01NWY5LTQ5NWEtYTdmOS1hZjk3M2YyNmY3Y2UiLCJyb2xlIjoiVEVMTEVSIiwiaWF0IjoxNjg4MDkyMTQxLCJleHAiOjE2ODgwOTU3NDF9.qHt0n7FsKj4Rq-gn9QMLbRXGm-LrQOKlfMM-q0k_Dgk",
			"percent_agreement": "40",
			"total_balance": null,
			"last_settle_date": null,
			"activation_date": "2023-06-30T01:30:26.137Z",
			"createdAt": "2023-06-30T01:07:34.085Z"
		}
	]
}

```

---

## PUT `/users/:id`

Endpoint encargado de modificar los datos de un user/cajero

### Parámetros param

| param | descripción               |
| ----- | ------------------------- |
| id    | identificador del usuario |

### Ejemplo ruta

```
/users/d4fd0ee6-55f9-495a-a7f9-af973f26f7ce
```

---

### Parámetros body

| param             | descripción                        |
| ----------------- | ---------------------------------- |
| phone             | telefono del usuario               |
| email             | email del usuario                  |
| percent_agreement | porcentaje de ganancia del usuario |
| role              | rol del usuario                    |

### Ejemplo Body

```json
{
  "phone": "111111111",
  "email": "test-cajero_admin@hotmail.com",
  "percent_agreement": 60,
  "role": "ADMIN"
}
```

---

Respuesta en caso de éxito:

```json
{
  "error": false,
  "data": {
    "id": "d4fd0ee6-55f9-495a-a7f9-af973f26f7ce",
    "username": "test-cajero3",
    "password": "",
    "phone": "111111111",
    "role": "ADMIN",
    "email": "test-cajero_admin@hotmail.com",
    "status": "ACTIVE",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNGZkMGVlNi01NWY5LTQ5NWEtYTdmOS1hZjk3M2YyNmY3Y2UiLCJyb2xlIjoiVEVMTEVSIiwiaWF0IjoxNjg4MDkyMTQxLCJleHAiOjE2ODgwOTU3NDF9.qHt0n7FsKj4Rq-gn9QMLbRXGm-LrQOKlfMM-q0k_Dgk",
    "percent_agreement": 60,
    "total_balance": null,
    "last_settle_date": null,
    "activation_date": "2023-06-30T01:30:26.137Z",
    "createdAt": "2023-06-30T01:07:34.085Z"
  }
}
```

---

## GET `/users/:id`

Endpoint encargado de traer un user/cajero

### Parámetros param

| param | descripción               |
| ----- | ------------------------- |
| id    | identificador del usuario |

### Ejemplo ruta

```
/users/d4fd0ee6-55f9-495a-a7f9-af973f26f7ce
```

---

Respuesta en caso de éxito:

```json
{
  "error": false,
  "data": {
    "id": "d4fd0ee6-55f9-495a-a7f9-af973f26f7ce",
    "username": "test-cajero3",
    "password": "",
    "phone": "111111111",
    "role": "ADMIN",
    "email": "test-cajero_admin@hotmail.com",
    "status": "ACTIVE",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNGZkMGVlNi01NWY5LTQ5NWEtYTdmOS1hZjk3M2YyNmY3Y2UiLCJyb2xlIjoiVEVMTEVSIiwiaWF0IjoxNjg4MDkyMTQxLCJleHAiOjE2ODgwOTU3NDF9.qHt0n7FsKj4Rq-gn9QMLbRXGm-LrQOKlfMM-q0k_Dgk",
    "percent_agreement": "60",
    "total_balance": null,
    "last_settle_date": null,
    "activation_date": "2023-06-30T01:30:26.137Z",
    "createdAt": "2023-06-30T01:07:34.085Z"
  }
}
```

---

## DELETE `/users/:id`

Endpoint encargado de eliminar el registro de un usuario

### Parámetros param

| param | descripción               |
| ----- | ------------------------- |
| id    | identificador del usuario |

### Ejemplo ruta

```
/users/d4fd0ee6-55f9-495a-a7f9-af973f26f7ce
```

---

Respuesta en caso de éxito:

```json
{
  "error": false,
  "data": true
}
```

---

## PUT `/users/changePassword`

Endpoint encargado de modificar la contraseña y el status de un cajero al iniciar por primera vez

---

### Parámetros body

| param           | descripción                     |
| --------------- | ------------------------------- |
| userName        | nombre de usuario               |
| item            | objero con las contraseñas      |
| password        | contraseña designada por defeto |
| newPassword     | nueva contraseña                |
| comparePassword | repite la nueva contraseña      |

### Ejemplo Body

```json
{
  "userName": "test-cajero3",
  "item": {
    "password": "Redtron2023",
    "newPassword": "cajero3",
    "comparePassword": "cajero3"
  }
}
```

---

Respuesta en caso de éxito:

```json
{
  "error": false,
  "data": true
}
```

---

# Casino

---

## POST `/casino`

Endpoint encargado de crear un nuevo casino

### Parámetros body

| param     | descripción               |
| --------- | ------------------------- |
| name      | nombre del casino         |
| image_url | imagen del logo de casino |

### Ejemplo Body

```json
{
  "name": "Zeus",
  "image_url": "https://static.vecteezy.com/system/resources/previews/001/008/560/original/casino-frame-label-falling-ribbons-casino-vector.jpg"
}
```

---

Respuesta en caso de éxito:

```json
{
  "name": "Zeus",
  "image_url": "https://static.vecteezy.com/system/resources/previews/001/008/560/original/casino-frame-label-falling-ribbons-casino-vector.jpg",
  "id": "83229184-4805-4407-814a-90bdecf7279c",
  "createdAt": "2023-07-01T01:06:16.545Z"
}
```

---

## GET `/casino`

Endpoint encargado de traer todos los cajeros

---

Respuesta en caso de éxito:

```json
[
  {
    "id": "83229184-4805-4407-814a-90bdecf7279c",
    "name": "Zeus",
    "image_url": "https://static.vecteezy.com/system/resources/previews/001/008/560/original/casino-frame-label-falling-ribbons-casino-vector.jpg",
    "createdAt": "2023-07-01T01:06:16.545Z"
  },
  {
    "id": "0abacb98-3427-484f-a406-56f4a62885fa",
    "name": "Faraon",
    "image_url": "https://static.vecteezy.com/system/resources/previews/001/008/560/original/casino-frame-label-falling-ribbons-casino-vector.jpg",
    "createdAt": "2023-07-01T01:11:08.628Z"
  },
  {
    "id": "6785eb30-7a39-43dc-8edc-08a6b31750fd",
    "name": "Gana en Casa",
    "image_url": "https://static.vecteezy.com/system/resources/previews/001/008/560/original/casino-frame-label-falling-ribbons-casino-vector.jpg",
    "createdAt": "2023-07-01T01:11:25.376Z"
  }
]
```

---

## PUT `/casino/:id`

Endpoint encargado de modificar los datos de un casino

### Parámetros param

| param | descripción              |
| ----- | ------------------------ |
| id    | identificador del casino |

### Ejemplo ruta

```
/casino/6785eb30-7a39-43dc-8edc-08a6b31750fd
```

---

### Parámetros body

| param     | descripción               |
| --------- | ------------------------- |
| name      | nombre del casino         |
| image_url | imagen del logo de casino |

### Ejemplo Body

```json
{
  "name": "Modificado",
  "image_url": "https://static.vecteezy.com/system/resources/previews/001/008/560/original/casino-frame-label-falling-ribbons-casino-vector.jpg"
}
```

---

Respuesta en caso de éxito:

```json
{
  "id": "6785eb30-7a39-43dc-8edc-08a6b31750fd",
  "name": "Modificado",
  "image_url": "https://static.vecteezy.com/system/resources/previews/001/008/560/original/casino-frame-label-falling-ribbons-casino-vector.jpg",
  "createdAt": "2023-07-01T01:11:25.376Z"
}
```

---

## GET `/casino/:id`

Endpoint encargado de traer un casino

### Parámetros param

| param | descripción              |
| ----- | ------------------------ |
| id    | identificador del casino |

### Ejemplo ruta

```
/casino/6785eb30-7a39-43dc-8edc-08a6b31750fd
```

---

Respuesta en caso de éxito:

```json
{
  "id": "6785eb30-7a39-43dc-8edc-08a6b31750fd",
  "name": "Modificado",
  "image_url": "https://static.vecteezy.com/system/resources/previews/001/008/560/original/casino-frame-label-falling-ribbons-casino-vector.jpg",
  "createdAt": "2023-07-01T01:11:25.376Z"
}
```

---

## DELETE `/casino/:id`

Endpoint encargado de eliminar el registro de un casino

### Parámetros param

| param | descripción              |
| ----- | ------------------------ |
| id    | identificador del casino |

### Ejemplo ruta

```
/casino/6785eb30-7a39-43dc-8edc-08a6b31750fd
```

---

Respuesta en caso de éxito:

```json
true
```

---

# User_Casino

---

## POST `/userCasino`

Endpoint encargado de crear un nuevo user_casino

### Parámetros body

| param    | descripción                          |
| -------- | ------------------------------------ |
| usersId  | array de identificadores de usuarios |
| casinoId | identificador del casino             |

### Ejemplo Body

```json
{
  "usersId": [
    "6fea47ad-98d8-4dbf-9566-c261d7e15c3f",
    "92f6d557-8cc9-4c8e-8a0b-a49e527f0e76"
  ],
  "casinoId": "d7a28e76-1f92-4ec5-be3c-13520bcd632d"
}
```

---

Respuesta en caso de éxito:

```json
{
  "error": false,
  "data": [
    {
      "id": "65c55ba0-c4f2-431d-bcb5-2d5403809496",
      "debits": "0",
      "credits": "0",
      "createdAt": "2023-07-06T01:58:42.379Z",
      "user": {
        "id": "6fea47ad-98d8-4dbf-9566-c261d7e15c3f",
        "username": "redtron_teller"
      },
      "casino": {
        "id": "d7a28e76-1f92-4ec5-be3c-13520bcd632d",
        "name": "Linkbuzz"
      }
    },
    {
      "id": "76470561-beb5-431a-9002-175522bb9dce",
      "debits": "0",
      "credits": "0",
      "createdAt": "2023-07-06T01:58:42.394Z",
      "user": {
        "id": "92f6d557-8cc9-4c8e-8a0b-a49e527f0e76",
        "username": "kbenez9"
      },
      "casino": {
        "id": "d7a28e76-1f92-4ec5-be3c-13520bcd632d",
        "name": "Linkbuzz"
      }
    }
  ]
}
```

---

Respuesta en caso de que el User ya tenga ese casino asignado:

```json
{
  "error": true,
  "message": "The user has already assigned to this casino"
}
```

---

## GET `/userCasino`

Endpoint encargado de traer todos los user_casino

Respuesta en caso de éxito:

```json
{
  "error": false,
  "data": [
    {
      "id": "2000c851-ce61-4f1c-8f0c-849c20b9bf5a",
      "debits": "0",
      "credits": "0",
      "createdAt": "2023-07-02T22:28:22.077Z",
      "user": {
        "id": "75a27939-2133-4002-99b3-9efdde4daac1",
        "username": "test-cajero3"
      },
      "casino": {
        "id": "83229184-4805-4407-814a-90bdecf7279c",
        "name": "Zeus"
      }
    },
    {
      "id": "b83f4377-8a27-4611-aa8c-3ab70b8fff03",
      "debits": "0",
      "credits": "0",
      "createdAt": "2023-07-02T22:26:51.724Z",
      "user": {
        "id": "06c7fef8-9b88-4163-b7cb-2c761498730a",
        "username": "test-cajero2"
      },
      "casino": {
        "id": "0abacb98-3427-484f-a406-56f4a62885fa",
        "name": "Faraon"
      }
    },
    {
      "id": "464174a4-380f-46c8-9ee1-5a31d1a77a4a",
      "debits": "0",
      "credits": "0",
      "createdAt": "2023-07-02T22:26:10.126Z",
      "user": {
        "id": "75a27939-2133-4002-99b3-9efdde4daac1",
        "username": "test-cajero3"
      },
      "casino": {
        "id": "0abacb98-3427-484f-a406-56f4a62885fa",
        "name": "Faraon"
      }
    }
  ]
}
```

---

## GET `/userCasino?user=id`

Endpoint encargado de traer todos los user_casino que esten relacionados al id de un usuario

### Parámetros query

| param | descripción                   |
| ----- | ----------------------------- |
| user  | id: identificador del usuario |

### Ejemplo ruta

```
/userCasino?user=75a27939-2133-4002-99b3-9efdde4daac1

```

Respuesta en caso de éxito:

```json
{
  "error": false,
  "data": [
    {
      "id": "2000c851-ce61-4f1c-8f0c-849c20b9bf5a",
      "debits": "0",
      "credits": "0",
      "createdAt": "2023-07-02T22:28:22.077Z",
      "user": {
        "id": "75a27939-2133-4002-99b3-9efdde4daac1",
        "username": "test-cajero3"
      },
      "casino": {
        "id": "83229184-4805-4407-814a-90bdecf7279c",
        "name": "Zeus"
      }
    },
    {
      "id": "464174a4-380f-46c8-9ee1-5a31d1a77a4a",
      "debits": "0",
      "credits": "0",
      "createdAt": "2023-07-02T22:26:10.126Z",
      "user": {
        "id": "75a27939-2133-4002-99b3-9efdde4daac1",
        "username": "test-cajero3"
      },
      "casino": {
        "id": "0abacb98-3427-484f-a406-56f4a62885fa",
        "name": "Faraon"
      }
    }
  ]
}
```

---

## GET `/userCasino?casino=id`

Endpoint encargado de traer todos los user_casino que esten relacionados al id de un casino

### Parámetros query

| param  | descripción                  |
| ------ | ---------------------------- |
| casino | id: identificador del casino |

### Ejemplo ruta

```
/userCasino?casino=0abacb98-3427-484f-a406-56f4a62885fa

```

Respuesta en caso de éxito:

```json
{
  "error": false,
  "data": [
    {
      "id": "b83f4377-8a27-4611-aa8c-3ab70b8fff03",
      "debits": "0",
      "credits": "0",
      "createdAt": "2023-07-02T22:26:51.724Z",
      "user": {
        "id": "06c7fef8-9b88-4163-b7cb-2c761498730a",
        "username": "test-cajero2"
      },
      "casino": {
        "id": "0abacb98-3427-484f-a406-56f4a62885fa",
        "name": "Faraon"
      }
    },
    {
      "id": "464174a4-380f-46c8-9ee1-5a31d1a77a4a",
      "debits": "0",
      "credits": "0",
      "createdAt": "2023-07-02T22:26:10.126Z",
      "user": {
        "id": "75a27939-2133-4002-99b3-9efdde4daac1",
        "username": "test-cajero3"
      },
      "casino": {
        "id": "0abacb98-3427-484f-a406-56f4a62885fa",
        "name": "Faraon"
      }
    }
  ]
}
```

---

## GET `/userCasino?user=id&casino=id`

Endpoint encargado de traer todos los user_casino que esten relacionados al id de un casino y un usuario en particular

### Parámetros query

| param  | descripción                   |
| ------ | ----------------------------- |
| casino | id: identificador del casino  |
| user   | id: identificador del usuario |

### Ejemplo ruta

```
/userCasino?user=75a27939-2133-4002-99b3-9efdde4daac1&casino=0abacb98-3427-484f-a406-56f4a62885fa

```

Respuesta en caso de éxito:

```json
{
  "error": false,
  "data": [
    {
      "id": "464174a4-380f-46c8-9ee1-5a31d1a77a4a",
      "debits": "0",
      "credits": "0",
      "createdAt": "2023-07-02T22:26:10.126Z",
      "user": {
        "id": "75a27939-2133-4002-99b3-9efdde4daac1",
        "username": "test-cajero3"
      },
      "casino": {
        "id": "0abacb98-3427-484f-a406-56f4a62885fa",
        "name": "Faraon"
      }
    }
  ]
}
```

---
