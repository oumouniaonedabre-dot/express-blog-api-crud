import express from 'express';
import { init as initController } from './pizzasController.js';

export const init = (pizzasRepository, logger) => {
  const pizzasController = initController(pizzasRepository, logger);
  const pizzasRouter = express.Router();

  pizzasRouter.get('/', pizzasController.getAll);
  pizzasRouter.get('/:id', pizzasController.getById);
  pizzasRouter.post('/', pizzasController.create);
  pizzasRouter.put('/:id', pizzasController.update);
  pizzasRouter.patch('/:id', pizzasController.modify);
  pizzasRouter.delete('/:id', pizzasController.deleteById);

  return pizzasRouter;
};
