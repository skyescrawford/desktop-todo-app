import { Button } from "@/components/ui/button";
import List from "@/components/List.tsx";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import type { KeyboardEvent } from "react";
import { AddTodo, ListTodo } from "../wailsjs/go/main/repository";
import { main } from "../wailsjs/go/models";

export type Todo = {
  id: string;
  title: string;
  desc: string;
  completed?: boolean;
  createdAt?: Date;
  completedAt?: Date;
};

const App = () => {
  const [todos, setTodos] = useState<main.Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    ListTodo().then((data) => setTodos(data));
  }, []);

  async function handleAddTodo() {
    try {
      const cleanTitle = title.trim();
      if (!cleanTitle) {
        return;
      }
      const todo: main.Todo = {
        Id: uuid(),
        Title: cleanTitle,
        Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      };

      await AddTodo(todo);
      const td = await ListTodo();
      setTodos(td);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  }
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  }
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl text-center">Todo Apps</h1>
      <div className="flex gap-2 min-w-96">
        <Input
          type="text"
          placeholder="so, what are you gonna do today? 🐔"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button className="cursor-pointer" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </div>
      {todos && <List items={todos} handleUpdate={setTodos} />}
    </div>
  );
};

export default App;
