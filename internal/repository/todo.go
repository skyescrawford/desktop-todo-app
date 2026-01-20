// internal/repository/todo.go
package repository

import (
	"database/sql"
	"errors"
	"log"
	"time"
)

type Todo struct {
	Id          string       `json:"id"`
	Title       string       `json:"title"`
	Description string       `json:"description"`
	Completed   bool         `json:"Completed,omitempty"`
	CreatedAt   time.Time    `json:"CreatedAt,omitempty"`
	CompletedAt sql.NullTime `json:"CompletedAt,omitempty"`
}

type TodoRepo struct {
	db *sql.DB
}

func NewTodoRepo(db *sql.DB) *TodoRepo {
	return &TodoRepo{db: db}
}

func (r *TodoRepo) Create(todo Todo) error {
	log.Printf("todo: %+v", todo)
	query := `INSERT INTO todos(id, title, description, createdAt) VALUES(?, ?, ?, DATE('now'))`
	args := []any{todo.Id, todo.Title, todo.Description}

	_, err := r.db.Exec(query, args...)
	return err
}

func (r *TodoRepo) List() ([]Todo, error) {
	rows, err := r.db.Query("SELECT id, title, description, completed, createdAt, completedAt FROM todos ORDER BY createdAt DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var todos []Todo
	for rows.Next() {
		var t Todo
		err := rows.Scan(&t.Id, &t.Title, &t.Description, &t.Completed, &t.CreatedAt, &t.CompletedAt)
		if err != nil {
			return nil, err
		}
		todos = append(todos, t)
	}
	return todos, nil
}

func (r *TodoRepo) Delete(id string) error {
	query := `DELETE FROM todos WHERE id = ?`
	args := []any{id}

	result, err := r.db.Exec(query, args...)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New("todo is not found")
		}
		return err
	}
	affectedRows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if affectedRows == 0 {
		return errors.New("delete todo is failed")
	}

	return nil
}
