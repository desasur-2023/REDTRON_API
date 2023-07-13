import { Pool, PoolClient } from 'pg';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { User } from '../domain/user';
import { encrypt } from '../utils/functions/bycript';
import createRandomUsers from '../utils/functions/createRandomUsers';
import { BaseError } from '../utils/errors/error';
import { StatusCodes } from 'http-status-codes';
import path from 'path';

dotenv.config();

async function resetUserDatabase() {
  const pool = new Pool({
    user: process.env.PG_DEV_USER,
    host: process.env.PG_DEV_HOST,
    database: process.env.PG_DEV_DATABASE,
    password: process.env.PG_DEV_PASSWORD,
    port: Number(process.env.PG_DEV_PORT), // Puerto por defecto de PostgreSQL
  });

  try {
    const client: PoolClient = await pool.connect();

    const dataDir = path.join(__dirname + '/../../data');

    // // Leer el archivo JSON de usuarios con datos reales
    const jsonData = fs.readFileSync(dataDir + '/users.json', 'utf-8');
    const users : User[] = JSON.parse(jsonData);

    // Borrar los datos de la tabla users
    await client.query('DELETE FROM user_casino')// Borro tabla intermedia antes
    await client.query('DELETE FROM users');

    // Creando usuarios random. 20 por defecto
    const randomUsers : User[] = await createRandomUsers().catch(e => e);

    // Agregando usuarios random
    if(randomUsers.length) randomUsers.forEach(u => users.push(u));
    for (let i = 0; i<users.length; i++) {
      users[i].password = await encrypt(users[i].password, 10)    
    }

    // Insertar en db
    for (const user of users) {
      await client.query('INSERT INTO users (username, phone,email, password, role, status, percent_agreement, total_balance) '+
      'VALUES ($1, $2, $3 ,$4 ,$5, $6 ,$7 , $8)', 
        [
            user.username, user.phone, user.email, user.password, user.role, 
            user.status, user.percent_agreement, user.total_balance
        ]
      ).catch(error => {throw new BaseError("Conflicto de carga en DB", StatusCodes.CONTINUE, error.message)});
    }

 
  } catch (error) {
    console.error('Error al reiniciar la base de datos de usuarios:', error);
    
  } finally {
    // Liberar la conexión del pool
    pool.end();
    process.exit();
  }
}

resetUserDatabase();
