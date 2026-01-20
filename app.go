package main

import (
	"context"
	"database/sql"
	"skyes-app/internal/repository"
)

// App struct
type App struct {
	ctx context.Context
	db  *sql.DB
}

// NewApp creates a new App application struct
func NewApp(db *sql.DB) *App {
	return &App{db: db}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

func (a *App) CreateTodo(todo repository.Todo) error {
	repo := repository.NewTodoRepo(a.db)
	return repo.Create(todo)
}

func (a *App) ListTodos() ([]repository.Todo, error) {
	repo := repository.NewTodoRepo(a.db)
	return repo.List()
}

func (a *App) DeleteTodo(id string) error {
	repo := repository.NewTodoRepo(a.db)
	return repo.Delete(id)
}
