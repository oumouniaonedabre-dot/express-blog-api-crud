export const init = (menu, idGen) => {
  const getAll = filters => {
    let filtered = menu;

    const { ingredients, name } = filters;

    if (ingredients !== undefined) {
      filtered = filtered.filter(pizza => pizza.ingredients.includes(ingredients));
    }

    if (name !== undefined) {
      filtered = filtered.filter(pizza => pizza.name.toLowerCase().includes(name.toLowerCase()));
    }

    return filtered;
  };

  const getById = id => menu.find(pizza => pizza.id === id);

  const create = pizza => {
    const id = idGen.nextId();
    const newPizza = { id, ...pizza };

    menu.push(newPizza);

    return newPizza;
  };

  const update = pizza => {
    const found = menu.find(p => p.id === pizza.id);

    if (found === undefined) return false;

    found.name = pizza.name;
    found.image = pizza.image;
    found.ingredients = pizza.ingredients;

    return true;
  };

  const modify = pizzaPartial => {
    const found = menu.find(p => p.id === pizzaPartial.id);

    if (found === undefined) return false;

    if (pizzaPartial.name !== undefined) found.name = pizzaPartial.name;
    if (pizzaPartial.image !== undefined) found.image = pizzaPartial.image;
    if (pizzaPartial.ingredients !== undefined) found.ingredients = pizzaPartial.ingredients;

    return true;
  };

  const deleteById = id => {
    const pizza = getById(id);

    menu.splice(menu.indexOf(pizza), 1);
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
