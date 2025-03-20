"use client";

import { Item, ItemWithTimer } from "@/types";
import { Button, Stack } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import ColumnList from "./ColumnList";
import { ItemTypes } from "@/consts";

type Props = {
  initialItems: Item[];
};

export default function ItemList({ initialItems }: Props) {
  const [items, setItems] = useState<Item[]>(
    initialItems.map((item) => ({ ...item, inColumn: false }))
  );
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Move item from main list to its column
  const moveToColumn = (item: Item) => {
    const timer = setTimeout(() => moveBackToMain(item), 5000);
    timersRef.current.set(item.name, timer);
    setItems((prev) => {
      const updatedItems = prev.filter((i) => i.name !== item.name);
      return [...updatedItems, { ...item, inColumn: true, timer }];
    });
  };

  // Move item back to main list
  const moveBackToMain = (item: Item) => {
    const timer = timersRef.current.get(item.name);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(item.name);
    }
    setItems((prev) =>
      prev.map((i) => (i.name === item.name ? { ...i, inColumn: false } : i))
    );
  };

  // Handle click from main list
  const handleClickMain = (item: Item) => {
    if (!item.inColumn) moveToColumn(item);
  };

  // Handle click from column
  const handleClickColumn = (item: ItemWithTimer) => {
    moveBackToMain(item);
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current.clear();
    };
  }, []);

  // Memoize column grouping
  const { mainItems, columns } = useMemo(() => {
    const mainItems: Item[] = [];
    const columns: Record<string, ItemWithTimer[]> = {};

    items.forEach((item) => {
      if (!item.inColumn) {
        mainItems.push(item);
      } else {
        if (!columns[item.type]) {
          columns[item.type] = [];
        }
        columns[item.type].push(item);
      }
    });
    return { mainItems, columns };
  }, [items]);

  return (
    <Stack direction="row" spacing={4} justifyContent={"center"}>
      {/* Main List */}
      <Stack spacing={1} width={200}>
        {mainItems.map((item) => (
          <Button
            key={item.name}
            variant="outlined"
            onClick={() => handleClickMain(item)}
          >
            {item.name}
          </Button>
        ))}
      </Stack>

      {/* Column type list */}
      <Stack direction="row" spacing={2}>
        {Object.values(ItemTypes).map((type) => (
          <ColumnList
            key={type}
            title={type}
            items={columns[type] || []}
            onClick={handleClickColumn}
          />
        ))}
      </Stack>
    </Stack>
  );
}
