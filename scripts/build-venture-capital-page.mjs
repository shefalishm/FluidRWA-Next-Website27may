import fs from "node:fs";
import path from "node:path";

const firms = [
  ["ParaFi Capital","RWA-native","Early stage, growth, liquid","Not disclosed","DeFi, RWA and digital asset infrastructure","Both","Yes","USA","Centrifuge, Securitize, Superstate, Ethena, Fireblocks, Credix and Huma Finance","https://parafi.com"],
  ["SPiCE VC","RWA-native","Early stage","Investor minimum $250K","Tokenization, digital securities and blockchain infrastructure","Both","Not disclosed","Global","Securitize, Blockdaemon, Bakkt, INX, Archax and InvestaX","https://spicevc.com"],
  ["Borderless Capital","RWA-native","Seed through all stages","Specialized $10M vehicles historically","RWA, DePIN and the Algorand ecosystem","Both","Yes","USA / Global","Helium, Render, GEODNET, DIMO and Algorand ecosystem projects","https://borderlesscapital.io"],
  ["RW3 Ventures","RWA-native","Pre-seed to Series A","Not disclosed","Blockchain infrastructure, DeFi and financial services infrastructure","Both","Yes","USA","Mysten Labs, Figment, Rymedi and Breach","https://rw3.vc"],
  ["Blockchain Founders Fund","RWA-native","Pre-seed and seed","Not disclosed","Operator-led Web3, DeFi and asset tokenization","Both","Sometimes","Singapore / Global","Biconomy, Zoth, Arf, TransFi and Torram","https://blockchainff.com"],
  ["Lightspeed Faction","RWA-native","Early stage","Not disclosed","Blockchain infrastructure for financial services","Both","Yes","USA","Figure, Plume Network and Tres Finance","https://faction.vc"],
  ["Laser Digital","RWA-native","Early stage / strategic","Not disclosed","Institutional digital assets, RWA and custody","Both","Yes","Global","BounceBit, Plume Network, ClearToken, Komainu, Libre and Bastion","https://www.laserdigital.com"],
  ["10T Holdings","RWA-native","Mid to late stage","Not disclosed","Growth-stage digital asset companies with revenue","Equity","Yes","USA","Figure and Qredo","https://10tholdings.com"],
  ["Theta Capital Management","RWA-native","Fund of funds / LP","Allocates to 10–15 VC funds per fund","Blockchain venture fund-of-funds","Indirect","N/A","Europe","LP exposure to Pantera, Polychain, CoinFund, Dragonfly and ParaFi","https://www.thetacapital.com"],
  ["BH Digital","RWA-native","Multi-stage","Not disclosed","Institutional multi-strategy digital assets","Both","Yes","Global","Digital asset infrastructure and DeFi portfolio companies","https://www.brevanhoward.com"],
  ["a16z crypto","RWA-active generalist","Seed to growth","Varies, including large checks","Broad crypto, infrastructure, DeFi, stablecoins and RWA","Both","Yes","USA / Global","Coinbase, Uniswap, Solana, Kalshi, EigenLayer, Goldfinch and Flowcarbon","https://a16zcrypto.com"],
  ["Paradigm","RWA-active generalist","Pre-seed to multi-stage","Varies","Research-driven, thesis-led crypto investing","Both","Yes","USA / Global","Uniswap, Coinbase, Optimism, Phantom, Fireblocks and Kalshi","https://www.paradigm.xyz"],
  ["Pantera Capital","RWA-active generalist","Seed to growth, liquid","Varies","Blockchain and digital assets across venture and liquid strategies","Both","Yes","USA / Global","Ondo Finance, Circle, BitGo, Masterworks, M0 and Figure","https://panteracapital.com"],
  ["Polychain Capital","RWA-active generalist","Early stage, venture and liquid","Varies","Protocols, infrastructure and RWA tokenization","Both","Yes","USA / Global","Maple, Anchorage Digital, Noble, M0 and Polkadot","https://polychain.capital"],
  ["Framework Ventures","RWA-active generalist","Pre-seed to growth","$250K to $40M","DeFi, stablecoins, RWA, AI and infrastructure","Both","Yes","USA / Global","Chainlink, Aave, Synthetix, Midas and Space and Time","https://framework.ventures"],
  ["Dragonfly","RWA-active generalist","All stages","Scales to $50M+","Global crypto, payments, stablecoins and infrastructure","Both","Yes","Global / US / Asia","Polymarket, Ethena, Rain, Agora, Bybit and Matrixport","https://www.dragonfly.xyz"],
  ["Variant","RWA-active generalist","Pre-seed and seed","$250K to $750K typical","Ownership economy, DeFi and infrastructure","Both","Yes","USA / Global","Uniswap, Phantom, Morpho, Euler and World","https://variant.fund"],
  ["Blockchain Capital","RWA-active generalist","Early to late stage","Not disclosed","Crypto specialist across CeFi, DeFi and infrastructure","Both","Yes","USA / Global","Coinbase, Kraken, Securitize, Ondo Finance, Centrifuge and Aave","https://www.blockchaincapital.com"],
  ["Hack VC","RWA-active generalist","Seed","Not disclosed","Modular infrastructure and RWA-backed stablecoins","Both","Yes","USA / Global","Mysten Labs, Helium, Goldfinch and Compound","https://hack.vc"],
  ["1kx","RWA-active generalist","Seed to all stages","Seed range","Token-native network design and token economies","Both","Co-leads","Global","Arweave, Matter Labs, Safe, Superstate and Transak","https://1kx.network"],
  ["Multicoin Capital","Generalist","Early stage, venture and liquid","$1M to $50M","Thesis-driven infrastructure and DePIN","Both","Yes","USA / Global","Solana, Helium, The Graph and M0","https://multicoin.capital"],
  ["Electric Capital","Generalist","Early stage","Not disclosed","Data-driven, engineering-first crypto","Both","Yes","USA / Global","Infrastructure, banking and protocol investments","https://www.electriccapital.com"],
  ["Haun Ventures","RWA-active generalist","Seed to scale","Not disclosed","Future of finance, stablecoins, payments and DeFi","Both","Yes","USA / Global","Bridge, BVNK, Farcaster, Fireblocks and Agora","https://www.haun.co"],
  ["Coinbase Ventures","RWA-active generalist","Pre-seed and seed","Not disclosed","Broad cryptoeconomy and strategic early-stage investing","Both","Sometimes","Global","OpenSea, Uniswap, Centrifuge, Securitize, Ondo and Arbitrum","https://www.coinbase.com/ventures"],
  ["Galaxy Ventures","RWA-native","Early stage","Around $50M deployed at first close","Stablecoins, payments, tokenization and the onchain economy","Both","Yes","USA / Global","Ethena, Monad, M0, Plume, Arch Lending and Fireblocks","https://www.galaxy.com"],
  ["Bain Capital Crypto","RWA-native","Seed to growth","Not disclosed","Protocols, native tokens, DeFi and infrastructure","Both","Yes","USA / Global","M0, Superstate, World, Celestia and Scroll","https://baincapitalcrypto.com"],
  ["CoinFund","Generalist","Pre-seed to Series A, liquid","Not disclosed","Network lifecycle investing, DeFi, Web3 and stablecoins","Both","Yes","USA / Global","Solana, ether.fi, Dakota, Blockdaemon and LI.FI","https://www.coinfund.io"],
  ["Standard Crypto","Generalist","Seed and Series A","Not disclosed","Crypto networks before and after launch","Both","Yes","USA / Global","Mysten Labs, Sky Mavis, Farcaster and Walrus","https://www.standardcrypto.vc"],
  ["Mechanism Capital","Generalist","Early stage and secondaries","Not disclosed","DeFi-focused venture and liquid strategies","Both","Sometimes","Global","MakerDAO, Synthetix, Thorchain and Figure","https://www.mechanism.capital"],
  ["Robot Ventures","Generalist","Pre-seed and seed","$100K to $1M","Fintech and crypto / DeFi primitives","Both","Selectively","USA / Global","EigenLayer, Lido, Flashbots, UMA and Wildcat","https://robotventures.co"],
  ["Hashed","Generalist","Seed and Series A","Not disclosed","Global early-stage Web3, finance and gaming","Both","Yes","Asia / Global","Aptos, Ethena, Republic, Bastion and Synthetix","https://www.hashed.com"],
  ["HashKey Capital","RWA-active generalist","Multi-strategy venture and liquid","Not disclosed","Infrastructure, data, AI and TradFi-to-onchain assets","Both","Yes","Asia / Global","Early Ethereum and 400+ projects","https://www.hashkey.capital"],
  ["Digital Currency Group","Generalist","Seed to public","Not disclosed","Digital asset stack, fintech, tokenization and infrastructure","Both","Yes","USA / Global","Circle, Arch Finance and Anode Labs","https://dcg.co"],
  ["CMT Digital","Generalist","Early stage","Not disclosed","Blockchain technology, trading and legal / policy infrastructure","Both","Yes","USA / Global","150+ blockchain investments","https://www.cmtdigital.com"],
  ["Maven 11","Generalist","Pre-seed to Series A","$500K to $5M","DeFi, Web3 infrastructure and AI x crypto","Both","Yes","Europe / Global","GTE, August and Spire Labs","https://www.maven11.com"],
  ["Nascent","RWA-active generalist","Pre-seed to Series A, liquid","Not disclosed","Multi-strategy open finance and DeFi","Both","Yes","Global","Morpho, Aztec, Optimism, Flashbots and Superstate","https://www.nascent.xyz"],
  ["Lemniscap","Generalist","Early stage","$1M to $2M","Emerging cryptoassets, ZK, Bitcoin and DePIN","Both","Yes","Global","Avalanche, The Graph, EigenLayer and Monad","https://lemniscap.com"],
  ["Greenfield Capital","Generalist","Pre-seed and seed","Not disclosed","European crypto, DeFi and infrastructure","Both","Yes","Europe","1inch, Arweave and Arcium","https://greenfield-capital.com"],
  ["Fabric Ventures","Generalist","Early stage","Not disclosed","Europe-focused crypto and Web3","Both","Yes","Europe / Global","NEAR Protocol and European Web3 companies","https://www.fabric.vc"],
  ["Fenbushi Capital","Generalist","Early stage","Not disclosed","Blockchain-only venture investing","Both","Yes","Asia / Global","Broad blockchain portfolio","https://fenbushi.vc"],
  ["IOSG Ventures","Generalist","Early stage","Not disclosed","Research-driven infrastructure and DeFi","Both","Yes","Asia / Global","EigenLayer, Scroll, Connext and RISC Zero","https://iosg.vc"],
  ["The Spartan Group","Generalist","Early stage and advisory","Not disclosed","Web3 venture, DeFi, M&A and capital raises","Both","Yes","Asia / Global","Broad Web3 portfolio","https://www.spartangroup.io"],
  ["Foresight Ventures","Generalist","Early stage","Not disclosed","Early-stage crypto, infrastructure and consumer","Both","Yes","Asia / Global","Broad early-stage portfolio","https://www.foresightventures.com"],
  ["DWF Labs","RWA-active generalist","Multi-stage","Up to $50M+","Capital plus liquidity across RWA, infrastructure, DeFi and DePIN","Both","Yes","Global","TRON, Mantle, Falcon Finance, TON and Algorand","https://www.dwf-labs.com"],
  ["Founders Fund","RWA-active generalist","Early stage","Not disclosed","Transformative technology with selective crypto investments","Equity","Yes","USA / Global","Paxos, Schuman Financial and Ondo Finance","https://foundersfund.com"],
  ["Tribe Capital","Generalist","Pre-seed to Series B","$5M to $20M","Data-driven product-market fit and crypto","Both","Yes","USA / Global","Kraken, Berachain and Carv","https://tribecap.co"],
  ["Delphi Ventures","Generalist","Early stage","Not disclosed","Research-driven DeFi, infrastructure and gaming","Both","Co-invests","Global","Broad DeFi and infrastructure portfolio","https://delphiventures.io"],
  ["Outlier Ventures","Generalist","Accelerator and early stage","Not disclosed","Web3 accelerator and token design","Both","Sometimes","UK / Global","250+ accelerator alumni","https://outlierventures.io"],
  ["Castle Island Ventures","RWA-active generalist","Early stage","Not disclosed","Public blockchain infrastructure and stablecoins","Equity","Yes","USA / Global","Stablecoin and infrastructure companies","https://www.castleisland.vc"],
  ["Ribbit Capital","RWA-active generalist","Multi-stage","Not disclosed","Fintech and crypto convergence","Both","Yes","USA / Global","M0 and fintech / crypto companies","https://ribbitcapital.com"],
  ["Sequoia Capital","Generalist","Seed to growth","Varies","Generalist technology with crypto allocation","Both","Yes","Global","Broad crypto and technology portfolio","https://www.sequoiacap.com"],
  ["Archetype","Generalist","Early stage","Not disclosed","Early-stage crypto and infrastructure","Both","Yes","USA / Global","Infrastructure and DeFi companies","https://www.archetype.fund"],
  ["Bankless Ventures","Generalist","Pre-seed and seed","Not disclosed","Crypto-native consumer and infrastructure","Both","Sometimes","Global","Early-stage crypto companies","https://www.bankless.ventures"],
  ["Kraken Ventures","Generalist","Early stage","Not disclosed","Fintech and crypto infrastructure","Both","Sometimes","Global","Fintech and crypto infrastructure companies","https://www.krakenventures.com"],
  ["F-Prime Capital","RWA-active generalist","Early to growth","Not disclosed","Fintech, crypto and financial infrastructure","Both","Yes","USA / Global","BitGo and fintech / crypto companies","https://fprimecapital.com"],
  ["Union Square Ventures","Generalist","Early stage","Not disclosed","Thesis-driven Web3 and marketplaces","Both","Yes","USA / Global","Coinbase and Web3 companies","https://www.usv.com"],
  ["GSR Ventures","Generalist","Early stage","Not disclosed","Venture investing connected to market-making infrastructure","Both","Sometimes","Global","DeFi and infrastructure companies","https://www.gsr.io"],
  ["Wintermute Ventures","RWA-active generalist","Early stage","Not disclosed","Venture arm of a digital asset market maker","Both","Sometimes","Global","DeFi, infrastructure and Ondo Finance","https://www.wintermute.com"],
  ["Morgan Stanley Tactical Value","RWA-active generalist","Late stage / strategic","Not disclosed","Institutional strategic investing and tokenization","Equity","Co-led","Global","Securitize","https://www.morganstanley.com"]
];

const additionalFirms = [
  ["Placeholder VC","RWA-active generalist","Early stage","Not disclosed","Crypto networks, open financial systems and institutional-grade infrastructure","Both","Yes","USA / Global","Protocol, DeFi and infrastructure investments across public blockchain markets","https://www.placeholder.vc"],
  ["Arrington Capital","RWA-active generalist","Seed to growth, liquid","Not disclosed","Digital assets, DeFi, infrastructure and tokenized financial markets","Both","Yes","USA / Global","Algorand, Moonbeam, Centrifuge, Polkadot and digital asset infrastructure","https://www.arringtoncapital.com"],
  ["Hivemind Capital Partners","RWA-native","Multi-stage","Not disclosed","Institutional digital assets, blockchain infrastructure and tokenized finance","Both","Yes","USA / Global","Digital asset infrastructure, institutional finance and tokenization-related investments","https://www.hivemind.capital"],
  ["Liberty City Ventures","RWA-active generalist","Early stage to growth","Not disclosed","Blockchain, fintech, digital identity and financial market infrastructure","Both","Yes","USA / Global","Paxos, Lukka, Figment and financial infrastructure companies","https://www.libertycityventures.com"],
  ["CMCC Global","RWA-active generalist","Early stage, liquid and fund-of-funds","Not disclosed","Asia-led blockchain infrastructure, DeFi and digital asset networks","Both","Yes","Asia / Global","Animoca Brands, Solana, Cosmos, Ethereum and Hong Kong digital asset infrastructure","https://www.cmcc.vc"],
  ["Kenetic Capital","Generalist","Early stage and liquid","Not disclosed","Blockchain companies, token networks and Asian digital asset infrastructure","Both","Sometimes","Asia / Global","Portfolio exposure across exchanges, infrastructure, DeFi and token networks","https://kenetic.capital"],
  ["DeFiance Capital","Generalist","Early stage and liquid","Not disclosed","DeFi, open finance, gaming and Web3 infrastructure","Both","Yes","Asia / Global","DeFi protocols, infrastructure projects and token networks","https://www.defiance.capital"],
  ["Hypersphere Ventures","Generalist","Early stage","Not disclosed","Blockchain infrastructure, protocols and open financial systems","Both","Yes","USA / Global","Polkadot ecosystem, DeFi and infrastructure networks","https://www.hypersphere.ventures"],
  ["Sfermion","Generalist","Early stage","Not disclosed","Web3 infrastructure, gaming, NFTs and consumer crypto","Both","Yes","USA / Global","Web3 gaming, NFT infrastructure, consumer crypto and protocol companies","https://www.sfermion.com"],
  ["Reciprocal Ventures","Generalist","Early stage","Not disclosed","Crypto-native infrastructure, fintech and protocol networks","Both","Yes","USA / Global","Solana, The Graph, EigenLayer and crypto infrastructure companies","https://www.reciprocal.vc"],
  ["Volt Capital","Generalist","Pre-seed and seed","Not disclosed","Crypto infrastructure, DeFi and developer tooling","Both","Yes","USA / Global","Early-stage crypto infrastructure and protocol companies","https://volt.capital"],
  ["Chapter One","Generalist","Pre-seed and seed","Not disclosed","Crypto, Web3 consumer, infrastructure and ownership networks","Both","Yes","USA / Global","Early-stage Web3 companies, wallets, consumer products and infrastructure","https://chapterone.com"],
  ["6th Man Ventures","Generalist","Pre-seed and seed","Not disclosed","Web3 infrastructure, applications and consumer crypto","Both","Yes","USA / Global","Early-stage crypto and Web3 companies across infrastructure and applications","https://www.6thman.ventures"],
  ["Collab+Currency","Generalist","Pre-seed and seed","Not disclosed","Crypto culture, NFTs, consumer networks and blockchain infrastructure","Both","Yes","USA / Global","Consumer crypto, creator networks, NFT infrastructure and Web3 communities","https://collabcurrency.com"],
  ["Decasonic","RWA-active generalist","Pre-seed to Series A","Not disclosed","Blockchain, digital assets, AI and financial infrastructure","Both","Yes","USA / Global","Web3, DeFi, digital asset infrastructure and enterprise blockchain companies","https://www.decasonic.com"],
  ["White Star Capital","RWA-active generalist","Seed to Series B","Not disclosed","Digital assets, fintech and global technology platforms","Both","Yes","North America / Europe / Asia","Digital asset fund investments across DeFi, infrastructure and financial technology","https://www.whitestarcapital.com"],
  ["RockawayX","Generalist","Early stage","Not disclosed","Crypto infrastructure, DeFi and Web3 networks","Both","Yes","Europe / Global","Solana, 1inch, Axelar and crypto infrastructure portfolio companies","https://rockawayx.com"],
  ["Zee Prime Capital","Generalist","Early stage and liquid","Not disclosed","Crypto-native protocols, infrastructure and DeFi","Both","Sometimes","Europe / Global","DeFi, infrastructure and token network investments","https://zeeprime.capital"],
  ["Eden Block","Generalist","Early stage","Not disclosed","Web3 infrastructure, DeFi, wallets and digital ownership","Both","Yes","Europe / Global","Blockchain infrastructure, Web3 security, DeFi and wallet companies","https://www.edenblock.com"],
  ["KR1","Generalist","Early stage and liquid","Not disclosed","Blockchain networks, staking, DeFi and protocol infrastructure","Both","Sometimes","Europe / Global","Polkadot, Cosmos, Ethereum ecosystem and protocol networks","https://www.kr1.io"],
  ["Lattice Fund","Generalist","Pre-seed and seed","Not disclosed","Crypto networks, developer infrastructure and decentralized applications","Both","Yes","USA / Global","Early-stage crypto infrastructure and protocol investments","https://lattice.fund"],
  ["BlockTower Capital","RWA-active generalist","Early stage, liquid and credit","Not disclosed","Digital assets, DeFi, institutional credit and blockchain markets","Both","Yes","USA / Global","Digital asset strategies, DeFi, credit and infrastructure investments","https://www.blocktower.com"],
  ["Digital Finance Group","Generalist","Early stage and strategic","Not disclosed","Blockchain infrastructure, CeFi, DeFi and Web3 applications","Both","Yes","Asia / Global","LedgerX, Circle, Polkadot, ChainSafe and digital asset companies","https://www.dfg.group"],
  ["Draper Dragon","Generalist","Seed to growth","Not disclosed","Cross-border technology, blockchain, Web3 and fintech","Both","Yes","USA / Asia","IoTeX, Ledger and blockchain infrastructure investments","https://www.draperdragon.com"],
  ["Draper Associates","RWA-active generalist","Seed and Series A","Not disclosed","Transformational technology, Bitcoin, crypto and fintech infrastructure","Both","Yes","USA / Global","Coinbase, Ledger, Tezos and crypto / fintech companies","https://www.draper.vc"],
  ["Boost VC","Generalist","Pre-seed and seed","Not disclosed","Deep tech, crypto, AI and frontier technology startups","Both","Yes","USA / Global","Coinbase, Etherscan, Ledger and early crypto companies","https://www.boost.vc"],
  ["LongHash Ventures","Generalist","Pre-seed and seed","Not disclosed","Web3 infrastructure, DeFi, consumer crypto and Asia-led blockchain ecosystems","Both","Yes","Asia / Global","Early-stage Web3 startups and accelerator-backed crypto companies","https://www.longhash.vc"],
  ["gumi Cryptos Capital","Generalist","Early stage","Not disclosed","Blockchain infrastructure, gaming, DeFi and token networks","Both","Yes","USA / Japan / Global","OpenSea, Yield Guild Games, Qredo and crypto infrastructure companies","https://www.gumi-cryptos.com"],
  ["Signum Capital","Generalist","Early stage","Not disclosed","Blockchain protocols, DeFi, infrastructure and token networks","Both","Sometimes","Asia / Global","Layer 1, DeFi, infrastructure and Web3 ecosystem investments","https://signum.capital"],
  ["CMS Holdings","Generalist","Early stage and liquid","Not disclosed","Crypto-native investment across DeFi, infrastructure and token networks","Both","Sometimes","USA / Global","DeFi protocols, liquid tokens and early-stage crypto companies","https://cmsholdings.io"],
  ["Distributed Global","Generalist","Early stage","Not disclosed","Blockchain protocols, digital asset infrastructure and open networks","Both","Yes","USA / Global","Solana, Dapper Labs and protocol infrastructure investments","https://distributedglobal.com"],
  ["OP Crypto","Generalist","Pre-seed to Series A","Not disclosed","Web3 infrastructure, DeFi, consumer crypto and emerging markets","Both","Yes","Global","Early-stage Web3 and infrastructure portfolio companies","https://opcrypto.vc"],
  ["Ascensive Assets","Generalist","Early stage","Not disclosed","DeFi, infrastructure, consumer crypto and token networks","Both","Sometimes","USA / Global","Early-stage crypto networks, DeFi and Web3 companies","https://www.ascensiveassets.com"],
  ["Maelstrom","Generalist","Early stage and liquid","Not disclosed","Bitcoin, decentralized finance, infrastructure and crypto-native markets","Both","Sometimes","Global","Crypto infrastructure, DeFi and Bitcoin-related investments","https://maelstrom.fund"],
  ["GBV Capital","Generalist","Early stage","Not disclosed","Web3 infrastructure, DeFi, gaming and blockchain applications","Both","Yes","Asia / Global","Early-stage Web3 and protocol investments","https://gbv.capital"],
  ["Jsquare","Generalist","Early stage","Not disclosed","Blockchain infrastructure, DeFi, metaverse and Web3 applications","Both","Yes","Asia / Global","Digital asset infrastructure, DeFi and Web3 ecosystem companies","https://www.jsquare.co"],
  ["Everest Ventures Group","Generalist","Venture studio and early stage","Not disclosed","Asia-focused Web3, fintech and blockchain venture building","Both","Yes","Asia / Global","Web3 venture studio companies and infrastructure investments","https://www.evg.co"],
  ["Ryze Labs","Generalist","Early stage","Not disclosed","Emerging markets, Web3 infrastructure and consumer blockchain adoption","Both","Yes","Asia / Global","Former Sino Global Capital network with Web3 and infrastructure investments","https://www.ryzelabs.com"],
  ["Primitive Ventures","Generalist","Early stage","Not disclosed","Crypto infrastructure, DeFi, social, privacy and token networks","Both","Sometimes","Asia / Global","Early crypto protocols, infrastructure and network investments","https://primitive.ventures"],
  ["SNZ Holding","Generalist","Early stage","Not disclosed","Blockchain infrastructure, DeFi, layer 1 ecosystems and token networks","Both","Sometimes","Asia / Global","Ethereum ecosystem, DeFi and public blockchain infrastructure","https://snzholding.com"],
  ["Hash Global","Generalist","Early stage","Not disclosed","Web3 infrastructure, DeFi and blockchain applications","Both","Yes","Asia / Global","Infrastructure, DeFi and Web3 portfolio companies","https://www.hashglobal.io"],
  ["Fundamental Labs","Generalist","Early stage","Not disclosed","Blockchain infrastructure, CeFi, DeFi and token networks","Both","Yes","Asia / Global","Coinbase, Binance, Polkadot and crypto infrastructure investments","https://fundamentallabs.com"],
  ["Incuba Alpha","Generalist","Early stage","Not disclosed","DeFi, Web3 infrastructure, derivatives and protocol networks","Both","Sometimes","Asia / Global","DeFi protocols, derivatives infrastructure and Web3 products","https://www.incubaalpha.com"],
  ["Red Beard Ventures","Generalist","Pre-seed and seed","Not disclosed","Web3, consumer crypto, infrastructure and digital ownership","Both","Yes","USA / Global","Early-stage Web3 companies and token networks","https://redbeard.ventures"],
  ["Monday Capital","Generalist","Early stage","Not disclosed","Blockchain infrastructure, DeFi and digital asset networks","Both","Sometimes","USA / Global","DeFi, infrastructure and protocol investments","https://www.monday.capital"],
  ["Big Brain Holdings","Generalist","Early stage","Not disclosed","Crypto-native venture across DeFi, gaming, infrastructure and token networks","Both","Sometimes","USA / Global","Solana ecosystem, DeFi and infrastructure companies","https://www.bigbrain.holdings"],
  ["MH Ventures","Generalist","Early stage","Not disclosed","Web3 infrastructure, DeFi, gaming and blockchain applications","Both","Sometimes","Global","Early-stage crypto and Web3 investments","https://www.mhventures.io"],
  ["Contango Digital Assets","Generalist","Early stage","Not disclosed","Digital asset venture, DeFi, infrastructure and gaming","Both","Sometimes","Global","Early-stage Web3 and blockchain infrastructure investments","https://www.contango.digital"],
  ["Rarestone Capital","Generalist","Early stage","Not disclosed","DeFi, infrastructure, gaming and Web3 applications","Both","Sometimes","Global","Early-stage token networks and Web3 companies","https://rarestone.capital"],
  ["Blockchange Ventures","RWA-active generalist","Early stage","Not disclosed","Blockchain infrastructure, enterprise adoption and digital asset networks","Both","Yes","USA / Global","Digital asset infrastructure, enterprise blockchain and crypto companies","https://www.blockchange.vc"],
  ["Tykhe Block Ventures","Generalist","Early stage","Not disclosed","Blockchain infrastructure, DeFi and Web3 companies","Both","Sometimes","Asia / Global","Early-stage token networks and infrastructure investments","https://www.tykheblock.ventures"],
  ["M31 Capital","Generalist","Early stage and liquid","Not disclosed","Crypto networks, DeFi, staking and blockchain infrastructure","Both","Sometimes","USA / Global","Digital asset networks, staking and protocol investments","https://m31.capital"],
  ["Woodstock Fund","Generalist","Early stage","Not disclosed","Web3 infrastructure, DeFi, gaming and decentralized technologies","Both","Yes","India / Global","Web3, DeFi and infrastructure companies","https://www.woodstockfund.com"],
  ["AlphaLab Capital","Generalist","Early stage and liquid","Not disclosed","Quantitative digital asset strategies and crypto venture investing","Both","Sometimes","Global","DeFi, infrastructure and trading ecosystem investments","https://www.alphalab.capital"],
  ["Winklevoss Capital","RWA-active generalist","Seed to growth","Not disclosed","Bitcoin, fintech, crypto infrastructure and Web3 companies","Both","Yes","USA / Global","Gemini, BlockFi, Filecoin, Nifty Gateway and crypto companies","https://winklevosscapital.com"],
  ["Alumni Ventures Blockchain Fund","RWA-active generalist","Seed to growth","Not disclosed","Blockchain, crypto, fintech and Web3 infrastructure","Equity","Co-invests","USA","Syndicated venture exposure to blockchain and crypto startups","https://www.av.vc/funds/blockchain-fund"],
  ["Bloccelerate VC","RWA-active generalist","Seed to Series A","Not disclosed","Enterprise blockchain, digital assets, payments and financial infrastructure","Both","Yes","USA / Global","Blockchain infrastructure, enterprise adoption and Web3 companies","https://www.bloccelerate.vc"],
  ["Draper Goren Blockchain","Generalist","Pre-seed and seed","Not disclosed","Blockchain startups, Web3 infrastructure and token networks","Both","Sometimes","USA / Global","Early-stage blockchain and digital asset companies","https://drapergorenblockchain.com"],
  ["AU21 Capital","Generalist","Early stage","Not disclosed","Blockchain infrastructure, DeFi, gaming and token networks","Both","Sometimes","Global","Early-stage crypto and Web3 portfolio companies","https://au21.capital"],
  ["LD Capital","Generalist","Early stage and liquid","Not disclosed","Blockchain infrastructure, DeFi, trading, gaming and Web3 applications","Both","Yes","Asia / Global","Layer 1, DeFi, infrastructure and token network investments","https://ldcap.com"],
  ["Bixin Ventures","Generalist","Early stage","Not disclosed","Infrastructure, DeFi, Bitcoin ecosystem and Web3 networks","Both","Sometimes","Asia / Global","DeFi, infrastructure and Bitcoin-related crypto investments","https://bixinventures.com"],
  ["ViaBTC Capital","Generalist","Early stage","Not disclosed","Blockchain infrastructure, Web3 applications and crypto ecosystem companies","Both","Sometimes","Asia / Global","Crypto infrastructure, DeFi and Web3 companies","https://www.viabtc.com/capital"],
  ["KuCoin Ventures","Generalist","Early stage and strategic","Not disclosed","Web3, DeFi, GameFi, infrastructure and exchange ecosystem investments","Both","Sometimes","Global","Early-stage crypto companies and exchange ecosystem investments","https://www.kucoin.com/ventures"],
  ["Gate Ventures","Generalist","Early stage and strategic","Not disclosed","Blockchain infrastructure, DeFi, Web3 and exchange ecosystem investments","Both","Sometimes","Global","Crypto infrastructure, applications and ecosystem companies","https://www.gate.io/ventures"],
  ["HTX Ventures","Generalist","Early stage and strategic","Not disclosed","Blockchain infrastructure, DeFi, AI x crypto and exchange ecosystem investments","Both","Sometimes","Global","Web3 infrastructure, DeFi and exchange ecosystem companies","https://www.htx.com/ventures"],
  ["Polygon Ventures","Generalist","Early stage and strategic","Not disclosed","Polygon ecosystem, scaling infrastructure, DeFi and applications","Both","Sometimes","Global","Polygon ecosystem companies, ZK infrastructure and Web3 applications","https://polygon.technology"],
  ["Solana Ventures","Generalist","Early stage and strategic","Not disclosed","Solana ecosystem infrastructure, payments, DeFi and consumer applications","Both","Sometimes","Global","Solana ecosystem companies and developer infrastructure","https://solana.com"],
  ["The LAO","Generalist","Early stage DAO investing","Not disclosed","Crypto-native venture DAO for Ethereum and Web3 projects","Both","Co-invests","Global","Ethereum ecosystem, DeFi and Web3 investments","https://www.thelao.io"],
  ["MetaCartel Ventures","Generalist","Pre-seed and seed DAO investing","Not disclosed","Ethereum applications, DAOs, DeFi and consumer crypto","Both","Co-invests","Global","DAO-led early-stage Web3 investments","https://metacartel.xyz"],
  ["Orange DAO","Generalist","Pre-seed and seed","Not disclosed","Web3 startups founded by alumni networks and crypto-native builders","Both","Co-invests","USA / Global","Early-stage Web3 and crypto startup investments","https://www.orangedao.xyz"],
  ["Seed Club Ventures","Generalist","Pre-seed and seed","Not disclosed","Consumer crypto, communities, networks and Web3 applications","Both","Sometimes","Global","Web3 communities, creator networks and consumer crypto companies","https://www.seedclub.ventures"],
  ["Cypher Capital","RWA-active generalist","Early stage","Not disclosed","Web3 infrastructure, DeFi, digital assets and blockchain applications","Both","Yes","UAE / Global","Blockchain infrastructure, DeFi and MENA digital asset companies","https://cyphercapital.com"],
  ["Morningstar Ventures","Generalist","Early stage","Not disclosed","Digital assets, gaming, infrastructure and Web3 ecosystems","Both","Yes","UAE / Global","Elrond / MultiversX ecosystem, DeFi and Web3 investments","https://morningstar.ventures"],
  ["Coin98 Ventures","Generalist","Early stage","Not disclosed","DeFi, infrastructure, wallets and Asian Web3 adoption","Both","Sometimes","Asia / Global","Web3 infrastructure, DeFi and crypto application companies","https://www.coin98.ventures"],
  ["ROK Capital","Generalist","Early stage","Not disclosed","Asia-focused blockchain infrastructure and Web3 companies","Both","Sometimes","Asia / Global","Layer 1, DeFi and Web3 infrastructure investments","https://rok.capital"],
  ["Paper Ventures","Generalist","Early stage","Not disclosed","Web3 infrastructure, DeFi, gaming and consumer crypto","Both","Yes","Global","Early-stage crypto and blockchain infrastructure companies","https://paperventures.io"],
  ["Eterna Capital","Generalist","Early stage","Not disclosed","Blockchain technology, DeFi and Web3 infrastructure","Both","Sometimes","Europe / Global","Blockchain infrastructure and early Web3 companies","https://www.eternacapital.com"],
  ["Tioga Capital","Generalist","Early stage","Not disclosed","European Web3 infrastructure, DeFi and digital ownership","Both","Yes","Europe / Global","Web3 infrastructure, wallets and DeFi companies","https://www.tioga.capital"],
  ["LeadBlock Partners","RWA-active generalist","Seed to Series A","Not disclosed","Digital assets, enterprise blockchain, fintech and infrastructure","Both","Yes","Europe / Global","Enterprise blockchain, digital asset and infrastructure companies","https://www.leadblockpartners.com"],
  ["Bering Waters Ventures","Generalist","Early stage and liquid","Not disclosed","Digital assets, DeFi, infrastructure and token networks","Both","Sometimes","Global","Crypto-native venture and liquid digital asset investments","https://beringwaters.com"],
  ["Dialectic","Generalist","Early stage and liquid","Not disclosed","Crypto-native venture, protocol networks and digital asset strategies","Both","Sometimes","Global","Web3 infrastructure, DeFi and token network investments","https://dialectic.ch"],
  ["Sora Ventures","Generalist","Early stage","Not disclosed","Asia-focused blockchain infrastructure, Bitcoin ecosystem and Web3 media","Both","Sometimes","Asia / Global","Bitcoin ecosystem, blockchain infrastructure and Web3 portfolio companies","https://sora.vc"],
  ["Alchemy Ventures","Generalist","Early stage and strategic","Not disclosed","Developer infrastructure, Web3 applications and ecosystem companies","Both","Sometimes","USA / Global","Alchemy ecosystem, developer tools and infrastructure companies","https://www.alchemy.com/ventures"],
  ["Consensys Mesh","RWA-active generalist","Venture studio and early stage","Not disclosed","Ethereum infrastructure, wallets, DeFi and institutional blockchain products","Both","Sometimes","USA / Global","MetaMask ecosystem, Ethereum infrastructure and venture studio companies","https://mesh.xyz"],
  ["True Global Ventures","RWA-active generalist","Growth and late stage","Not disclosed","Blockchain, AI, fintech and Web3 companies","Equity","Yes","Global","Animoca Brands, The Sandbox and Web3 growth companies","https://www.tgv4plus.com"],
  ["Shorooq Partners","RWA-active generalist","Seed to growth","Not disclosed","Fintech, digital assets and Middle East technology platforms","Equity","Yes","MENA / Global","Regional fintech, digital asset and infrastructure companies","https://shorooq.com"],
  ["Runa Capital","Generalist","Seed to Series B","Not disclosed","Enterprise software, open source, fintech and selective Web3 infrastructure","Equity","Yes","USA / Europe","Technology, open-source and infrastructure companies with selective crypto exposure","https://runacap.com"],
  ["Spark Capital","Generalist","Seed to growth","Not disclosed","Technology platforms, consumer networks and selective crypto infrastructure","Equity","Yes","USA / Global","Coinbase and selective crypto / fintech investments","https://www.sparkcapital.com"],
  ["Initialized Capital","Generalist","Pre-seed to Series A","Not disclosed","Early-stage technology, fintech and crypto-enabled infrastructure","Equity","Yes","USA / Global","Coinbase and early-stage technology companies","https://initialized.com"],
  ["Bessemer Venture Partners","RWA-active generalist","Seed to growth","Not disclosed","Cloud, fintech, marketplaces and selective crypto / infrastructure","Equity","Yes","USA / Global","Institutional technology, fintech and selective blockchain exposure","https://www.bvp.com"],
  ["Coatue","RWA-active generalist","Growth","Not disclosed","Technology growth investing, fintech and selective digital asset companies","Equity","Yes","USA / Global","Technology, fintech and crypto market infrastructure investments","https://www.coatue.com"],
  ["Thrive Capital","RWA-active generalist","Seed to growth","Not disclosed","Technology, fintech, AI and selective crypto infrastructure","Equity","Yes","USA / Global","Stripe, OpenAI, fintech and selective crypto investments","https://www.thrivecap.com"],
  ["General Catalyst","RWA-active generalist","Seed to growth","Not disclosed","Fintech, enterprise technology, AI and digital transformation","Equity","Yes","USA / Global","Circle, Stripe and financial infrastructure companies","https://www.generalcatalyst.com"],
  ["Khosla Ventures","RWA-active generalist","Seed to growth","Not disclosed","Frontier technology, fintech, AI and selective crypto infrastructure","Equity","Yes","USA / Global","Early technology, AI, fintech and blockchain-adjacent infrastructure","https://www.khoslaventures.com"],
  ["Slow Ventures","Generalist","Seed and Series A","Not disclosed","Consumer, fintech and selective crypto networks","Equity","Yes","USA / Global","Early-stage technology and crypto-enabled consumer companies","https://slow.co"],
  ["Craft Ventures","RWA-active generalist","Seed to growth","Not disclosed","B2B software, fintech and crypto-enabled infrastructure","Equity","Yes","USA / Global","Technology, SaaS, fintech and digital asset market companies","https://www.craftventures.com"],
  ["Lightspeed Venture Partners","RWA-active generalist","Seed to growth","Not disclosed","Global technology, fintech, crypto and infrastructure","Both","Yes","Global","FTX exposure historically, blockchain and infrastructure portfolio through crypto strategy","https://lsvp.com"],
  ["PayPal Ventures","RWA-active generalist","Strategic early to growth","Not disclosed","Payments, stablecoins, fintech and commerce infrastructure","Equity","Yes","USA / Global","Payments, fintech, crypto and commerce infrastructure investments","https://www.paypal.vc"],
  ["Visa Ventures","RWA-active generalist","Strategic early to growth","Not disclosed","Payments, fintech, stablecoins and financial infrastructure","Equity","Sometimes","Global","Payments, fintech and digital asset infrastructure investments","https://usa.visa.com/about-visa/ventures.html"],
  ["SC Ventures","RWA-native","Venture building and strategic investing","Not disclosed","Digital assets, tokenization, banking infrastructure and fintech ventures","Equity","Yes","Global","Zodia Custody, Zodia Markets and digital asset banking infrastructure","https://scventures.io"]
];

firms.push(...additionalFirms);

const esc = (value = "") => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const instrumentKey = (value) => value.toLowerCase().includes("both") ? "both" : value.toLowerCase().includes("equity") ? "equity" : value.toLowerCase().includes("indirect") ? "indirect" : "token";
const stageKey = (value) => value.toLowerCase().includes("pre-seed") ? "pre-seed" : value.toLowerCase().includes("seed") ? "seed" : value.toLowerCase().includes("late") || value.toLowerCase().includes("growth") ? "growth" : value.toLowerCase().includes("multi") || value.toLowerCase().includes("all") ? "multi-stage" : "early-stage";
const geographyKey = (value) => value.toLowerCase().includes("asia") ? "asia" : value.toLowerCase().includes("europe") || value.toLowerCase().includes("uk") ? "europe" : value.toLowerCase().includes("usa") ? "north-america" : "global";
const checkKey = (value) => value.includes("$100K") || value.includes("$250K") || value.includes("$500K") || value.includes("$1M to $2M") ? "under-2m" : value.includes("$5M") || value.includes("$10M") || value.includes("$20M") ? "2m-20m" : value.includes("$40M") || value.includes("$50M") ? "20m-plus" : "not-disclosed";

const cards = firms.map((firm, index) => {
  const [name, type, stage, check, thesis, instrument, lead, geography, portfolio, url] = firm;
  return `<article class="vc-firm-card reveal" id="${slugify(name)}" itemscope itemtype="https://schema.org/Organization" data-type="${slugify(type)}" data-stage="${stageKey(stage)}" data-check="${checkKey(check)}" data-instrument="${instrumentKey(instrument)}" data-geography="${geographyKey(geography)}" data-search="${esc(`${name} ${type} ${stage} ${check} ${thesis} ${instrument} ${lead} ${geography} ${portfolio}`.toLowerCase())}">
    <div class="vc-firm-top"><span>${String(index + 1).padStart(2, "0")}</span><div><p>${esc(type)}</p><h3 itemprop="name">${esc(name)}</h3></div></div>
    <p class="vc-thesis"><strong>Investment thesis</strong>${esc(thesis)}</p>
    <dl class="vc-facts">
      <div><dt>Stage</dt><dd>${esc(stage)}</dd></div>
      <div><dt>Check size</dt><dd>${esc(check)}</dd></div>
      <div><dt>Instrument</dt><dd>${esc(instrument)}</dd></div>
      <div><dt>Can lead?</dt><dd>${esc(lead)}</dd></div>
      <div><dt>Geography</dt><dd>${esc(geography)}</dd></div>
    </dl>
    <p class="vc-portfolio"><strong>Relevant portfolio signals</strong>${esc(portfolio)}</p>
    <a href="${esc(url)}" target="_blank" rel="noopener noreferrer nofollow" itemprop="url">Visit firm website</a>
  </article>`;
}).join("\n");

const listJson = firms.map((firm, index) => ({
  "@type": "ListItem",
  position: index + 1,
  url: `https://www.fluidrwa.com/vendors/venture-capital#${slugify(firm[0])}`,
  item: {
    "@type": "Organization",
    name: firm[0],
    url: firm[9],
    description: `${firm[1]} venture capital firm investing across ${firm[4].toLowerCase()}.`,
    areaServed: firm[7],
    knowsAbout: [firm[1], firm[2], firm[4], firm[5], firm[6]]
  }
}));

const faq = [
  ["What venture capital firms invest in RWA and tokenization?","RWA and tokenization investors range from thesis-driven specialists such as ParaFi Capital, SPiCE VC and Borderless Capital to large crypto funds such as Pantera Capital, Blockchain Capital, Framework Ventures and Coinbase Ventures. Fit depends on stage, check size, instrument and thesis."],
  ["How should a Web3 project choose a venture capital firm?","Start with the firm's stage, typical check size, investment thesis, ability to lead and follow on, portfolio conflicts, geography and whether it invests through equity, tokens or both. Founder references from existing portfolio companies are also important."],
  ["Do crypto venture capital firms invest through equity or tokens?","Many crypto-native venture firms invest through both equity and tokens. The structure affects governance, liquidity, fundraising documents and the type of diligence required, so projects should clarify instrument fit before pitching."],
  ["What is the difference between an RWA-native fund and a generalist crypto VC?","RWA-native funds make tokenization, digital securities, stablecoins or real-world asset infrastructure a central part of their thesis. Generalist crypto funds may invest in the category selectively as part of a broader portfolio."],
  ["Can FluidRWA match projects with relevant venture capital firms?","Projects can submit their raise, stage, target check size, geography and thesis. FluidRWA uses those requirements to help identify firms that appear relevant for further diligence and outreach."]
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.fluidrwa.com/vendors/venture-capital#webpage",
      url: "https://www.fluidrwa.com/vendors/venture-capital",
      name: "RWA and Web3 Venture Capital Firms | FluidRWA",
      description: "Find venture capital firms backing RWA, tokenization, and Web3 infrastructure. Compare crypto VCs by stage, check size, and investment thesis.",
      inLanguage: "en",
      dateModified: "2026-06-14",
      mainEntity: { "@id": "https://www.fluidrwa.com/vendors/venture-capital#firms" }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.fluidrwa.com/" },
        { "@type": "ListItem", position: 2, name: "Vendor Ecosystem", item: "https://www.fluidrwa.com/web3vendorecosystem" },
        { "@type": "ListItem", position: 3, name: "Venture Capital", item: "https://www.fluidrwa.com/vendors/venture-capital" }
      ]
    },
    { "@type": "ItemList", "@id": "https://www.fluidrwa.com/vendors/venture-capital#firms", name: "RWA and Web3 Venture Capital Firms", numberOfItems: firms.length, itemListElement: listJson },
    { "@type": "FAQPage", mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }
  ]
};

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>RWA and Web3 Venture Capital Firms | FluidRWA</title>
  <meta name="description" content="Find venture capital firms backing RWA, tokenization, and Web3 infrastructure. Compare crypto VCs by stage, check size, and investment thesis.">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="https://www.fluidrwa.com/vendors/venture-capital">
  <link rel="stylesheet" href="../../assets/styles-yellow-blue.css">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="FluidRWA">
  <meta property="og:title" content="RWA and Web3 Venture Capital Firms | FluidRWA">
  <meta property="og:description" content="Compare venture capital firms backing RWA, tokenization and Web3 infrastructure by stage, check size and investment thesis.">
  <meta property="og:url" content="https://www.fluidrwa.com/vendors/venture-capital">
  <meta property="og:image" content="https://www.fluidrwa.com/assets/social/vendor-ecosystem.png">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <style>
    .vc-page{--vc-plum:#58466f;--vc-blue:#3269a8;--vc-lilac:#eee9fb;--vc-mint:#e8f7f2;--vc-peach:#fff1e7;background:linear-gradient(180deg,#fffaf1 0%,#f7fbff 28%,#fffaf2 100%);color:#12213a}
    .vc-hero{position:relative;overflow:hidden;padding:112px 0 74px;background:radial-gradient(circle at 86% 15%,rgba(203,190,239,.72),transparent 32%),radial-gradient(circle at 8% 84%,rgba(198,239,226,.78),transparent 34%),linear-gradient(135deg,#fff7e5,#f6f2ff 58%,#eaf8ff)}
    .vc-hero:after{content:"";position:absolute;inset:auto -8% -45% 40%;height:420px;border:1px solid rgba(88,70,111,.12);border-radius:50%;box-shadow:0 0 0 45px rgba(88,70,111,.025),0 0 0 90px rgba(50,105,168,.025);pointer-events:none}
    .vc-hero-grid{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(300px,.7fr);gap:54px;align-items:end}
    .vc-hero h1,.vc-section h2{font-family:var(--fluid-display);letter-spacing:0;color:#12213a}.vc-hero h1{max-width:760px;margin:14px 0 20px;font-size:clamp(46px,6.4vw,86px);line-height:.98}.vc-hero-copy>p:not(.eyebrow){max-width:760px;color:#56647a;font-size:18px;line-height:1.7}.vc-hero .hero-actions{margin-top:28px}
    .vc-capital-stack{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;transform:perspective(800px) rotateY(-6deg) rotateX(3deg)}.vc-capital-stack div{min-height:138px;padding:22px;border:1px solid rgba(88,70,111,.14);border-radius:22px;background:rgba(255,255,255,.7);box-shadow:0 22px 60px rgba(63,49,83,.12);backdrop-filter:blur(18px)}.vc-capital-stack strong{display:block;color:var(--vc-plum);font-family:var(--fluid-display);font-size:40px;line-height:1}.vc-capital-stack span{display:block;margin-top:9px;color:#657086;font-size:11px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
    .vc-section{padding:76px 0}.vc-section-head{max-width:850px;margin-bottom:28px}.vc-section-head h2{margin:8px 0 12px;font-size:clamp(34px,4.6vw,58px);line-height:1.05}.vc-section-head p{color:#657086;line-height:1.68}
    .vc-difference-grid,.vc-check-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.vc-difference-card,.vc-check-grid article{padding:24px;border:1px solid rgba(88,70,111,.13);border-radius:22px;background:rgba(255,255,255,.78);box-shadow:0 18px 50px rgba(42,48,74,.07)}.vc-difference-card:nth-child(3n+1){background:linear-gradient(145deg,#fff,#f1ecff)}.vc-difference-card:nth-child(3n+2){background:linear-gradient(145deg,#fff,#eaf9f5)}.vc-difference-card:nth-child(3n){background:linear-gradient(145deg,#fff,#fff0e5)}.vc-difference-card span,.vc-check-grid span{color:var(--vc-blue);font-size:11px;font-weight:950;letter-spacing:.12em}.vc-difference-card h3,.vc-check-grid h3{margin:13px 0 9px;font-family:var(--fluid-display);font-size:25px}.vc-difference-card p,.vc-check-grid p{margin:0;color:#657086;line-height:1.62}
    .vc-directory{background:linear-gradient(180deg,rgba(237,232,250,.72),rgba(232,247,243,.54),rgba(255,249,237,.72))}
    .vc-filters{display:grid;grid-template-columns:1.4fr repeat(5,minmax(125px,1fr));gap:10px;margin:0 0 16px;padding:18px;border:1px solid rgba(88,70,111,.13);border-radius:24px;background:rgba(255,255,255,.74);box-shadow:0 18px 54px rgba(42,48,74,.08)}.vc-filters label{display:grid;gap:7px;color:#697286;font-size:10px;font-weight:950;letter-spacing:.1em;text-transform:uppercase}.vc-filters input,.vc-filters select{min-width:0;width:100%;height:46px;border:1px solid rgba(88,70,111,.14);border-radius:12px;background:#fff;color:#12213a;padding:0 12px;font:inherit;font-size:13px;font-weight:700;outline:none}.vc-filters input:focus,.vc-filters select:focus{border-color:#8c78aa;box-shadow:0 0 0 3px rgba(140,120,170,.13)}
    .vc-results-bar{display:flex;justify-content:space-between;gap:14px;align-items:center;margin:0 0 18px;color:#667287;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.vc-reset{border:0;border-radius:999px;background:#58466f;color:#fff;padding:10px 15px;font:inherit;font-weight:850;cursor:pointer}
    .vc-firm-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.vc-firm-card{display:flex;flex-direction:column;min-width:0;padding:22px;border:1px solid rgba(88,70,111,.13);border-radius:22px;background:rgba(255,255,255,.82);box-shadow:0 18px 54px rgba(42,48,74,.07);transition:transform .25s ease,box-shadow .25s ease}.vc-firm-card:hover{transform:translateY(-4px);box-shadow:0 25px 70px rgba(69,54,90,.13)}.vc-firm-card[hidden]{display:none}.vc-firm-top{display:flex;gap:13px;align-items:flex-start}.vc-firm-top>span{display:grid;place-items:center;flex:0 0 50px;height:50px;border-radius:15px;background:linear-gradient(135deg,#ddd3f5,#dff5ee);color:var(--vc-plum);font-weight:950}.vc-firm-top p{margin:1px 0 5px;color:var(--vc-blue);font-size:10px;font-weight:950;letter-spacing:.09em;text-transform:uppercase}.vc-firm-top h3{margin:0;font-family:var(--fluid-display);font-size:23px;line-height:1.1}.vc-thesis,.vc-portfolio{margin:17px 0 0;color:#657086;line-height:1.6}.vc-thesis strong,.vc-portfolio strong{display:block;margin-bottom:4px;color:#58466f;font-size:10px;letter-spacing:.1em;text-transform:uppercase}.vc-facts{display:grid;gap:8px;margin:18px 0 0}.vc-facts div{display:grid;grid-template-columns:88px 1fr;gap:8px;padding-top:8px;border-top:1px solid rgba(88,70,111,.09)}.vc-facts dt{color:#3269a8;font-size:10px;font-weight:950;letter-spacing:.08em;text-transform:uppercase}.vc-facts dd{min-width:0;margin:0;color:#596579;font-size:13px;overflow-wrap:anywhere}.vc-firm-card>a{display:inline-flex;justify-content:center;margin-top:auto;padding:12px 15px;border-radius:999px;background:#58466f;color:#fff;text-decoration:none;font-size:13px;font-weight:850}
    .vc-note{margin-top:22px;padding:18px 20px;border-left:4px solid #8c78aa;border-radius:12px;background:rgba(255,255,255,.7);color:#657086;line-height:1.6}.vc-note strong{color:#12213a}
    .vc-check-grid{grid-template-columns:repeat(5,minmax(0,1fr))}.vc-check-grid article{min-height:180px}.vc-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.vc-links a{padding:10px 14px;border:1px solid rgba(88,70,111,.15);border-radius:999px;background:#fff;color:#3269a8;text-decoration:none;font-weight:850}
    .vc-faq{display:grid;gap:12px;max-width:920px}.vc-faq details{padding:20px 22px;border:1px solid rgba(88,70,111,.12);border-radius:18px;background:rgba(255,255,255,.78)}.vc-faq summary{cursor:pointer;color:#12213a;font-weight:850}.vc-faq p{color:#657086;line-height:1.65}
    .vc-cta{padding:78px 0;background:linear-gradient(135deg,#ebe4fb,#e8f7f2 56%,#fff0e5)}.vc-cta-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.vc-cta article{padding:34px;border:1px solid rgba(88,70,111,.13);border-radius:26px;background:rgba(255,255,255,.72);box-shadow:0 22px 60px rgba(42,48,74,.1)}.vc-cta h2{margin:0 0 10px;font-family:var(--fluid-display);font-size:clamp(32px,4vw,50px)}.vc-cta p{color:#657086;line-height:1.62}.vc-cta a{display:inline-flex;margin-top:15px;padding:13px 18px;border-radius:999px;background:#58466f;color:#fff;text-decoration:none;font-weight:900}.vc-cta article:last-child a{background:#3269a8}
    @media(max-width:1100px){.vc-filters{grid-template-columns:repeat(3,minmax(0,1fr))}.vc-firm-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.vc-check-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:760px){.vc-hero{padding:82px 0 50px}.vc-hero-grid{grid-template-columns:1fr;gap:28px}.vc-hero h1{font-size:clamp(39px,12vw,54px)}.vc-capital-stack{transform:none}.vc-difference-grid,.vc-check-grid,.vc-firm-grid,.vc-cta-grid{grid-template-columns:1fr}.vc-filters{grid-template-columns:1fr 1fr;padding:14px}.vc-filters label:first-child{grid-column:1/-1}.vc-results-bar{align-items:flex-start}.vc-section{padding:58px 0}}
    @media(prefers-reduced-motion:reduce){.vc-firm-card{transition:none}}
  </style>
</head>
<body>
<main class="vc-page">
  <section class="vc-hero" aria-labelledby="vc-title">
    <div class="light-container vc-hero-grid">
      <div class="vc-hero-copy"><p class="eyebrow light-eyebrow">FluidRWA capital directory</p><h1 id="vc-title">Venture Capital for RWA and Web3</h1><p>Raising for a tokenization, RWA, or Web3 infrastructure project is its own discovery problem. The right investor is not just a check. They open doors to exchanges, market makers, and design partners.</p><p>This is where you find the funds that actually back this space. Browse by stage, check size, and thesis, then submit your raise and we point you to the firms that fit.</p><div class="hero-actions"><a class="btn btn-primary light-primary" href="#vc-directory">Compare firms</a><a class="btn btn-soft" href="/submit-requirement">Submit your raise</a></div></div>
      <aside class="vc-capital-stack" aria-label="Venture capital directory snapshot"><div><strong>${firms.length}</strong><span>curated venture firms</span></div><div><strong>2</strong><span>thesis groups</span></div><div><strong>5</strong><span>decision filters</span></div><div><strong>1</strong><span>focused capital layer</span></div></aside>
    </div>
  </section>
  <section class="vc-section"><div class="light-container"><div class="vc-section-head"><p class="eyebrow light-eyebrow">The part founders miss</p><h2>How VCs in this space differ</h2><p>Brand recognition is not the same as fundraising fit. These six variables usually determine whether a conversation is worth pursuing.</p></div><div class="vc-difference-grid">
    ${[["01","Stage","Pre-seed and seed look nothing like growth. Most funds only play in one or two."],["02","Check size","Knowing the ticket range saves weeks of wrong conversations."],["03","Thesis","Some funds are RWA and tokenization native. Others touch it opportunistically. Fit beats brand."],["04","Equity vs token","Some lead equity rounds, some buy tokens, some do both. This shapes your raise structure."],["05","Lead vs follow","A fund that only follows will not anchor your round."],["06","Value beyond capital","Listings, market-maker introductions, regulatory navigation and business development can be the real differentiator."]].map(x=>`<article class="vc-difference-card reveal"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("")}
  </div></div></section>
  <section class="vc-section vc-directory" id="vc-directory" aria-labelledby="vc-directory-title"><div class="light-container"><div class="vc-section-head"><p class="eyebrow light-eyebrow">Venture firm directory</p><h2 id="vc-directory-title">Find funds that fit your raise</h2><p>Filter the directory using the terms that matter before outreach. Publicly unavailable data is marked as not disclosed rather than estimated.</p></div>
    <div class="vc-filters" data-vc-filters>
      <label>Search<input type="search" data-vc-search placeholder="Firm, portfolio or thesis"></label>
      <label>Thesis<select data-vc-filter="type"><option value="">All theses</option><option value="rwa-native">RWA-native</option><option value="rwa-active-generalist">RWA-active generalist</option><option value="generalist">Generalist</option></select></label>
      <label>Stage<select data-vc-filter="stage"><option value="">All stages</option><option value="pre-seed">Pre-seed</option><option value="seed">Seed</option><option value="early-stage">Early stage</option><option value="growth">Growth / late</option><option value="multi-stage">Multi-stage</option></select></label>
      <label>Check size<select data-vc-filter="check"><option value="">All checks</option><option value="under-2m">Under $2M</option><option value="2m-20m">$2M–$20M</option><option value="20m-plus">$20M+</option><option value="not-disclosed">Not disclosed</option></select></label>
      <label>Instrument<select data-vc-filter="instrument"><option value="">Equity or token</option><option value="both">Both</option><option value="equity">Equity-led</option><option value="indirect">Indirect / LP</option></select></label>
      <label>Geography<select data-vc-filter="geography"><option value="">All geographies</option><option value="north-america">North America</option><option value="europe">Europe</option><option value="asia">Asia</option><option value="global">Global</option></select></label>
    </div>
    <div class="vc-results-bar"><span data-vc-count>Showing ${firms.length} firms</span><button class="vc-reset" type="button" data-vc-reset>Reset filters</button></div>
    <div class="vc-firm-grid" data-vc-grid>${cards}</div>
    <p class="vc-note"><strong>Research note:</strong> This directory is built from the attached FluidRWA venture-capital research. Check sizes, fund strategies and portfolios change. Verify current fit, conflicts, regulatory considerations and investment terms directly with each firm before outreach.</p>
  </div></section>
  <section class="vc-section"><div class="light-container"><div class="vc-section-head"><p class="eyebrow light-eyebrow">Before you pitch</p><h2>Five checks that improve fundraising fit</h2></div><div class="vc-check-grid">
    ${[["01","Stage and size","Confirm the fund deploys at your stage and within your target round size."],["02","Specific proof","Look for RWA or tokenization investments, not only broad crypto exposure."],["03","Lead capacity","Check whether the investor can anchor the round and follow on later."],["04","Portfolio conflicts","Review direct competitors and adjacent portfolio companies before sharing sensitive details."],["05","Founder references","Speak with founders already backed by the fund about support after the check."]].map(x=>`<article class="reveal"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("")}
  </div><div class="vc-links" aria-label="Related FluidRWA resources"><a href="/vendors/tokenization-platforms">Tokenization Platforms</a><a href="/web3vendorecosystem">Launchpads and Market Makers</a><a href="/blog/how-to-find-web3-vendors/">How to Find Web3 Vendors</a></div></div></section>
  <section class="vc-section"><div class="light-container"><div class="vc-section-head"><p class="eyebrow light-eyebrow">FAQ</p><h2>Venture capital questions for RWA and Web3 teams</h2></div><div class="vc-faq">${faq.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>
  <section class="vc-cta"><div class="light-container vc-cta-grid"><article><h2>Raising capital?</h2><p>Submit your raise, stage, target check size and thesis. FluidRWA helps identify funds that appear relevant for your next conversations.</p><a href="/submit-requirement">Submit your raise</a></article><article><h2>Investing in this space?</h2><p>Get featured in the FluidRWA capital layer and help the right RWA, tokenization and Web3 infrastructure teams find your fund.</p><a href="/apply-as-vendor">Get featured as a fund</a></article></div></section>
</main>
</body></html>`;

const out = path.join(process.cwd(), "vendors/venture-capital/index.html");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`Wrote ${out} with ${firms.length} venture firms`);
