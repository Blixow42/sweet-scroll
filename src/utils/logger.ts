import { warning } from './warning';

export type Logger = (message: string) => void;

export const createLogger = (title: string, output: boolean): Logger => (
  (message: string): void => {
    if (output) {
      warning(`[${title}] ${message}`);
    }
  }
);
