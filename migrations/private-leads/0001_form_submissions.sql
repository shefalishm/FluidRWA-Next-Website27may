CREATE TABLE IF NOT EXISTS form_submissions (
  source_table TEXT NOT NULL,
  id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  payload TEXT NOT NULL CHECK (json_valid(payload)),
  PRIMARY KEY (source_table, id)
);
CREATE INDEX IF NOT EXISTS form_submissions_date ON form_submissions(source_table, julianday(created_at) DESC, id DESC);
CREATE INDEX IF NOT EXISTS form_submissions_email ON form_submissions(source_table, json_extract(payload,'$.contact_email'), julianday(created_at));
CREATE INDEX IF NOT EXISTS form_submissions_receipt ON form_submissions(source_table, json_extract(payload,'$.raw_payload.FLUIDRWA_NOTIFICATION.messageId'));
