import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// shadcn/ui does not provide a dedicated <List /> component.
// Lists are typically composed using semantic HTML + existing primitives.

export default function ListExample() {
  const items = [
    { id: 1, title: "Fried Rice", desc: "With egg and chicken" },
    { id: 2, title: "Meatball", desc: "Beef meatballs with soup" },
    { id: 3, title: "Noodle", desc: "Spicy noodle" },
  ];

  return (
    <Card className="w-[360px]">
      <CardContent className="p-0">
        <ScrollArea className="h-[240px]">
          <ul className="divide-y">
            {items.map((item) => (
              <li
                key={item.id}
                className="p-4 hover:bg-muted/50 cursor-pointer"
              >
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
