import { Card, CardContent } from "@/components/ui/card";
import type { Todo } from "@/App";
import type { Dispatch, SetStateAction } from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { main } from "../../wailsjs/go/models";
import { DeleteTodo } from "../../wailsjs/go/main/App";
import type { repository } from "wailsjs/go/models";

type ListProps = {
  items: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  listTodos: () => Promise<Array<repository.Todo>>;
};

export default function List({ items, setTodos, listTodos }: ListProps) {
  async function handleDelete(id: string) {
    try {
      DeleteTodo(id)
        .then((res) => {
          console.log(`Delete ${res === null ? "success" : "failed"}`);
          listTodos()
            .then((data) => setTodos(data))
            .catch((err) => console.log("error fetch", err));
        })
        .catch((err) => console.log("error delete", err));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card className="w-90">
      <CardContent className="p-0">
        {/* <ScrollArea className="h-60"> */}
        <ul className="divide-y">
          {items.map((item) => (
            <li
              onClick={() => handleDelete(item.id)}
              key={item.id}
              className={`p-4 ${
                false ? "bg-muted" : "hover:bg-muted/50"
              } cursor-pointer`}
            >
              <div
                className={` ${
                  false ? "decoration-dashed" : "text-blue-600"
                }"font-medium"`}
              >
                {item.title}
              </div>
              <div className="text-sm text-muted-foreground">
                {item.description}
              </div>
            </li>
          ))}
        </ul>
        {/* </ScrollArea> */}
      </CardContent>
    </Card>
  );
}
