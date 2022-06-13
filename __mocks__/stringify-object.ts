import { json } from "@skylib/functions";

// eslint-disable-next-line import/no-default-export -- Ok
export default function stringifyObject(value: unknown): string {
  return json.encode(value);
}
