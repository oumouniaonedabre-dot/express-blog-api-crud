export const createBody = body => {
  const { name, image, ingredients } = body;

  if (typeof name !== 'string') return null;
  if (typeof image !== 'string') return null;
  if (!Array.isArray(ingredients)) return null;
  if (ingredients.some(ingredient => typeof ingredient !== 'string')) return null;

  return { name, image, ingredients };
};

export const updateBody = body => {
  const { id, name, image, ingredients } = body;

  if (typeof id !== 'number') return null;
  if (typeof name !== 'string') return null;
  if (typeof image !== 'string') return null;
  if (!Array.isArray(ingredients)) return null;
  if (ingredients.some(ingredient => typeof ingredient !== 'string')) return null;

  return { id, name, image, ingredients };
};

export const modifyBody = (id, body) => {
  const { name, image, ingredients } = body;

  if (name !== undefined && typeof name !== 'string') return null;
  if (image !== undefined && typeof image !== 'string') return null;
  if (ingredients !== undefined && !Array.isArray(ingredients)) return null;
  if (ingredients !== undefined && ingredients.some(ingredient => typeof ingredient !== 'string')) return null;

  return { id, name, image, ingredients };
};
