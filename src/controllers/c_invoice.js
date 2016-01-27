/**
 * ES6 style module exports
 * - functions
 * export function sum(x, y) {
 *  console.warn(x);
 *    console.warn(y);
 *    return x + y;
 *  }
 *  - values
 *  export var pi = 3.141593;
 */

/**
 * ES6 module import
 */
import * as s_Finance from "../../src/services/s_finance";

/**
* NG Controller
* Angular module doesn't require ES6 export style (?)
*/
angular.module('invoice3', ['s_finance'])
.controller('InvoiceController', ['currencyConverter', function(currencyConverter) {
  this.qty = 1;
  this.cost = 2;
  this.inCurr = 'EUR';
  this.currencies = currencyConverter.currencies;

  this.total = function total(outCurr) {
    return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
  };
  this.pay = function pay() {
    window.alert("Thanks!");
  };
}]);