// js/exchange.iife.js
window.App = window.App || {};
(function (App) {
  var API_URL = 'https://latest.currency-api.pages.dev/v1/currencies/usd.json';

  App.initCurrencyDropdowns = function (fromSelect, toSelect) {
    (window.currencies || []).forEach(function (c) {
      var o1 = document.createElement('option'); o1.value = c; o1.text = c; fromSelect.add(o1);
      var o2 = document.createElement('option'); o2.value = c; o2.text = c; toSelect.add(o2);
    });
  };

  App.addMarketCurrencyToHidden = function (marketCurrency, hiddenEl) {
    return fetch(API_URL)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)); })
      .then(function (data) {
        var fromValue = Number(data.usd && data.usd[String(marketCurrency).toLowerCase()]);
        if (!Number.isFinite(fromValue)) throw new Error('Missing/invalid rate for ' + marketCurrency);
        hiddenEl.setAttribute('value', fromValue);
        return fromValue;
      });
  };

  App.addMadToHidden = function (hiddenEl) {
    return fetch(API_URL)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)); })
      .then(function (data) {
        var mad = Number(data.usd && data.usd.mad);
        if (!Number.isFinite(mad)) throw new Error('Missing/invalid MAD rate');
        hiddenEl.setAttribute('value', mad);
        return mad;
      });
  };

  App.convertUsingHidden = function (priceNumber, hiddenEl, mode /* 'toUSD' | 'fromUSD' */) {
    var rate = Number(hiddenEl.value);
    var amount = Number(priceNumber);
    if (!Number.isFinite(rate) || !Number.isFinite(amount)) return NaN;
    return mode === 'toUSD' ? (amount / rate) : (amount * rate);
  };

  App.convertCurrencyAmount = function (amountInput, fromSelect, toSelect, resultEl) {
    var amount = amountInput.value.trim();
    var fromCurrency = fromSelect.value;
    var toCurrency = toSelect.value;
    if (!amount) { alert('Please fill in the amount'); return; }

    return fetch(API_URL)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)); })
      .then(function (data) {
        var fromRate = Number(data.usd && data.usd[fromCurrency.toLowerCase()]);
        var toRate = Number(data.usd && data.usd[toCurrency.toLowerCase()]);
        if (!Number.isFinite(fromRate) || !Number.isFinite(toRate)) throw new Error('Missing/invalid rates');
        var converted = (Number(amount) / fromRate) * toRate;
        resultEl.innerHTML =
          '<span style="font-size:13px">Last Update : ' + data.date + ' : آخر تحديث</span><br>' +
          amount + ' ' + fromCurrency + ' = <b>' + converted.toFixed(2) + ' ' + toCurrency + '</b>';
        return converted;
      });
  };
})(window.App);
