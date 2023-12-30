export const DAYS_IN_MS = 84_400_000;

export const epochToISO = (epoch: number) => new Date(epoch * 1000).toISOString();
