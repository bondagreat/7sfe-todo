import { ItemTypes } from "@/consts";

export type Item = {
  type: ItemTypes;
  name: string;
  inColumn?: boolean;
};

export type ItemWithTimer = Item & { timer?: NodeJS.Timeout };
