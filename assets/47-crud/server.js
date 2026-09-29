import express from 'express';
import { init as initPizzasRouter } from './resources/pizzas/pizzasRouter.js';
import { init as initFileRepo } from './resources/pizzas/pizzasFileRepository.js';
import { init as initMemoryRepo } from './resources/pizzas/pizzasMemoryRepository.js';
import { menu } from './data/menu.js';
import { init as initAllLogger } from './logger/allLogger.js';
import * as uuidIdGen from './id-gen/uuidIdGen.js';
import { init as initNumIdGen } from './id-gen/numIdGen.js';

// const ENV = 'dev';
const ENV = 'prod';

let pizzasRepository;
let logger;

switch (ENV) {
  case 'prod':
    pizzasRepository = initFileRepo('./data/db.json', initNumIdGen(6));
    logger = initAllLogger('prod.txt');
    break;

  case 'dev':
    pizzasRepository = initMemoryRepo(menu, uuidIdGen);
    logger = initAllLogger('dev.txt');
    break;
}

export const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.use('/pizzas', initPizzasRouter(pizzasRepository, logger));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
