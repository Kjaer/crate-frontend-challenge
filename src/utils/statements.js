// Accept only simple SQL identifiers (table names) to reduce SQL injection risk:
// ^             => start of string
// [A-Za-z_]     => first character must be a letter or underscore
// [A-Za-z0-9_]* => remaining characters (if any) can be letters, digits, or underscores
// $             => end of string
// Examples accepted: people, films_2020, _internal
// Examples rejected: people;DROP TABLE x, schema.table, "users", user-name, user name
const VALID_SQL_IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;

function sanitizeTableName(tableName) {
  if (typeof tableName !== "string" || !VALID_SQL_IDENTIFIER.test(tableName)) {
    throw new Error("Invalid table name");
  }

  return tableName;
}

function sanitizeInteger(value, name) {
  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    throw new Error(`Invalid ${name}`);
  }

  return parsed;
}

export const statements = Object.freeze({
  QUERY_TABLENAMES:
    "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('information_schema', 'sys', 'pg_catalog')",
  queryTableContent: (tableName) => {
    const safeTableName = sanitizeTableName(tableName);
    return `SELECT * FROM ${safeTableName}`;
  },
  queryTableContentPaginated: (tableName, limit, offset) => {
    const safeTableName = sanitizeTableName(tableName);
    const safeLimit = sanitizeInteger(limit, "limit");
    const safeOffset = sanitizeInteger(offset, "offset");

    return `SELECT * FROM ${safeTableName} LIMIT ${safeLimit} OFFSET ${safeOffset}`;
  },
  queryCount: (tableName) => {
    const safeTableName = sanitizeTableName(tableName);
    return `SELECT COUNT(*) from ${safeTableName}`;
  },
});
