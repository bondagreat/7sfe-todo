import ItemList from "@/components/ItemList";
import { ItemTypes } from "@/consts";
import { Item } from "@/types";
import { Container, Typography } from "@mui/material";

export default function Home() {
  const initialItems: Item[] = [
    { type: ItemTypes.Fruit, name: "Apple" },
    { type: ItemTypes.Vegetable, name: "Broccoli" },
    { type: ItemTypes.Vegetable, name: "Mushroom" },
    { type: ItemTypes.Fruit, name: "Banana" },
    { type: ItemTypes.Vegetable, name: "Tomato" },
    { type: ItemTypes.Fruit, name: "Orange" },
    { type: ItemTypes.Fruit, name: "Mango" },
    { type: ItemTypes.Fruit, name: "Pineapple" },
    { type: ItemTypes.Vegetable, name: "Cucumber" },
    { type: ItemTypes.Fruit, name: "Watermelon" },
    { type: ItemTypes.Vegetable, name: "Carrot" },
  ];

  return (
    <Container maxWidth="lg" sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Item List Manager
      </Typography>
      <ItemList initialItems={initialItems} />
    </Container>
  );
}
