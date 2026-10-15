CREATE TABLE IF NOT EXISTS onchain_supply_observations (
  asset_id TEXT NOT NULL,
  day TEXT NOT NULL,
  chain_id INTEGER NOT NULL,
  contract_address TEXT NOT NULL,
  raw_supply TEXT NOT NULL,
  decimals INTEGER NOT NULL,
  block_number INTEGER NOT NULL,
  block_timestamp INTEGER NOT NULL,
  observed_at TEXT NOT NULL,
  PRIMARY KEY (asset_id, day)
);

CREATE INDEX IF NOT EXISTS onchain_supply_day_idx
  ON onchain_supply_observations(day);
