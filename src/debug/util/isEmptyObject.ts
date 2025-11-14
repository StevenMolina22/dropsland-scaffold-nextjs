import { AnyObject } from "@/debug/types/types";

export const isEmptyObject = (obj: AnyObject) => {
  return Object.keys(obj).length === 0;
};
