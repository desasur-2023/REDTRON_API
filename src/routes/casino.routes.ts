import { Router } from 'express';
import casinoHandllers from '../handlers';


export default function casinoRouter(): Router {
  return Router()

    // .get('/:id', controllers.findOneById)
    .get("/", casinoHandllers.searchCasino)
    .post("/", casinoHandllers.crearCasino)
    // .delete("/:id", controllers.delete)
  
}