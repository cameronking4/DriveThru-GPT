import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const TabContent = ({ value, src }) => (
  <TabsContent value={value}>
    <div className="relative aspect-video overflow-hidden rounded-xl border md:rounded-lg">
      <iframe
        className="size-full object-cover object-center"
        src={src}
      />
    </div>
  </TabsContent>
);

export function PreviewLanding() {
  const tabs = [
    { value: "mcd", label: "McDonald's", src: "https://vapi.ai?demo=true&shareKey=4e8baff1-900f-464b-9944-2a799b58c68c&assistantId=b65722ea-252d-4baa-a6d1-9ea953cf7559" },
    { value: "dunkin", label: "Dunkin Donuts", src: "https://vapi.ai?demo=true&shareKey=4e8baff1-900f-464b-9944-2a799b58c68c&assistantId=b65722ea-252d-4baa-a6d1-9ea953cf7559" },
    { value: "churchs", label: "Church's Chicken", src: "https://vapi.ai?demo=true&shareKey=example-link-3" },
    { value: "tb", label: "Taco Bell", src: "https://vapi.ai?demo=true&shareKey=example-link-6" },
    { value: "starbussy", label: "Starbucks", src: "https://vapi.ai?demo=true&shareKey=example-link-5" },
    { value: "bk", label: "Burger King", src: "https://vapi.ai?demo=true&shareKey=example-link-6" },
    { value: "chik", label: "Chik Fil A", src: "https://vapi.ai?demo=true&shareKey=example-link-6" },
  ];

  return (
    <div className="pb-6 sm:pb-16">
      <div className="container max-w-5xl">
        <div className="rounded-xl md:bg-muted/30 md:p-3.5 md:ring-1 md:ring-inset md:ring-border">
          <Tabs defaultValue="mcd" className="w-full">
            <div className="flex justify-between">
              <TabsList className="flex-grow">
                {tabs.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button className="ml-4">View Menu</Button>
            </div>
            {tabs.map(tab => (
              <TabContent key={tab.value} value={tab.value} src={tab.src} />
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
