import axios from 'axios';
import { User } from '../../domain/user';
import { BaseError } from '../errors/error';
import { StatusCodes } from 'http-status-codes';
import * as fs from 'fs';

export default async function createRandomUsers(count?: number) : Promise<User[] | undefined>{
    try {
      let randomUsers;
      const fileExist = fs.existsSync(__dirname + '/../../../data/random_users.json');
      if(fileExist){
        const jsonData = fs.readFileSync(__dirname + '/../../../data/random_users.json', 'utf-8')
        randomUsers = JSON.parse(jsonData);
        return randomUsers;
      }
      console.log("Traer de la api")
      let api_url = process.env.MOCK_USERS_URL;
      if(count){
        api_url += `&rows=${count}`;
      }
      if(api_url){
        const response = await axios.get(api_url).catch(e => new BaseError(e.message, StatusCodes.CONFLICT));
        if(response instanceof BaseError) throw response;

        fs.writeFileSync(__dirname + '/../../../data/random_users.json', JSON.stringify(response.data, null, 2), 'utf8')
        console.log("JSON file created")
        return response.data as User[];
      }
    } catch (error) {
      console.error('Error al crear los usuarios aleatorios:', error.message);
    }
  };

