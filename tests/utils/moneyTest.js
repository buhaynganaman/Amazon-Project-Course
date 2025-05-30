import { formatCurrency, calculate10PercentTax } from '../../scripts/utils/money.js';

describe('Test Suite: formatCurrency', () => {

      it('converts cents into dollars', () => {
            expect(formatCurrency(2095)).toEqual('20.95');
      });

      it('Works with 0', () => {
            expect(formatCurrency(0)).toEqual('0.00');
      });

      it('rounds up to the nearest cent', () => {
            expect(formatCurrency(2000.5)).toEqual('20.01');
      });

      it('rounds down to the nearest cent', () => {
            expect(formatCurrency(2000.4)).toEqual('20.00');
      });

      it('Convert negative to zero', () => {
            expect(formatCurrency(-1)).toEqual('0.00');
      });

});

describe('Test Suite: calculateTax', () => {

      it('calculates a 10% tax', () => {
            expect(calculate10PercentTax(57.73)).toEqual('5.77');
      });

      it('Works with 0', () => {
            expect(calculate10PercentTax(0)).toEqual('0.00');
      });

});