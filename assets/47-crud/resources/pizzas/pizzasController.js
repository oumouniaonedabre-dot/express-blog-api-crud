import * as pizzasValidation from './pizzasValidation.js';

export const init = (pizzasRepository, logger) => {
  const getAll = (req, res) => {
    logger.log('pizza index');
    const filtered = pizzasRepository.getAll(req.query);

    res.json(filtered);
  };

  const getById = (req, res) => {
    const id = Number(req.params.id);
    
    if (Number.isNaN(id)) {
      logger.error('id non valido', id);
      
      res.status(400).json({
        status: 'Bad request',
        message: 'Id dev\'essere numerico'
      });
      
      return;
    }

    logger.log('pizza show', id);

    const pizza = pizzasRepository.getById(id);

    if (pizza === undefined) {
      logger.error('pizza non trovata', id);

      res.status(404).json({
        status: 'Not found',
        message: 'Pizza non trovata'
      });

      return;
    }

    res.json(pizza);
  };

  const create = (req, res) => {
    const pizza = pizzasValidation.createBody(req.body);

    if (pizza === null) {
      logger.error('pizza non valido', req.body);

      res.status(400).json({
        status: 'Bad request',
        message: 'Oggetto pizza non valido'
      });

      return;
    }

    logger.log('pizza create', pizza);

    const created = pizzasRepository.create(pizza);

    res.status(201).json(created);
  };

  const update = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      logger.error('id non valido', id);

      res.status(400).json({
        status: 'Bad request',
        message: 'Id dev\'essere numerico'
      });

      return;
    }

    const pizza = pizzasValidation.updateBody(req.body);

    if (pizza === null) {
      logger.error('pizza non valida', req.body);

      res.status(400).json({
        status: 'Bad request',
        message: 'Oggetto pizza non valido'
      });

      return;
    }

    if (pizza.id !== id) {
      logger.error('pizza id mismatch', pizza.id, id);

      res.status(400).json({
        status: 'Bad request',
        message: 'Payload non ha l\'id o id è inconsistente'
      });

      return;
    }

    logger.log('pizza update', pizza);

    const found = pizzasRepository.update(pizza);

    if (!found) {
      res.status(404).json({
        status: 'Not found',
        message: 'Pizza non trovata'
      });

      return;
    }

    res.sendStatus(204);
  };

  const modify = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      logger.error('id non valido', id);

      res.status(400).json({
        status: 'Bad request',
        message: 'Id dev\'essere numerico'
      });

      return;
    }

    const pizza = pizzasValidation.modifyBody(id, req.body);

    if (pizza === null) {
      logger.error('pizza non valida', req.body);

      res.status(400).json({
        status: 'Bad request',
        message: 'Oggetto pizza non valido'
      });

      return;
    }

    logger.log('pizza modify', pizza);

    const found = pizzasRepository.modify(pizza);

    if (!found) {
      res.status(404).json({
        status: 'Not found',
        message: 'Pizza non trovata'
      });

      return;
    }

    res.sendStatus(204);
  };

  const deleteById = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      logger.error('id non valid', id);

      res.status(400).json({
        status: 'Bad request',
        message: 'Id dev\'essere numerico'
      });

      return;
    }

    const pizza = pizzasRepository.getById(id);

    if (pizza === undefined) {
      logger.error('pizza non trovata', id);

      res.status(404).json({
        status: 'Not found',
        message: 'Pizza non trovata'
      });

      return;
    }

    logger.log('pizza delete', id);

    pizzasRepository.deleteById(id);

    res.sendStatus(204);
  };

  return {
    getAll,
    getById,
    create,
    update,
    modify,
    deleteById
  };
}
