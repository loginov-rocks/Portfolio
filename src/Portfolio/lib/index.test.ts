import { calculateAnnualPLPercent } from './index';

describe('calculateAnnualPLPercent', () => {
  it('returns correct annual profit and loss', () => {
    expect(calculateAnnualPLPercent(0, '2019-01-01')).toBe(0);
    expect(calculateAnnualPLPercent(0, '2019-01-01', '2019-01-01')).toBe(0);
    expect(calculateAnnualPLPercent(0, '2019-01-01', '2019-07-01')).toBe(0);
    expect(calculateAnnualPLPercent(0, '2019-01-01', '2020-01-01')).toBe(0);
    expect(calculateAnnualPLPercent(0, '2019-01-01', '2021-01-01')).toBe(0);

    expect(calculateAnnualPLPercent(7.777, '2019-01-01', '2019-01-01')).toBe(0);
    expect(calculateAnnualPLPercent(7.777, '2019-01-01', '2019-07-01').toFixed(4)).toBe('15.6936');
    expect(calculateAnnualPLPercent(7.777, '2019-01-01', '2020-01-01').toFixed(4)).toBe('7.7823');
    expect(calculateAnnualPLPercent(7.777, '2019-01-01', '2021-01-01').toFixed(4)).toBe('3.8858');

    expect(calculateAnnualPLPercent(10, '2019-01-01', '2019-01-01')).toBe(0);
    expect(calculateAnnualPLPercent(10, '2019-01-01', '2019-07-01').toFixed(4)).toBe('20.1796');
    expect(calculateAnnualPLPercent(10, '2019-01-01', '2020-01-01').toFixed(4)).toBe('10.0068');
    expect(calculateAnnualPLPercent(10, '2019-01-01', '2021-01-01').toFixed(4)).toBe('4.9966');

    expect(calculateAnnualPLPercent(123.456, '2019-01-01', '2019-01-01')).toBe(0);
    expect(calculateAnnualPLPercent(123.456, '2019-01-01', '2019-07-01').toFixed(4)).toBe('249.1288');
    expect(calculateAnnualPLPercent(123.456, '2019-01-01', '2020-01-01').toFixed(4)).toBe('123.5406');
    expect(calculateAnnualPLPercent(123.456, '2019-01-01', '2021-01-01').toFixed(4)).toBe('61.6858');
  });
});
