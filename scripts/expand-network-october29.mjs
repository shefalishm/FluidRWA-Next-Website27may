import fs from 'node:fs';
const read=file=>JSON.parse(fs.readFileSync(`data/${file}`,'utf8'));
const profiles=read('asset-registry-candidates.json');
const roles=read('asset-infrastructure-relationships.json');
const checked='2026-10-29';
const batch=[
  {
    id:'anemoy-spxa',name:'SPXA - Janus Henderson Anemoy S&P 500 Fund',issuer:'Anemoy',structure:'Tokenized S&P 500 index fund',
    source:'https://centrifuge.io/blog/centrifuge-launches-spxa',sourceLabel:'Centrifuge SPXA announcement, 25 September 2025',sourceDate:'2025-09-25',
    notes:'Historical announcement names Anemoy as investment manager and Janus Henderson as sub-investment manager, with initial Base deployment. Planned multichain expansion is not treated as live. Not SPY, SPYon or SPYx. Current AUM, contracts and access terms remain unverified.',
    roles:[
      ['anemoy-manager','Anemoy','Investment manager','Named investment manager in the historical announcement; current legal entity and mandate require fund documents.'],
      ['janus-submanager','Janus Henderson','Sub-investment manager','Named sub-investment manager, distinct from Anemoy\'s investment-manager role.'],
      ['centrifuge-infrastructure','Centrifuge','Onchain fund infrastructure','Announcement attributes tokenization and Proof-of-Index technology to Centrifuge. Not a custody or transfer-agent appointment.']
    ]
  },
  {
    id:'anemoy-acrdx',name:'ACRDX - Anemoy Tokenized Apollo Diversified Credit Fund Segregated Portfolio',issuer:'Anemoy',structure:'Tokenized feeder to Apollo Diversified Credit Fund',
    source:'https://centrifuge.io/blog/acrdx-launch-on-centrifuge',sourceLabel:'Centrifuge ACRDX announcement, 16 September 2025',sourceDate:'2025-09-16',
    notes:'A separate feeder from the Securitize ACRED product already in this registry. The announced $50 million Grove deployment is historical seed capital, not current AUM. nACRDX is a separately described Nest access layer, not counted again here. Anemoy\'s management role was described as subject to approval; no completed approval is inferred. Current value, contracts and redemption terms remain unverified.',
    roles:[
      ['centrifuge-infrastructure','Centrifuge','Onchain fund infrastructure','Announcement identifies infrastructure to tokenize and manage the feeder; no current legal service entity inferred.'],
      ['chronicle-oracle','Chronicle','Oracle infrastructure','Participant announcement names Chronicle for onchain data. No independent valuation assurance or current feed address is established.'],
      ['wormhole-interoperability','Wormhole','Cross-chain interoperability','Integration is described in the launch announcement. This does not establish every current chain deployment or supported transfer route.']
    ]
  },
  {
    id:'fundbridge-ultra',name:'ULTRA - Delta Wellington Ultra Short Treasury On-Chain Fund',issuer:'FundBridge Capital / Delta Master Trust',structure:'Tokenized US Treasury sub-fund',
    source:'https://libeara.com/libeara-partners-with-wellington-and-fundbridge-capital-to-launch-a-u-s-treasuries-fund-tokenised-on-public-blockchain/',sourceLabel:'Libeara ULTRA launch disclosure; publication date not stated',sourceDate:null,
    notes:'Participant disclosure describes a fund under Delta Master Trust, using Libeara\'s Delta platform. Initial Ethereum deployment and planned other networks are historical descriptions, not a current chain audit. Manager-wide assets are not ULTRA AUM. Current value, contracts, custody mandate and investor-access terms require further evidence.',
    roles:[
      ['fundbridge-manager','FundBridge Capital','Fund management and trust structure','Libeara describes the fund under the Delta Master Trust established by FundBridge; FundBridge\'s own media page corroborates oversight. Precise entity mandate requires fund documents.'],
      ['wellington-subadvisor','Wellington Management','Sub-advisor','Named for the ULTRA Treasury strategy in the participant disclosure; not an appointment for every Delta fund.'],
      ['libeara-platform','Libeara','Tokenization platform','Delta platform is described for subscription, issuance, transfer and redemption of fund units; no claim of unconditional liquidity.'],
      ['standard-chartered-custody','Standard Chartered Bank','Fund custodian','Named as custodian in the participant announcement. Exact legal entity, assets covered and current mandate require offering documents; not investor-wallet custody.']
    ]
  },
  {
    id:'fundbridge-incom',name:'INCOM - FundBridge tokenized multi-sector income fund',issuer:'FundBridge Capital',structure:'Tokenized multi-sector fixed-income fund',
    source:'https://libeara.com/wellington-management-deepens-libeara-collaboration-with-tokenised-multi-sector-income-strategy/',sourceLabel:'Libeara INCOM announcement, 4 August 2026',sourceDate:'2026-08-04',
    notes:'Documented launch with Wellington Management Singapore as sub-adviser and Libeara technology. The strategy includes multiple fixed-income sectors, not a Treasury-only portfolio. Platform-wide $1 billion and Wellington-wide AUM are not this fund\'s value. Exact issuing vehicle, current AUM, contracts and redemption terms remain unverified.',
    roles:[
      ['fundbridge-manager','FundBridge Capital','Fund manager','Participant release and FundBridge media listing identify the manager relationship; current legal vehicle and mandate require fund documents.'],
      ['wellington-subadvisor','Wellington Management Singapore','Sub-adviser','Specific Singapore organization is named for the INCOM strategy. Do not infer custody or administration roles.'],
      ['libeara-platform','Libeara','Tokenization platform','Participant announcement attributes technology infrastructure to Libeara; no current smart-contract address or chain deployment is inferred.']
    ]
  }
];
for(const item of batch){
  if(profiles.some(row=>row.id===item.id)) throw new Error(`Already added: ${item.id}`);
  const {sourceDate,roles:relationships,...profile}=item;
  profiles.push({...profile,assetClass:'Digital funds',sourceReviewed:checked,reportedValueUsd:null,reportedMetric:null,reportedAsOf:null,freshnessDays:35,contractEvidence:null});
  for(const [suffix,provider,role,scope] of relationships){
    const id=`${item.id}-${suffix}`;
    if(roles.some(row=>row.id===id)) throw new Error(`Duplicate role ${id}`);
    roles.push({id,assetId:item.id,provider,role,source:item.source,sourceLabel:item.sourceLabel,sourceDate,reviewed:checked,scope});
  }
}
for(const [file,rows] of [['asset-registry-candidates.json',profiles],['asset-infrastructure-relationships.json',roles]]) fs.writeFileSync(`data/${file}`,`[\n${rows.map(row=>`  ${JSON.stringify(row)}`).join(',\n')}\n]\n`);
const snapshot=read('network-intelligence.json');snapshot.version='2026-10-29.2';
const serialized=`{\n${Object.entries(snapshot).map(([key,row])=>`  ${JSON.stringify(key)}: ${Array.isArray(row)?`[\n${row.map(item=>`    ${JSON.stringify(item)}`).join(',\n')}\n  ]`:JSON.stringify(row)}`).join(',\n')}\n}\n`;
fs.writeFileSync('data/network-intelligence.json',serialized);
console.log('Added four distinct fund profiles and thirteen scoped provider relationships. Existing financial observations unchanged.');
