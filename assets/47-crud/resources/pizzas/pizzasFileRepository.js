import fs from 'fs';

export const init = (DB_PATH, idGen) => {
  const readMenuFromFile = () => {
    const json = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(json);
  };

  const writeMenuToFile = menu => {
    const json = JSON.stringify(menu, null, 2);
    fs.writeFileSync(DB_PATH, json);
  };

  const getAll = filters => {
    let filtered = readMenuFromFile();

    const { ingredients, name } = filters;

    if (ingredients !== undefined) {
      filtered = filtered.filter(pizza => pizza.ingredients.includes(ingredients));
    }

    if (name !== undefined) {
      filtered = filtered.filter(pizza => pizza.name.toLowerCase().includes(name.toLowerCase()));
    }

    return filtered;
  };

  const getById = id => readMenuFromFile().find(pizza => pizza.id === id);

  const create = pizza => {
    const menu = readMenuFromFile();
    const id = idGen.nextId();

    const newPizza = { id, ...pizza };

    menu.push(newPizza);
    writeMenuToFile(menu);

    return newPizza;
  };

  const update = pizza => {
    const menu = readMenuFromFile();
    const found = menu.find(p => p.id === pizza.id);

    if (found === undefined) return false;

    found.name = pizza.name;
    found.image = pizza.image;
    found.ingredients = pizza.ingredients;

    writeMenuToFile(menu);

    return true;
  };

  const modify = pizzaPartial => {
    const menu = readMenuFromFile();
    const found = menu.find(p => p.id === pizzaPartial.id);

    if (found === undefined) return false;

    if (pizzaPartial.name !== undefined) found.name = pizzaPartial.name;
    if (pizzaPartial.image !== undefined) found.image = pizzaPartial.image;
    if (pizzaPartial.ingredients !== undefined) found.ingredients = pizzaPartial.ingredients;

    writeMenuToFile(menu);

    return true;
  };

  const deleteById = id => {
    const menu = readMenuFromFile();
    const pizza = getById(id);

    menu.splice(menu.indexOf(pizza), 1);

    writeMenuToFile(menu);
  };

  return {
    getAll,
    getById,
    create,
    update,
    modify,
    deleteById
  }
};
