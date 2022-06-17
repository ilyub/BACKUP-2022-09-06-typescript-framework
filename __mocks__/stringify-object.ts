import { json } from "@skylib/functions";

export default function stringifyObject(value: unknown): string {
  return json.encode(value);
}
