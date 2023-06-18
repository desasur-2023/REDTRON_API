import {createApp} from "./app";
import server from "./server";
import userController from "./crearUserMultiple";
import dotenv from "dotenv";
dotenv.config();

export default server(createApp);

async function createUsers() {
    try {
      const usersToCreate = 10; // Cambia el número si deseas crear una cantidad diferente de usuarios
      await userController.createMultipleRandom(usersToCreate);
      console.log(`${usersToCreate} usuarios creados exitosamente.`);
    } catch (error) {
      console.error("Error al crear los usuarios:", error);
    }
  }
  
  if (process.env.NODE_ENV === "development") {
    createUsers();
  }


