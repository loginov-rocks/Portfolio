import { annualizePercent } from './PortfolioService';

describe('annualizePercent', () => {
  it('returns correct annual profit and loss', () => {
    expect(annualizePercent(0, '2019-01-01')).toBe(0);
    expect(annualizePercent(0, '2019-01-01', '2019-01-01')).toBe(0);
    expect(annualizePercent(0, '2019-01-01', '2019-07-01')).toBe(0);
    expect(annualizePercent(0, '2019-01-01', '2020-01-01')).toBe(0);
    expect(annualizePercent(0, '2019-01-01', '2021-01-01')).toBe(0);

    expect(annualizePercent(7.777, '2019-01-01', '2019-01-01')).toBe(0);
    expect(annualizePercent(7.777, '2019-01-01', '2019-07-01').toFixed(4)).toBe('15.6936');
    expect(annualizePercent(7.777, '2019-01-01', '2020-01-01').toFixed(4)).toBe('7.7823');
    expect(annualizePercent(7.777, '2019-01-01', '2021-01-01').toFixed(4)).toBe('3.8858');

    expect(annualizePercent(10, '2019-01-01', '2019-01-01')).toBe(0);
    expect(annualizePercent(10, '2019-01-01', '2019-07-01').toFixed(4)).toBe('20.1796');
    expect(annualizePercent(10, '2019-01-01', '2020-01-01').toFixed(4)).toBe('10.0068');
    expect(annualizePercent(10, '2019-01-01', '2021-01-01').toFixed(4)).toBe('4.9966');

    expect(annualizePercent(123.456, '2019-01-01', '2019-01-01')).toBe(0);
    expect(annualizePercent(123.456, '2019-01-01', '2019-07-01').toFixed(4)).toBe('249.1288');
    expect(annualizePercent(123.456, '2019-01-01', '2020-01-01').toFixed(4)).toBe('123.5406');
    expect(annualizePercent(123.456, '2019-01-01', '2021-01-01').toFixed(4)).toBe('61.6858');
  });
});
