export const init = first => {
  let last = first;

  return { nextId: () => last++ };
};
