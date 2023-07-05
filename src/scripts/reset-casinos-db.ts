import { Pool, PoolClient } from 'pg';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { BaseError } from '../utils/errors/error';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { Casino } from '../domain/casino';

dotenv.config();

async function resetCasinoDatabase() {
  const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT), // Puerto por defecto de PostgreSQL
  });

  try {
    const client: PoolClient = await pool.connect();

    const dataDir = path.join(__dirname + '/../../data');

    // // Leer el archivo JSON de casinos con datos reales
    const jsonData = fs.readFileSync(dataDir + '/casinos.json', 'utf-8');
    const casinos : Casino[] = JSON.parse(jsonData);

    // Borrar los datos de la tabla casinos
    await client.query('DELETE FROM user_casino')// Borro tabla intermedia antes
    await client.query('DELETE FROM casino');
    

    //Insertar en db
    for (const casino of casinos) {
      await client.query('INSERT INTO casino (name, image_url) '+
      'VALUES ($1, $2)', 
        [
            casino.name, casino.imageUrl
        ]
      ).catch(error => {throw new BaseError("Conflicto de carga en DB", StatusCodes.CONTINUE, error.message)});

    }

    console.log('Datos de casinos cargados correctamente');
    
  } catch (error) {
    console.error('Error al reiniciar la base de datos de casinos:', error);
    
  } finally {
    // Liberar la conexión del pool
    pool.end();
    process.exit();
  }
}

resetCasinoDatabase();
