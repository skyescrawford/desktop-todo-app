import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import type { Todo } from "@/App";
import type { Dispatch, SetStateAction } from "react";
import { SquarePen, Trash } from "lucide-react";
import { DeleteTodo } from "../../wailsjs/go/main/App";

// import { ScrollArea } from "@/components/ui/scroll-area";
// import { main } from "../../wailsjs/go/models";
// import { DeleteTodo } from "../../wailsjs/go/main/App";
import type { repository } from "wailsjs/go/models";

type ListProps = {
  items: Todo[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  listTodos: () => Promise<Array<repository.Todo>>;
  setSelectedTodo: Dispatch<SetStateAction<Todo>>;
};

export default function List({
  items,
  open,
  setOpen,
  setSelectedTodo,
  setTodos,
  listTodos,
}: ListProps) {
  function handleDelete(id: string) {
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
              onClick={() => console.log(item.id)}
              key={item.id}
              className="p-4 flex items-center gap-2"
            >
              <div className="text">
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
              </div>
              <div className="button-grup">
                <ButtonGroup className="hidden sm:flex">
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    size="icon"
                    aria-label="Edit"
                    onClick={() => {
                      setSelectedTodo(item);
                      setOpen(!open);
                    }}
                  >
                    <SquarePen />
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    size="icon"
                    aria-label="Delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash />
                  </Button>
                </ButtonGroup>
              </div>
            </li>
          ))}
        </ul>
        {/* </ScrollArea> */}
      </CardContent>
    </Card>
  );
}
