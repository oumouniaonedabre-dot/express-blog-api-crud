import * as consoleLogger from './consoleLogger.js';
import { init as initFileLogger } from './fileLogger.js';

export const init = file => {
  const fileLogger = initFileLogger(file);

  const log = (...params) => {
    consoleLogger.log(...params);
    fileLogger.log(...params);
  };

  const error = (...params) => {
    consoleLogger.error(...params);
    fileLogger.error(...params);
  };

  return { log, error };
};
