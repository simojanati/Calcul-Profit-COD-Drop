listOfFees = [
  { feesID: "KSA", codFees: 0.05, ship: 4.99, gadgetCallCenter: 2, cosmeticCallCenter: 3, currerncy: "USD" },
  { feesID: "UAE", codFees: 0.05, ship: 5.99, gadgetCallCenter: 2, cosmeticCallCenter: 3, currerncy: "USD" },
  { feesID: "GCC", codFees: 0.05, ship: 6.99, gadgetCallCenter: 2, cosmeticCallCenter: 3, currerncy: "USD" },
  { feesID: "MAR", codFees: 0, ship: 35, gadgetCallCenter: 7, cosmeticCallCenter: 7, currerncy: "MAD" },
  { feesID: "EUR", codFees: 0.05, ship: 7.99, gadgetCallCenter: 2, cosmeticCallCenter: 2, currerncy: "EUR" },
  { feesID: "POR", codFees: 0.05, ship: 7.99, gadgetCallCenter: 2, cosmeticCallCenter: 2, currerncy: "EUR" },
  { feesID: "POL", codFees: 0.05, ship: 6.99, gadgetCallCenter: 2, cosmeticCallCenter: 2, currerncy: "EUR" },
  { feesID: "COL", codFees: 0.05, ship: 4.49, gadgetCallCenter: 1, cosmeticCallCenter: 1, currerncy: "USD" },
  { feesID: "PAN", codFees: 0.05, ship: 7.99, gadgetCallCenter: 1, cosmeticCallCenter: 1, currerncy: "USD" }
];

listOfFeesNotCalculed = [
  {
    feesID: "KSA",
    gadgetCallCenterConfirmation: 1,
    cosmeticCallCenterConfirmation: 2,
    gadgetCallCenterLead: 0.5,
    cosmeticCallCenterLead: 0.5,
    returnShip: 2.99,
    fulfillement: 0,
    currerncy: "USD"
  },
  {
    feesID: "UAE",
    gadgetCallCenterConfirmation: 1,
    cosmeticCallCenterConfirmation: 2,
    gadgetCallCenterLead: 0.5,
    cosmeticCallCenterLead: 0.5,
    returnShip: 4.99,
    fulfillement: 0,
    currerncy: "USD"
  },
  {
    feesID: "GCC",
    gadgetCallCenterConfirmation: 1,
    cosmeticCallCenterConfirmation: 2,
    gadgetCallCenterLead: 0.5,
    cosmeticCallCenterLead: 0.5,
    returnShip: 5.99,
    fulfillement: 0,
    currerncy: "USD"
  },
  {
    feesID: "MAR",
    gadgetCallCenterConfirmation: 4,
    cosmeticCallCenterConfirmation: 4,
    gadgetCallCenterLead: 2,
    cosmeticCallCenterLead: 2,
    returnShip: 9,
    fulfillement: 8,
    currerncy: "MAD"
  },
  {
    feesID: "EUR",
    gadgetCallCenterConfirmation: 1,
    cosmeticCallCenterConfirmation: 1,
    gadgetCallCenterLead: 0.5,
    cosmeticCallCenterLead: 0.5,
    returnShip: 6.99,
    fulfillement: 0,
    currerncy: "EUR"
  },
  {
    feesID: "POR",
    gadgetCallCenterConfirmation: 1,
    cosmeticCallCenterConfirmation: 1,
    gadgetCallCenterLead: 0.5,
    cosmeticCallCenterLead: 0.5,
    returnShip: 8.99,
    fulfillement: 0,
    currerncy: "EUR"
  },
  {
    feesID: "POL",
    gadgetCallCenterConfirmation: 1,
    cosmeticCallCenterConfirmation: 1,
    gadgetCallCenterLead: 0.5,
    cosmeticCallCenterLead: 0.5,
    returnShip: 5.99,
    fulfillement: 0,
    currerncy: "EUR"
  },
  {
    feesID: "COL",
    gadgetCallCenterConfirmation: 0.5,
    cosmeticCallCenterConfirmation: 0.5,
    gadgetCallCenterLead: 0.25,
    cosmeticCallCenterLead: 0.25,
    returnShip: 4.49,
    fulfillement: 0,
    currerncy: "USD"
  },
  {
    feesID: "PAN",
    gadgetCallCenterConfirmation: 0.5,
    cosmeticCallCenterConfirmation: 0.5,
    gadgetCallCenterLead: 0.25,
    cosmeticCallCenterLead: 0.25,
    returnShip: 7.99,
    fulfillement: 0,
    currerncy: "USD"
  }
];

codeTbleFeeds = '<table dir="ltr" style="width:100%; border-collapse:collapse; font-family:system-ui, Arial, sans-serif;">' +
  '<colgroup>' +
  '  <col style="width:34%;">' +
  '  <col style="width:33%;">' +
  '  <col style="width:33%;">' +
  '</colgroup>' +
  '<tr>' +
  '  <th style="text-align:right; padding:8px 10px; font-size:15px; font-weight:700;"></th>' +
  '  <th style="text-align:center; padding:8px 10px; font-size:8px; font-weight:700;">LEAD</th>' +
  '  <th style="text-align:center; padding:8px 10px; font-size:8px; font-weight:700;">CONFIRMATION</th>' +
  '</tr>';