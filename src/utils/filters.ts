import { IHero } from '../types/hero';

export const heroesFilter = (h: IHero, query: string) =>
  h.name && h.name.toLowerCase().startsWith(query.toLowerCase());

const filters = { heroesFilter };

export default filters;
