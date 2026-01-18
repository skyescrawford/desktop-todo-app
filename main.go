package main

import (
	"database/sql"
	"embed"
	"log"

	_ "github.com/golang-migrate/migrate/v4/database/sqlite"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	_ "modernc.org/sqlite"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

var DB *sql.DB

func initDB() {
	var err error
	DB, err = sql.Open("sqlite", "./app.db")
	if err != nil {
		log.Fatal(err)
	}

	stmt := `
	CREATE TABLE IF NOT EXISTS todos (
		id TEXT PRIMARY KEY,
		title TEXT,
		desc TEXT,
		completed BOOLEAN,
		createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
		completedAt TEXT
	);
	`
	_, err = DB.Exec(stmt)
	if err != nil {
		log.Fatalf("Error creating table: %q: %s\n", err, stmt) // Log an error if table creation fails
	}
}

func main() {
	// Create an instance of the app structure
	initDB()
	app := NewApp()
	repo := NewRepo()
	// Create application with options
	err := wails.Run(&options.App{
		Title:            "todo app",
		Width:            720,
		Height:           768,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			repo,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
