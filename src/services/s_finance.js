/**
 * ES6 style module exports
 * - functions
 * export function sum(x, y) {
 *	console.warn(x);
 *		console.warn(y);
 *	 	return x + y;
 *	}
 *	- values
 *	export var pi = 3.141593;
 */

/**
* NG Service
* Angular module doesn't require ES6 export style (?)
*/
angular.module('s_finance', []) // name our controller class 
	   .factory('currencyConverter', ['$http', function($http) {
		  var YAHOO_FINANCE_URL_PATTERN =
		        '//query.yahooapis.com/v1/public/yql?q=select * from '+
		        'yahoo.finance.xchange where pair in ("PAIRS")&format=json&'+
		        'env=store://datatables.org/alltableswithkeys&callback=JSON_CALLBACK';
		  var currencies = ['USD', 'EUR', 'CNY'];
		  var usdToForeignRates = {};

		  var convert = function (amount, inCurr, outCurr) {
		    return amount * usdToForeignRates[outCurr] / usdToForeignRates[inCurr];
		  };

		  var refresh = function() {
		    var url = YAHOO_FINANCE_URL_PATTERN.
		               replace('PAIRS', 'USD' + currencies.join('","USD'));
		    return $http.jsonp(url).then(function(response) {
		      var newUsdToForeignRates = {};
		      angular.forEach(response.data.query.results.rate, function(rate) {
		        var currency = rate.id.substring(3,6);
		        newUsdToForeignRates[currency] = window.parseFloat(rate.Rate);
		      });
		      usdToForeignRates = newUsdToForeignRates;
		    });
		  };

		  refresh();

		  return {
		    currencies: currencies,
		    convert: convert
		  };
	   }]);
