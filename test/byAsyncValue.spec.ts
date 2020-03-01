import { asyncGenerator } from "./utils/async";
import sortAsync, { AsyncArray } from 'src/sortables/byAsyncValue';
import { byNumber, byValue, byString } from 'src';


const asyncArray: Promise<number>[] = [asyncGenerator(4), asyncGenerator(1), asyncGenerator(7), asyncGenerator(0)]

const asyncHandler = new AsyncArray(asyncArray);

const sortedArray = asyncHandler.sortAsync(byNumber())

sortAsync(asyncArray, byValue(x => x, byNumber()))