-- Once D1 is active, retain changes already written there. A newer source
-- row may be imported only if the destination still predates the source row.
INSERT INTO form_submissions (source_table, id, created_at, payload)
SELECT source_table, source_id, created_at, payload
FROM historical_submissions
WHERE 1
ON CONFLICT (source_table, id) DO UPDATE SET
  created_at = excluded.created_at,
  payload = excluded.payload
WHERE julianday(COALESCE(json_extract(excluded.payload, '$.updated_at'), excluded.created_at))
    > julianday(COALESCE(json_extract(form_submissions.payload, '$.updated_at'), form_submissions.created_at));
