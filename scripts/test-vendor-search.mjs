import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const source = fs.readFileSync("assets/site.js", "utf8");
const start = source.indexOf("const normalizeVendorText");
const end = source.indexOf("const inferVendorProfile");
assert(start >= 0 && end > start);
const context = vm.createContext({});
vm.runInContext(source.slice(start, end) + ";this.score = vendorSearchScore;", context);
const rank = (query, name, category, text = "") => context.score({name, category, text: `${name} ${category} ${text}`.toLowerCase()}, query);
assert(rank("Chainstack", "Chainstack", "RPC providers") > rank("Chainstack", "Another provider", "RPC providers", "chainstack alternative"));
assert(rank("tokenization", "Zoniqx", "Tokenization Platforms") > rank("tokenization", "Family office", "Family Offices Investing in RWA"));
assert(rank("custody", "BitGo", "Custody and wallets") > rank("custody", "Law firm", "Legal", "custody advice"));
assert(rank("rpc", "Chainstack", "Node-as-a-Service / RPC") > rank("rpc", "Agency", "Development", "rpc integration"));
assert(rank("blockchain development", "Developer", "Blockchain Development Companies") > rank("blockchain development", "Fund", "Venture Capital", "blockchain development investment"));
assert.equal(context.score({name:"",category:"",text:""}, ""), 0);
console.log("Six vendor search ranking assertions passed.");
