import 'mocha';
import { expect } from 'chai';
import { isSameDay } from 'date-fns';
import { datable } from 'src/types/types';

const expectArrayToBeEquals = <T>(array1: T[], array2: T[]): void => {
    expect(JSON.stringify(array1)).to.be.equal(JSON.stringify(array2));
}

const expectDateToBeEquals = (date1: datable, date2: datable): void => {
    expect(isSameDay(new Date(date1), new Date(date2))).to.be.equal(true);
}

const expectDatableToBeEquals = (array1: datable[], array2: datable[]): void => {
    const parsedArray1 = array1.map(d => new Date(d));

    const parsedArray2 = array2.map(d => new Date(d));

    expectArrayToBeEquals(parsedArray1, parsedArray2);
}

export {
    expectArrayToBeEquals,
    expectDateToBeEquals,
    expectDatableToBeEquals
}