package main

import (
	"context"
	"database/sql"
	"embed"
	"log"
	"os"
	"path/filepath"
	"skyes-app/internal/storage"

	_ "github.com/golang-migrate/migrate/v4/database/sqlite"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	_ "modernc.org/sqlite"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

var DB *sql.DB

func appDataPath() string {
	dir, err := os.UserConfigDir()
	if err != nil {
		log.Fatal(err)
	}
	return filepath.Join(dir, "desktop-todo-app")
}

func initDB(ctx context.Context) {
	var err error

	dbPath := filepath.Join(appDataPath(), "app.db")

	runtime.LogInfof(ctx, "path: %s", dbPath)

	DB, err = sql.Open("sqlite", dbPath+"?_busy_timeout=5000")
	if err != nil {
		runtime.LogErrorf(ctx, "error: %s", err.Error())
	}

	stmt := `
	CREATE TABLE IF NOT EXISTS todos (
		id TEXT PRIMARY KEY,
		title TEXT,
		description TEXT,
		completed BOOLEAN,
		createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
		completedAt TEXT
	);
	`
	_, err = DB.Exec(stmt)
	if err != nil {
		runtime.LogErrorf(ctx, "Error creating table: %q: %s\n", err, stmt) // Log an error if table creation fails
	}

}

func main() {
	// Create an instance of the app structure

	db, err := storage.OpenDB("todo-app")
	if err != nil {
		log.Fatal(err)
	}

	err = storage.Migrate(db)
	if err != nil {
		log.Fatal(err)
	}

	app := NewApp(db)

	// Create application with options
	err = wails.Run(&options.App{
		Title:            "todo app",
		Width:            720,
		Height:           768,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		// Debug:            options.Debug{OpenInspectorOnStartup: true},
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
