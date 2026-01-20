// internal/storage/migrate.go
package storage

import "database/sql"

func Migrate(db *sql.DB) error {
	schema := `
	CREATE TABLE IF NOT EXISTS todos (
		id TEXT PRIMARY KEY,
		title TEXT,
		description TEXT,
		completed BOOLEAN NOT NULL DEFAULT 0,
		createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
		completedAt DATETIME
	);
	`
	_, err := db.Exec(schema)
	return err
}
