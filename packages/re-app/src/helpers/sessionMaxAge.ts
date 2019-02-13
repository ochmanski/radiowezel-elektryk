const _sessionMaxAge: string = process.env.SESSION_MAX_AGE || '7776000000';

const dayInMs: number = 86400000;

/**
 * Czas po jakim sesja wygasza (ms)
 */
const sessionMaxAgeInMs: number = +_sessionMaxAge;

/**
 * Czas po jakim sesja wygasza (dni)
 */
const sessionMaxAgeInDays: number = sessionMaxAgeInMs / dayInMs;

export {
  sessionMaxAgeInMs,
  sessionMaxAgeInDays,
};
