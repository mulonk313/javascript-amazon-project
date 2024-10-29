import { formatCurrency } from "../Scripts/utils/money.js";

console.log('test suite: formatCurrency');

console.log('converts cents into dollars');

formatCurrency(2095) === '20.95' 
? console.log('Passed') 
: console.log('Failed');

console.log('works with 0');

formatCurrency(0) === '0.00' 
? console.log('Passed') 
: console.log('Failed');

console.log('rounds up to the nearest cent');

formatCurrency(2000.5) === '20.01' 
? console.log('Passed') 
: console.log('Failed');

formatCurrency(2000.4) === '20.00' 
? console.log('Passed') 
: console.log('Failed');