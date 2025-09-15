// js/fees.iife.js
window.App = window.App || {};
(function (App) {
  App.initMarketsDropdown = function (marketsSelect) {
    (window.markets || []).forEach(function (m) {
      var opt = document.createElement('option');
      opt.value = m.ID; opt.text = m.name; marketsSelect.add(opt);
    });
  };

  App.getCurrentMarketAndFees = function (marketsSelect) {
    var selectedID = marketsSelect.value;
    var market = (window.markets || []).find(function (m) { return m.ID === selectedID; }) || {};
    var fees = (window.listOfFees || []).find(function (f) { return f.feesID === market.feesID; }) || {};
    return { market: market, fees: fees };
  };

  App.renderFeesUI = function (fees, market, callCenterFees, callCenterExtra, shippingFees, shippingExtra, codFees, codFeesExtra, currencyMarketEl) {
    if (!fees || !market) return;
    const extraFees = listOfFeesNotCalculed.find(p => p.feesID === fees.feesID);
    var currencyLogo = '$';
    if (extraFees.currerncy === 'USD') { currencyLogo = '$'; }
    else if (extraFees.currerncy === 'EUR') { currencyLogo = '€'; }
    else { currencyLogo = 'MAD'; };

    callCenterFees.innerHTML = '<b>Gadgets = ' + fees.gadgetCallCenter + ' (' + currencyLogo + ') <bR>Cosmetics = ' + fees.cosmeticCallCenter + ' (' + currencyLogo + ')';
    shippingFees.innerHTML = '<b>' + fees.ship + ' (' + currencyLogo + ')</b>';
    codFees.innerHTML = '<b>' + (fees.codFees * 100) + ' %</b>';

    console.log(currencyLogo);
    callCenterExtra.innerHTML = '' + codeTbleFeeds + '<tr>' +
      '  <th style="text-align:right; padding:8px 10px; font-weight:600; font-size:8px;">Gadgets</th>' +
      '  <td style="text-align:center; padding:8px 10px;">' +
      '    <span id="leadGadVal">' + extraFees.gadgetCallCenterLead + '</span> <span>' + currencyLogo + '</span>' +
      '  </td>' +
      '  <td style="text-align:center; padding:8px 10px;">' +
      '    <span id="confGadVal">' + extraFees.gadgetCallCenterConfirmation + '</span> <span>' + currencyLogo + '</span>' +
      '  </td>' +
      '</tr>' +
      '<tr>' +
      '  <th style="text-align:right; padding:8px 10px; font-weight:600; font-size:8px;">Cosmetics</th>' +
      '  <td style="text-align:center; padding:8px 10px;">' +
      '    <span id="leadCosVal">' + extraFees.cosmeticCallCenterLead + '</span> <span>' + currencyLogo + '</span>' +
      '  </td>' +
      '  <td style="text-align:center; padding:8px 10px;">' +
      '    <span id="confCosVal">' + extraFees.cosmeticCallCenterConfirmation + '</span> <span>' + currencyLogo + '</span>' +
      '  </td>' +
      '</tr>' +
      '</table>';

    shippingExtra.innerHTML = extraFees.returnShip + ' (' + currencyLogo + ')';
    codFeesExtra.innerHTML = extraFees.fulfillement > 0 ? 'Fulfillement : ' + extraFees.fulfillement + ' (' + currencyLogo + ')' : 'X';
    if (currencyMarketEl) currencyMarketEl.innerHTML = market.currency || '';
  };

  App.calculProfit = function (
    typeEl, salePriceEl, profitMarginEl, prixCostEl, cplEl, resultCalculEl,
    fees, convertToUSD, convertFromUSDToMAD,
    errorEl
  ) {

    // helper
    function showErr(msg) {
      if (!errorEl) return;
      errorEl.textContent = msg;
      errorEl.removeAttribute('hidden');
      errorEl.classList.add('show');
    }
    function clearErr() {
      if (!errorEl) return;
      errorEl.textContent = '';
      errorEl.classList.remove('show');
      errorEl.setAttribute('hidden', '');
    }


    if (!typeEl.value || !salePriceEl.value || !profitMarginEl.value || !prixCostEl.value || !cplEl.value) {
      showErr('عَمِّر الحقول المطلوبة من فضلك');
      return;
    }
    clearErr();

    var saleUSD = convertToUSD(salePriceEl.value);
    if (fees.feesID === 'MAR' || fees.feesID === 'EUR' || fees.feesID === 'POL' || fees.feesID === 'POR') {
      fees.ship = convertToUSD(fees.ship);
      fees.gadgetCallCenter = convertToUSD(fees.gadgetCallCenter);
      fees.cosmeticCallCenter = convertToUSD(fees.cosmeticCallCenter);
    }

    var feesCallCenter = 0;
    if (typeEl.value === 'Gadget') {
      feesCallCenter = fees.gadgetCallCenter + fees.ship + (saleUSD * fees.codFees);
    } else if (typeEl.value === 'Cosmitic') {
      feesCallCenter = fees.cosmeticCallCenter + fees.ship + (saleUSD * fees.codFees);
    } else {
      showErr('اختَر نوع المنتج من فضلك');
      return;
    }

    var totalProfit = 0;
    var profitMad = 0;

    if (Number(feesCallCenter.toFixed(2)) !== 0) {
      var feesCost = feesCallCenter + Number(prixCostEl.value);
      var triplCpl = Number(cplEl.value) * 3;
      var riskMargin = (Number(profitMarginEl.value) / 100) * Number(saleUSD);
      var feesAll = feesCost + triplCpl + riskMargin;
      totalProfit = Number(saleUSD) - feesAll;
      console.log(totalProfit);
      profitMad = convertFromUSDToMAD(totalProfit);
    }
    if (totalProfit > 0) {
      resultCalculEl.style.backgroundColor = '#006e12ff';
      resultCalculEl.style.color = '#ffffffff';
      resultCalculEl.innerHTML = 'Profit = ' + totalProfit.toFixed(2) + ' $ || ' + profitMad.toFixed(2) + ' MAD';
    } else if (totalProfit < 0) {
      resultCalculEl.style.backgroundColor = '#ff0000ff';
      resultCalculEl.style.color = '#ffffffff';
      resultCalculEl.innerHTML = 'Profit = ' + totalProfit.toFixed(2) + ' $ || ' + profitMad.toFixed(2) + ' MAD';
    } else {
      resultCalculEl.style.backgroundColor = '#e9b200ff';
      resultCalculEl.style.color = '#000000ff';
      resultCalculEl.innerHTML = 'Profit = 00 $ || 00 MAD';
    }

  };
})(window.App);
