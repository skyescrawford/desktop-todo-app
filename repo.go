package main

import (
	"database/sql"
	"errors"
)

type Todo struct {
	Id          string
	Title       string
	Desc        string
	Completed   bool   `json:"Completed,omitempty"`
	CreatedAt   string `json:"CreatedAt,omitempty"`
	CompletedAt string `json:"CompletedAt,omitempty"`
}

type repository struct {
	db *sql.DB
}

func NewRepo() *repository {
	return &repository{db: DB}
}

func (r *repository) AddTodo(todo Todo) error {
	query := `INSERT INTO todos (id, title, desc) VALUES (?, ?, ?)`
	_, err := r.db.Exec(query, todo.Id, todo.Title, todo.Desc)
	if err != nil {
		return err
	}

	return nil
}

func (r *repository) ListTodo() []Todo {
	query := `SELECT * FROM todos`
	rows, err := r.db.Query(query)
	defer rows.Close()
	if err != nil {
		return []Todo{}
	}
	var todos []Todo
	for rows.Next() {
		var todo Todo
		err := rows.Scan(&todo.Id, &todo.Title, &todo.Desc, &todo.Completed, &todo.CreatedAt, &todo.CompletedAt)
		if err != nil {
			return []Todo{}
		}
		todos = append(todos, todo)
	}
	return todos
}

func (r *repository) DeleteTodo(id string) error {
	query := `DELETE FROM todos WHERE id = ?`
	result, err := r.db.Exec(query, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New("todo not found")
		}
		return err
	}
	affectedRow, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if affectedRow == 0 {
		return errors.New("todo ayammmm")
	}
	return nil
}
