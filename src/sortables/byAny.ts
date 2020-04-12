import {sortable} from "../types/types";
import {SortOption} from "../interfaces/interfaces";
import {byDate, byNumber, byString} from '../index';

const byAny = <T>(options: SortOption = {desc: false}): sortable<T> => {

  return (first: T, second: T): number => {

    if (typeof first === 'number' && typeof second === 'number')
      return byNumber(options)(first, second);

    if (typeof first === 'string' && typeof second === 'string')
      return byString(options)(first, second);

    if (first instanceof Date && second instanceof Date)
      return byDate(options)(first, second);

    throw new Error('incorrect types of the 2 parameters')
  }
};

export default byAny;
