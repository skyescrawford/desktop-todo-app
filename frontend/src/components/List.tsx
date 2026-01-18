import { Card, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
import type { Dispatch, SetStateAction } from "react";
import { main } from "../../wailsjs/go/models";

type ListProps = {
  items: main.Todo[];
  handleUpdate: Dispatch<SetStateAction<main.Todo[]>>;
};

export default function List({ items, handleUpdate }: ListProps) {
  function handleClick() {
    const copy = items.slice(0);

    handleUpdate(copy);
  }
  return (
    <Card className="w-90">
      <CardContent className="p-0">
        {/* <ScrollArea className="h-60"> */}
        <ul className="divide-y">
          {items.map((item) => (
            <li
              onClick={() => handleClick()}
              key={item.Id}
              className={`p-4 ${
                false ? "bg-muted" : "hover:bg-muted/50"
              } cursor-pointer`}
            >
              <div
                className={` ${
                  false ? "decoration-dashed" : "text-blue-600"
                }"font-medium"`}
              >
                {item.Title}
              </div>
              <div className="text-sm text-muted-foreground">{item.Desc}</div>
            </li>
          ))}
        </ul>
        {/* </ScrollArea> */}
      </CardContent>
    </Card>
  );
}
