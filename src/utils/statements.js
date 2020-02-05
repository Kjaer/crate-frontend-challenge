export const statements = {
  QUERY_TABLENAMES: "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('information_schema', 'sys', 'pg_catalog')",
  queryTableContent:  (tableName) => `SELECT * FROM ${tableName}`,
  queryTableContentPaginated:  (tableName, limit, offset) => `SELECT * FROM ${tableName} LIMIT ${limit} OFFSET ${offset}`,
  queryCount:  (tableName) => `SELECT COUNT(*) from ${tableName}`
}
