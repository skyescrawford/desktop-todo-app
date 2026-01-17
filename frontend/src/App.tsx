import { Button } from "@/components/ui/button";
import List from "@/components/List.tsx";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import type { KeyboardEvent } from "react";

export type Todo = {
  id: string;
  title: string;
  desc: string;
  completed: boolean;
  createdAt?: Date;
  completedAt?: Date;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: uuid(),
      title: "Fried Rice",
      desc: "With egg and chicken",
      completed: false,
    },
    {
      id: uuid(),
      title: "Meatball",
      desc: "Beef meatballs with soup",
      completed: false,
    },
    { id: uuid(), title: "Noodle", desc: "Spicy noodle", completed: true },
  ]);
  const [title, setTitle] = useState("");

  function handleAddTodo() {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      return;
    }
    const todo: Todo = {
      id: uuid(),
      title: cleanTitle,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      completed: false,
      createdAt: new Date(),
    };

    setTodos((prev) => [...prev, todo]);
    setTitle("");
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
      <List items={todos} handleUpdate={setTodos} />
    </div>
  );
};

export default App;
