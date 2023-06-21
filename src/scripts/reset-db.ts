import { Pool, PoolClient } from 'pg';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { User } from '../domain/user';
import { encrypt } from '../utils/functions/bycript';

dotenv.config();

async function resetDatabase() {
  const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT), // Puerto por defecto de PostgreSQL
  });

  try {
    const client: PoolClient = await pool.connect();

    // Leer el archivo JSON
    const jsonData = fs.readFileSync('./data/users.json', 'utf-8');
    const users : User[] = JSON.parse(jsonData);

    console.log(users);

    // Borrar los datos de la tabla users
    await client.query('DELETE FROM users');

    for (let i = 0; i<users.length; i++) {
        users[i].password = await encrypt(users[i].password, 10)
    }


    // Insertar nuevos datos predefinidos desde el archivo JSON
    for (const user of users) {
      await client.query('INSERT INTO users (username, phone,email, password, role, status, percent_agreement, total_balance) '+
      'VALUES ($1, $2, $3 ,$4 ,$5, $6 ,$7 , $8)', 
        [
            user.username, user.phone, user.email, user.password, user.role, 
            user.status, user.percent_agreement, user.total_balance
        ]
    );
    }

    console.log('Datos reiniciados correctamente');
  } catch (error) {
    console.error('Error al reiniciar la base de datos:', error);
  } finally {
    // Liberar la conexión del pool
    pool.end();
    process.exit();
  }
}

resetDatabase();
