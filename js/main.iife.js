// js/main.iife.js
window.App = window.App || {};
(function (App) {
  // DOM refs
  var marketsSelect = document.getElementById('markets');
  var callCenterFees = document.getElementById('callCenterValue');
  var shippingFees = document.getElementById('shippingValue');
  var codFees = document.getElementById('codFeesValue');
  var currencyMarket = document.getElementById('currencyMarket');
  var callCenterExtra = document.getElementById('callCenterExtra');
  var shippingExtra = document.getElementById('shippingExtra');
  var codFeesExtra = document.getElementById('codFeesExtra');

  var fromSelect = document.getElementById('from-currency-select');
  var toSelect = document.getElementById('to-currency-select');
  var amountInp = document.getElementById('amount');
  var result = document.getElementById('result');

  var resultHidden = document.getElementById('resultHidden'); // rate market->USD
  var madHidden = document.getElementById('madHidden');    // rate MAD->USD

  var typeProduct = document.getElementById('type');
  var salePrice = document.getElementById('salePrice');
  var profitMargin = document.getElementById('profitMargin');
  var prixCost = document.getElementById('prixCost');
  var cpl = document.getElementById('cpl');
  var resultCalcul = document.getElementById('resultCalcul');
  var currencyResultCalculSale = document.getElementById('currencyResultCalculSale');
  var currencyResultCalculSale2 = document.getElementById('currencyResultCalculSale2');
  var currencyResultCalculSale3 = document.getElementById('currencyResultCalculSale3');
  var formErrorP = document.getElementById('formError1');
  var formErrorSP = document.getElementById('formError2');

  function refreshFeesAndRates() {
    var tup = App.getCurrentMarketAndFees(marketsSelect);
    var market = tup.market, fees = tup.fees;

    App.renderFeesUI(fees, market, callCenterFees, callCenterExtra, shippingFees, shippingExtra, codFees, codFeesExtra, currencyMarket, currencyResultCalculSale, currencyResultCalculSale2, currencyResultCalculSale3);

    App.addMarketCurrencyToHidden(market.currency, resultHidden).catch(console.error);
    App.addMadToHidden(madHidden).catch(console.error);
  }

  function onCalculProfit() {
    var tup = App.getCurrentMarketAndFees(marketsSelect);
    var fees = tup.fees;

    var toUSD = function (v) { return App.convertUsingHidden(v, resultHidden, 'toUSD'); };
    var usdToMad = function (v) { return App.convertUsingHidden(v, madHidden, 'fromUSD'); };

    App.calculProfit(
      typeProduct, salePrice, profitMargin, prixCost, cpl, resultCalcul,
      fees, toUSD, usdToMad, formErrorP
    );
  }

  function onConvertCurrency() {
    App.convertCurrencyAmount(amountInp, fromSelect, toSelect, result).catch(console.error);
  }

  // init
  document.addEventListener('DOMContentLoaded', function () {
    // --- Sale Price Drop (second tab) ---
    var spdType = document.getElementById('spd-type');
    var spdPrixCost = document.getElementById('spd-prixCost');
    var spdCpl = document.getElementById('spd-cpl');
    var spdProfitMargin = document.getElementById('spd-profitMargin');
    var spdResult = document.getElementById('spd-resultCalcul');
    var spdResult2x3x = document.getElementById('spd-resultCalcul2x3x');

    function onCalcSalePrice() {
      var tup = App.getCurrentMarketAndFees(marketsSelect);
      var fees = tup.fees;
      var toUSD = function (v) { return App.convertUsingHidden(v, resultHidden, 'toUSD'); };
      var usdToMkt = function (v) { return App.convertUsingHidden(v, resultHidden, 'fromUSD'); };
      App.calcSalePrice(spdType, spdPrixCost, spdCpl, spdProfitMargin, spdResult, spdResult2x3x, fees, formErrorSP, toUSD, usdToMkt);
    }

    App.initMarketsDropdown(marketsSelect);
    App.initCurrencyDropdowns(fromSelect, toSelect);

    marketsSelect.value = 'KSA';
    fromSelect.value = 'SAR';
    toSelect.value = 'USD';

    refreshFeesAndRates();
    onConvertCurrency();

    var calcBtn = document.querySelector('#calcul-button');
    if (calcBtn) calcBtn.addEventListener('click', onCalculProfit);

    var convBtn = document.querySelector('#convert-button');
    if (convBtn) convBtn.addEventListener('click', onConvertCurrency);

    var amountInput = document.querySelector('#amount');
    if (amountInput) amountInput.addEventListener('change', onConvertCurrency);

    marketsSelect.addEventListener('change', refreshFeesAndRates);
    var spdBtn = document.getElementById('spd-calcul-button');
    if (spdBtn) spdBtn.addEventListener('click', onCalcSalePrice);
  });
})(window.App);
