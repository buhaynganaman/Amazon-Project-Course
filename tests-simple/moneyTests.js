import { formatCurrency, calculate10PercentTax } from '../scripts/utils/money.js';

console.log('-------------------------------------------------')
console.log('Test suite: formatCurrency')

console.log('converts cents into dollars');
if (formatCurrency(2095) === 20.95) {
      console.log('> passed');
} else {
      console.log('> failed');
}

console.log('Works with 0');
if (formatCurrency(0) === 0.00) {
      console.log('> passed');
} else {
      console.log('> failed');
}

console.log('rounds up to the nearest cent ');
if (formatCurrency(2000.5) === 20.01) {
      console.log('> passed');
} else {
      console.log('> failed');
}

console.log('rounds down to the nearest cent ');
if (formatCurrency(2000.4) === 20.00) {
      console.log('> passed');
} else {
      console.log('> failed');
}

console.log('-------------------------------------------------')
console.log('Test suite: calculateTax')

console.log('calculates a 10% tax')
if ( calculate10PercentTax(57.73) === 5.77) {
      console.log('> passed');
} else {
      console.log('> failed');
}

console.log('works with 0')
if ( calculate10PercentTax(0) === 0.00) {
      console.log('> passed');
} else {
      console.log('> failed');
}