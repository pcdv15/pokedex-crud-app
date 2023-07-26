import { BasicObject } from "./types";

export function removeFalsyKeys(obj: BasicObject): BasicObject {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (Array.isArray(value)) {
        // Remove if the array is empty
        return value.length > 0;
      } else {
        // Remove if the value is falsy (false, null, undefined, 0, "", NaN)
        return !!value;
      }
    })
  );
}
