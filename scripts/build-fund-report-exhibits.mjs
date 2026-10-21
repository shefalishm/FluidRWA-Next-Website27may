import fs from 'node:fs';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const report=JSON.parse(fs.readFileSync('data/research/tokenized-fund-infrastructure-2026-10-v1.json','utf8'));
const stem='tokenized-funds-october-2026-editorial-v1';
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text=(x,y,value,size=26,color='#17304a',weight=400)=>`<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(value)}</text>`;
function lines(x,y,value,max,size=26,color='#17304a',weight=400){
  const result=[];let line='';
  for(const word of value.split(' ')){
    if(line && `${line} ${word}`.length>max){result.push(line);line=word;}else line=line?`${line} ${word}`:word;
  }
  if(line)result.push(line);
  return result.map((line,i)=>text(x,y+i*size*1.4,line,size,color,weight)).join('');
}
function frame(width,height,number,title,body,footnote){
  const mobile=width===780;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="white"/><rect x="40" y="24" width="52" height="5" fill="#edcd42"/>${text(40,65,`FLUIDRWA RESEARCH / EXHIBIT ${number}`,mobile?24:21,'#2467aa',700)}${lines(40,122,title,mobile?32:66,mobile?40:38,'#17304a',700)}${body}<line x1="40" x2="${width-40}" y1="${height-140}" y2="${height-140}" stroke="#cad7e2"/>${lines(40,height-105,footnote,mobile?53:122,mobile?24:19,'#536479')}${text(40,height-20,'fluidrwa.com | October 2026',mobile?24:19,'#2467aa')}</svg>`;
}
for(const mobile of [false,true]){
  const width=mobile?780:1400;
  const suffix=mobile?'-mobile':'';
  const functions=[
    ['custody','Safeguard the investments','Custodian / depositary','Holds the assets belonging to the fund.'],
    ['administration','Maintain the fund accounts','Fund administrator','Provides the accounting and administration described in its appointment.'],
    ['transfer','Record changes in ownership','Transfer agent','Maintains or updates shareholder records under the fund arrangement.'],
    ['records','Support the digital record','Technology / record provider','Provides token technology or operates the digital share record.']
  ];
  assert.ok(functions.every(([id])=>report.roles.some(role=>role.id===id)));
  let body='';
  functions.forEach(([,task,role,explanation],i)=>{
    const y=(mobile?260:222)+i*(mobile?260:154);
    body+=`<line x1="40" x2="${width-40}" y1="${y-28}" y2="${y-28}" stroke="#d7e1ea"/>`;
    body+=text(40,y+6,`0${i+1}`,mobile?26:20,'#2467aa',700);
    body+=lines(92,y+6,task,mobile?31:60,mobile?34:30,'#17304a',700);
    body+=text(92,y+(mobile?68:56),role,mobile?30:25,'#2467aa',700);
    body+=lines(92,y+(mobile?126:100),explanation,mobile?38:100,mobile?30:24,'#536479');
  });
  await output(1,frame(width,mobile?1500:960,1,'Four responsibilities behind a tokenized fund',body,'Illustrative responsibilities. One firm may perform several roles; exact duties vary by fund.'),suffix);

  const cases=[
    {id:'fobxx',title:'Franklin FOBXX',label:'An integrated record',description:'Book-entry and blockchain records are combined.',date:'SEC staff letter: 12 August 2026'},
    {id:'spiko-ustbl',title:'Spiko SICAV',label:'A distributed-ledger register',description:'The shareholder register uses distributed ledgers.',date:'Prospectus: 1 September 2026'},
    {id:'wtgxx',title:'WisdomTree fund suite',label:'An official offchain register',description:'Blockchain movements are reflected in the offchain register.',date:'Issuer regulatory information: checked 21 October 2026'}
  ];
  body='';
  cases.forEach((item,i)=>{
    const fund=report.funds.find(fund=>fund.id===item.id);
    const claim=fund.claims.find(claim=>claim.role==='records');assert.ok(claim);
    const y=(mobile?260:224)+i*(mobile?440:242);
    body+=`<line x1="40" x2="${width-40}" y1="${y-30}" y2="${y-30}" stroke="#d7e1ea"/>`;
    body+=text(40,y,item.title,mobile?36:31,'#2467aa',700);
    body+=text(40,y+(mobile?62:48),item.label,mobile?34:29,'#17304a',700);
    body+=lines(40,y+(mobile?124:94),item.description,mobile?38:95,mobile?32:26);
    body+=lines(40,y+(mobile?230:140),claim.provider,mobile?43:100,mobile?28:23,'#536479');
    body+=lines(40,y+(mobile?320:187),item.date,mobile?49:110,mobile?24:20,'#536479');
  });
  await output(2,frame(width,mobile?1760:1100,2,'The ownership record can take different forms',body,'Source: fund and issuer documents reviewed by FluidRWA. Descriptions are not legal conclusions.'),suffix);

  body=lines(40,mobile?244:210,'Products with a named provider in the documents reviewed',mobile?45:100,mobile?28:25,'#536479');
  const labels={records:'Digital records / token technology',transfer:'Transfer agency',custody:'Fund custody / depositary',administration:'Fund administration'};
  ['records','transfer','custody','administration'].forEach((id,i)=>{
    const count=report.funds.filter(fund=>fund.claims.some(claim=>claim.role===id)).length;
    const y=(mobile?340:284)+i*(mobile?160:139);
    body+=text(40,y,labels[id],mobile?32:29,'#17304a',700);
    body+=`<rect x="40" y="${y+26}" width="${width-190}" height="30" fill="#eaf1f7"/><rect x="40" y="${y+26}" width="${(width-190)*count/report.funds.length}" height="30" fill="#2467aa"/>`;
    body+=text(width-120,y+49,`${count}/20`,mobile?32:28,'#17304a',700);
  });
  await output(3,frame(width,mobile?1140:960,3,'Technology is only one part of the fund',body,'Source: FluidRWA, 21 October 2026. Selected documents for 20 products; not a market-wide measure.'),suffix);
}
async function output(number,svg,suffix){
  const file=`public/assets/infographics/${stem}-${number}${suffix}.png`;
  const png=await sharp(Buffer.from(svg)).png().toBuffer();
  if(process.argv.includes('--check'))assert.ok(fs.existsSync(file)&&fs.readFileSync(file).equals(png),`Stale exhibit: ${file}`);
  else fs.writeFileSync(file,png);
}
console.log('Editorial fund report: three exhibits, desktop and mobile, verified against the unchanged October dataset.');
