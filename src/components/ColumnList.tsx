"use client";

import { ItemWithTimer } from "@/types";
import { Button, Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  items: ItemWithTimer[];
  onClick: (item: ItemWithTimer) => void;
};

export default function ColumnList({ title, items, onClick }: Props) {
  return (
    <Stack
      sx={{
        gap: 1,
        width: 220,
        height: 600,
        border: "1px solid lightgrey",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          backgroundColor: "lightgrey",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography color="primary">{title}</Typography>
      </Stack>
      {items.map((item) => (
        <Button
          key={item.name}
          variant="outlined"
          color="primary"
          sx={{ width: 200 }}
          onClick={() => onClick(item)}
        >
          {item.name}
        </Button>
      ))}
    </Stack>
  );
}
