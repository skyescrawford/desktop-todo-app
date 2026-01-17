import { Card, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
import type { Todo } from "@/App";
import type { Dispatch, SetStateAction } from "react";

type ListProps = {
  items: Todo[];
  handleUpdate: Dispatch<SetStateAction<Todo[]>>;
};

export default function List({ items, handleUpdate }: ListProps) {
  function handleClick(id: string) {
    const copy = items.slice(0);
    const todoIndex = copy.findIndex((item) => item.id === id);

    copy[todoIndex].completed = !copy[todoIndex].completed;
    handleUpdate(copy);
  }
  return (
    <Card className="w-90">
      <CardContent className="p-0">
        {/* <ScrollArea className="h-60"> */}
        <ul className="divide-y">
          {items.map((item) => (
            <li
              onClick={() => handleClick(item.id)}
              key={item.id}
              className={`p-4 ${
                item.completed ? "bg-muted" : "hover:bg-muted/50"
              } cursor-pointer`}
            >
              <div
                className={` ${
                  item.completed ? "decoration-dashed" : "text-blue-600"
                }"font-medium"`}
              >
                {item.title}
              </div>
              <div className="text-sm text-muted-foreground">{item.desc}</div>
            </li>
          ))}
        </ul>
        {/* </ScrollArea> */}
      </CardContent>
    </Card>
  );
}
