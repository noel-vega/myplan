"use client";
import { cn } from "@/lib/cn";
import * as Tabs from "@radix-ui/react-tabs";
import { ComponentProps, createContext, useContext, useState } from "react";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

type TabsRootProps = Tabs.TabsProps & {
  defaultValue: string;
};

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return context;
}

function Root(props: TabsRootProps) {
  const [activeTab, setActiveTab] = useState(props.defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <Tabs.Root {...props} value={activeTab} onValueChange={setActiveTab}>
        {props.children}
      </Tabs.Root>
    </TabsContext.Provider>
  );
}

function List(props: ComponentProps<typeof Tabs.List>) {
  return (
    <Tabs.List
      {...props}
      className={cn(
        "flex gap-4 mb-4 bg-gray-100 p-1 rounded-lg",
        props.className
      )}
    >
      {props.children}
    </Tabs.List>
  );
}

function Trigger(props: ComponentProps<typeof Tabs.Trigger>) {
  const context = useTabsContext();
  return (
    <Tabs.Trigger
      {...props}
      className={cn("py-2 flex-1 rounded-lg cursor-pointer", props.className, {
        "bg-white shadow": context.activeTab === props.value,
      })}
    >
      {props.children}
    </Tabs.Trigger>
  );
}

function Content(props: ComponentProps<typeof Tabs.Content>) {
  return (
    <Tabs.Content {...props} value={props.value}>
      {props.children}
    </Tabs.Content>
  );
}

export { Root, List, Trigger, Content };
