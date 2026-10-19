export default [
  {
    slug: "plaid-vs-truelayer-vs-tink-bank-account-verification",
    title: "Bank Account Verification",
    vendors: ["Plaid", "TrueLayer", "Tink"],
    rows: [
      ["Product scope", "Auth plus Identity Match", "Verification API", "Account Check"],
      ["Output", "Account data and match scores", "Account-holder match result", "Account verification report"],
      ["Confirm first", "Bank, method and identity data", "API version and bank access", "Market and report contents"]
    ]
  },
  {
    slug: "fnality-vs-partior-vs-kinexys-institutional-payment-networks",
    title: "Institutional Payment Networks",
    vendors: ["Sterling Fnality", "Partior Payments", "Kinexys Digital Payments"],
    rows: [
      ["Cash model", "Representation of central-bank funds", "Commercial-bank-money network", "J.P. Morgan deposit accounts"],
      ["Network scope", "Eligible wholesale participants", "Authorized financial institutions", "Participating bank clients"],
      ["Confirm first", "Entitlement and currency system", "Settlement banks and live route", "Account structure and funding path"]
    ]
  }
];
