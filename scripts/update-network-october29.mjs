import fs from 'node:fs';
const read = file => JSON.parse(fs.readFileSync(`data/${file}`, 'utf8'));
const write = (file, value) => {
  const serialized = Array.isArray(value) ? `[\n${value.map(row=>`  ${JSON.stringify(row)}`).join(',\n')}\n]`
    : file === 'network-intelligence.json' ? `{\n${Object.entries(value).map(([key,row])=>`  ${JSON.stringify(key)}: ${Array.isArray(row)?`[\n${row.map(item=>`    ${JSON.stringify(item)}`).join(',\n')}\n  ]`:JSON.stringify(row)}`).join(',\n')}\n}`
    : JSON.stringify(value, null, 2);
  fs.writeFileSync(`data/${file}`, `${serialized}\n`);
};
const checked = '2026-10-29';
const snapshot = read('network-intelligence.json');
const profiles = read('asset-registry-candidates.json');
const history = read('fund-disclosure-history.json');
const roles = read('asset-infrastructure-relationships.json');
const wisdomtree = read('issuer-funds-wisdomtree.json');
const archiveFile = 'network-value-observations.json';
const archive = fs.existsSync(`data/${archiveFile}`) ? read(archiveFile) : { scope: 'Dated issuer disclosures preserved across registry updates. Different metrics and reporting dates are not a market total or a net-flow series.', observations: [] };
function preserve(asset) {
  const row = {assetId:asset.id, metric:asset.metric, value:asset.value, currency:asset.currency, reportedAsOf:asset.asOf, checked:asset.sourceReviewed, source:asset.source};
  if(!archive.observations.some(x=>x.assetId===row.assetId && x.reportedAsOf===row.reportedAsOf && x.metric===row.metric)) archive.observations.push(row);
}
for(const id of ['usdc','wtgxx']) preserve(snapshot.assets.find(a=>a.id===id));
Object.assign(snapshot.assets.find(a=>a.id==='usdc'), {value:71000000000,asOf:'2026-10-26',sourceReviewed:checked});
Object.assign(snapshot.assets.find(a=>a.id==='wtgxx'), {
  metric:'Reported assets under management',value:761984900,asOf:'2026-10-27',sourceReviewed:checked,
  source:'https://www.wisdomtree.com/onchain/tokenized-funds', sourceLabel:'WisdomTree Onchain fund table, AUM in USD thousands',
  scope:'Issuer-reported fund AUM, converted from the table\'s USD-thousands unit. Not token circulation or a network allocation.',
  notes:'The table reports 761,984.90 in USD thousands on 27 October 2026. Prior September net-assets evidence is retained in the downloadable observation record; the different metric is not used to infer net flows. Contract evidence remains the earlier September factsheet and was not reverified in this update. The transfer agent maintains ownership; blockchain representations are not a separate security.'
});
for(const id of ['usdc','wtgxx']) preserve(snapshot.assets.find(a=>a.id===id));
snapshot.version='2026-10-29.1'; snapshot.updated=checked;
for(const [id,value] of [['ustb',691867689],['uscc',190151335]]) {
  const asset=profiles.find(a=>a.id===id);
  asset.reportedValueUsd=value; asset.reportedAsOf='2026-10-27'; asset.sourceReviewed=checked;
  asset.notes=id==='ustb'
    ? 'Issuer-reported fund AUM as of 27 October 2026, including tokenized and book-entry shares. The holdings table is separately dated 21 September 2026 and is not used as a current portfolio or allocated to networks.'
    : 'Issuer-reported fund AUM as of 27 October 2026, including tokenized and book-entry shares. Network values shown on the reviewed page do not reconcile with headline AUM; network allocations are excluded. This is a crypto carry strategy, not a Treasury-only fund.';
  if(!history.observations.some(r=>r.assetId===id&&r.reportedAsOf==='2026-10-27')) history.observations.push({assetId:id,reportedAsOf:'2026-10-27',value,checked,source:asset.source});
}
history.updated=checked;
const newProfiles=[
  {id:'janus-jqqq',name:'JQQQ - Janus Henderson Nasdaq-100 fund',issuer:'Janus Henderson',assetClass:'Digital funds',structure:'Tokenized Nasdaq-100 index fund',source:'https://centrifuge.io/blog/jqqq-janushenderson-nasdaq',sourceLabel:'Centrifuge JQQQ launch announcement, 27 October 2026',sourceReviewed:checked,notes:'Participant announcement describes Janus Henderson management, Centrifuge infrastructure and an initial Stellar launch. No current AUM, token contract, custody appointment or investor-access terms are verified. Not the Invesco QQQ ETF.',reportedValueUsd:null,reportedMetric:null,reportedAsOf:null,freshnessDays:35,contractEvidence:null},
  {id:'anemoy-hyb',name:'HYB - NYLIM Anemoy U.S. High Yield Corporate Bond Segregated Portfolio',issuer:'NYLIM / Anemoy',assetClass:'Digital funds',structure:'Tokenized high-yield corporate-bond strategy',source:'https://centrifuge.io/blog/nylim-centrifuge',sourceLabel:'Centrifuge NYLIM HYB announcement, 30 June 2026',sourceReviewed:checked,notes:'Participant announcement describes tokenization through Centrifuge and subscriptions/redemptions in USDC. The manager\'s total AUM is not this fund\'s value. Current fund AUM, contracts, precise service-provider entities and investor eligibility remain unverified.',reportedValueUsd:null,reportedMetric:null,reportedAsOf:null,freshnessDays:35,contractEvidence:null}
];
for(const asset of newProfiles) if(!profiles.some(a=>a.id===asset.id)) profiles.push(asset);
const additions=[
  ['jqqq-janus-manager','janus-jqqq','Janus Henderson','Investment management','2026-10-27','Announcement names Janus Henderson as manager; precise contracting entity and mandate require offering documents.'],
  ['jqqq-centrifuge-infrastructure','janus-jqqq','Centrifuge','Onchain fund infrastructure','2026-10-27','Named infrastructure provider at launch; no current contract address, custody or transfer-agent appointment inferred.'],
  ['jqqq-nasdaq-index','janus-jqqq','Nasdaq','Index licensing','2026-10-27','Nasdaq-100 index licensing is named; the announcement expressly disclaims Nasdaq product issuance or endorsement.'],
  ['hyb-centrifuge-infrastructure','anemoy-hyb','Centrifuge','Onchain fund infrastructure','2026-06-30','Announcement identifies Centrifuge tokenization and USDC subscription/redemption workflow; not a custody appointment.'],
  ['hyb-nylim-strategy','anemoy-hyb','New York Life Investment Management','Underlying investment strategy','2026-06-30','Announcement attributes the underlying portfolio process and risk management to NYLIM; precise fund manager entity requires legal documents.']
];
for(const [id,assetId,provider,role,sourceDate,scope] of additions) {
  const asset=newProfiles.find(a=>a.id===assetId);
  if(!roles.some(r=>r.id===id)) roles.push({id,assetId,provider,role,source:asset.source,sourceLabel:asset.sourceLabel,sourceDate,reviewed:checked,scope});
}
const values={SPXUX:19018360,TECHX:6781050,FLTTX:1889450,WTPIX:1681410,WTSIX:1271290,EQTYX:1172740,WTSYX:1006360,WTTSX:957840,TIPSX:930560,WTSTX:914910,WTLGX:752320,CRDYX:583830,LNGVX:578980,MODRX:528040};
wisdomtree.rosterSource ||= wisdomtree.source;
wisdomtree.source='https://www.wisdomtree.com/onchain/tokenized-funds';
wisdomtree.sourceLabel='WisdomTree Onchain fund table'; wisdomtree.sourceReviewed=checked;
wisdomtree.reportedAsOf='2026-10-27'; wisdomtree.reportedMetric='Reported fund assets under management';
wisdomtree.valueMethod='AUM shown in USD thousands, multiplied by 1,000. Fund-level values, not circulating token value, network allocations or a market total.';
wisdomtree.selection='Fourteen WisdomTree Digital Funds identified in the issuer table reviewed 29 October 2026, excluding WTGXX, which has its own research profile. The earlier issuer FAQ classification of blockchain as a secondary ownership record is retained; no contract, investor eligibility or trading availability is inferred.';
for(const asset of wisdomtree.assets) {
  if(!Number.isFinite(values[asset.symbol])) throw new Error(`Missing reviewed value ${asset.symbol}`);
  asset.reportedValueUsd=values[asset.symbol];
}
write(archiveFile,archive); write('network-intelligence.json',snapshot); write('asset-registry-candidates.json',profiles);
write('fund-disclosure-history.json',history); write('asset-infrastructure-relationships.json',roles); write('issuer-funds-wisdomtree.json',wisdomtree);
console.log('Updated four existing headline/profile figures; added fourteen dated WisdomTree values, two fund profiles and five roles. Older observations retained.');
