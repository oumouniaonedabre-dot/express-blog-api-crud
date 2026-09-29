import fs from 'fs';

export const init = file => {
  const log = (...params) => {
    const text = JSON.stringify(['log', ...params]);
    fs.appendFileSync(file, text);
  };

  const error = params => {
    const text = JSON.stringify(['error', ...params]);
    fs.appendFileSync(file, text);
  };

  return { log, error };
};
