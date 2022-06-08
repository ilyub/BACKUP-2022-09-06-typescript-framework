import { datetime, uniqueId } from "@skylib/facades";
import { assert, cast, evaluate, is, json, num, o } from "@skylib/functions";
import sha256 from "sha256";
import type {
  Filter,
  MapReduce,
  RawQueryOptions,
  RawQueryOptionsAttached
} from "./types";
import type { database } from "@skylib/facades";
import type { Writable, strings } from "@skylib/functions";

/**
 * Creates map/reduce function.
 *
 * @param options - Options.
 * @param queryOptions - Query options.
 * @param caseSensitiveSorting - Case sensitive sorting.
 * @returns Map/reduce function.
 */
export function getMapReduce(
  options: database.QueryOptions,
  queryOptions: RawQueryOptions,
  caseSensitiveSorting: boolean
): MapReduce {
  const conds = condsToStr("doc", queryOptions.conditions);

  const sortBy = options.sortBy;

  const descending = options.descending ?? false;

  const group1 = descending ? 4 : 1;

  const group2 = descending ? 3 : 2;

  const group3 = descending ? 2 : 3;

  const group4 = descending ? 1 : 4;

  const id = sha256(
    json.encode([
      conds.toEmit,
      conds.toSettle,
      sortBy,
      descending,
      caseSensitiveSorting
    ])
  );

  const key = evaluate(() => {
    if (is.empty(sortBy)) return `[${group2}, null, doc._id]`;

    return caseSensitiveSorting
      ? `
        (() => {
          if (settled) {
            const value = doc.${sortBy};
            return value === undefined || value === null || value === ""
              ? [${group4}, null, doc._id]
              : [${group3}, value, doc._id];
          }
          return [${group1}, null, null, doc._id];
        })()

      `
      : `
        (() => {
          if (settled) {
            const value = typeof doc.${sortBy} === "string"
            ? doc.${sortBy}.toLocaleLowerCase()
            : doc.${sortBy};
            return value === undefined || value === null || value === ""
              ? [${group4}, null, doc._id]
              : [${group3}, value, doc._id];
          }
          return [${group1}, null, null, doc._id];
        })()
      `;
  });

  const map = uglify(`
    function (doc) {
      /* ${uniqueId()} */
      if (${conds.toEmit}) {
        const settled = ${conds.toSettle};
        const key = ${key};
        emit(
          key,
          {
            count: 1,
            docs: [
              {
                doc: doc.attachedDocs ? { ...doc, attachedDocs: [] } : doc,
                key
              }
            ],
            settled
          }
        );
      }
    }
  `);

  const reduce = uglify(`
    function (keys, values, rereduce) {
      /* ${uniqueId()} */
      let count = 0;
      let docs = [];
      let settled = false;
      for (const value of values) {
        count += value.count;
        docs.push(...value.docs);
        settled = value.settled;
      }
      return { count, docs, settled };
    }
  `);

  return {
    groupLevel: queryOptions.count ?? false ? 1 : 3,
    id,
    mapReduce: { map, reduce },
    output: createFilter(conds.toOutput),
    settle: createFilter(conds.toSettle)
  };
}

/**
 * Creates map/reduce function.
 *
 * @param options - Options.
 * @param queryOptions - Query options.
 * @param caseSensitiveSorting - Case sensitive sorting.
 * @returns Map/reduce function.
 */
export function getMapReduceAttached(
  options: database.QueryOptions,
  queryOptions: RawQueryOptionsAttached,
  caseSensitiveSorting: boolean
): MapReduce {
  const conds = condsToStr("attached", queryOptions.conditions);

  const parentConds = condsToStr("doc", queryOptions.parentConditions);

  const sortBy = options.sortBy;

  const descending = options.descending ?? false;

  const group1 = descending ? 4 : 1;

  const group2 = descending ? 3 : 2;

  const group3 = descending ? 2 : 3;

  const group4 = descending ? 1 : 4;

  const id = sha256(
    json.encode([
      conds.toEmit,
      conds.toSettle,
      parentConds.toEmit,
      parentConds.toSettle,
      sortBy,
      descending,
      caseSensitiveSorting
    ])
  );

  const key = evaluate<string>(() => {
    if (is.empty(sortBy)) return `[${group2}, null, doc._id, id]`;

    return caseSensitiveSorting
      ? `
        (() => {
          if (settled) {
            const value = attached.${sortBy};
            return value === undefined || value === null || value === ""
              ? [${group4}, null, doc._id, id]
              : [${group3}, value, doc._id, id];
          }
          return [${group1}, null, null, doc._id, id];
        })()
      `
      : `
        (() => {
          if (settled) {
            const value = typeof attached.${sortBy} === "string"
              ? attached.${sortBy}.toLocaleLowerCase()
              : attached.${sortBy};
            return value === undefined || value === null || value === ""
              ? [${group4}, null, doc._id, id]
              : [${group3}, value, doc._id, id];
          }
          return [${group1}, null, null, doc._id, id];
        })()
      `;
  });

  const map = uglify(`
    function (doc) {
      /* ${uniqueId()} */
      if (doc.attachedDocs && ${parentConds.toEmit}) {
        const parentDoc = { ...doc, attachedDocs: [] };
        const parentSettled = ${parentConds.toSettle};
        for (const [id, attached] of doc.attachedDocs.entries())
          if (!attached._deleted && ${conds.toEmit}) {
            const settled = parentSettled && ${conds.toSettle};
            const key = ${key};
            emit(
              key,
              {
                count: 1,
                docs: [
                  {
                    doc: { ...attached, parentDoc },
                    key
                  }
                ],
                settled
              }
            );
          }
      }
    }
  `);

  const reduce = uglify(`
    function (keys, values, rereduce) {
      /* ${uniqueId()} */
      let count = 0;
      let docs = [];
      let settled = false;
      for (const value of values) {
        count += value.count;
        docs.push(...value.docs);
        settled = value.settled;
      }
      return { count, docs, settled };
    }
  `);

  return {
    groupLevel: queryOptions.count ?? false ? 1 : 4,
    id,
    mapReduce: { map, reduce },
    output: createFilterAttached(conds.toOutput, parentConds.toOutput),
    settle: createFilterAttached(conds.toSettle, parentConds.toSettle)
  };
}

interface Conds {
  readonly toEmit: string;
  readonly toOutput: string;
  readonly toSettle: string;
}

/**
 * Joins condition strings with boolean "and" operator.
 *
 * @param conditions - Condition strings.
 * @returns Joined condition string.
 */
function and(conditions: strings): string {
  conditions = conditions.filter(condition => condition !== "true");

  if (conditions.length === 0) return "true";

  assert.toBeFalse(conditions.includes("false"));

  return conditions.join(" && ");
}

/**
 * Converts conditions to condition strings.
 *
 * @param source - Source.
 * @param conditions - Conditions.
 * @returns Condition strings.
 */
function condsToStr(
  source: "attached" | "doc",
  conditions: database.Conditions
): Conds {
  conditions = is.array(conditions) ? conditions : [conditions];

  const toEmit: Writable<strings> = [];

  const toOutput: Writable<strings> = [];

  const toSettle: Writable<strings> = [];

  for (const group of conditions)
    for (const [key, field] of o.entries(group)) {
      const dest = `${source}.${key}`;

      const destDelta = `new Date(${dest}).getTime() - Date.now()`;

      const empty = `${dest} === null || ${dest} === undefined`;

      const notEmpty = `${dest} !== null && ${dest} !== undefined`;

      if ("isSet" in field)
        toEmit.push(field.isSet ? `(${notEmpty})` : `(${empty})`);

      if ("eq" in field)
        toEmit.push(`(${notEmpty} && ${dest} === ${escapeJs(field.eq)})`);

      if ("neq" in field)
        toEmit.push(`(${notEmpty} && ${dest} !== ${escapeJs(field.neq)})`);

      if ("gt" in field)
        toEmit.push(`(${notEmpty} && ${dest} > ${escapeJs(field.gt)})`);

      if ("gte" in field)
        toEmit.push(`(${notEmpty} && ${dest} >= ${escapeJs(field.gte)})`);

      if ("lt" in field)
        toEmit.push(`(${notEmpty} && ${dest} < ${escapeJs(field.lt)})`);

      if ("lte" in field)
        toEmit.push(`(${notEmpty} && ${dest} <= ${escapeJs(field.lte)})`);

      if ("dateEq" in field) {
        const value = dateValue(field.dateEq);

        const delta = dateDelta(value, -50 * 3600 * 1000);

        toEmit.push(`(${dest} && ${destDelta} > ${delta})`);
        toSettle.push(`(${destDelta} < ${delta})`);
        toOutput.push(`(${dest} === ${escapeJs(value)})`);
      }

      if ("dateNeq" in field) {
        const value = dateValue(field.dateNeq);

        const delta = dateDelta(value, -50 * 3600 * 1000);

        toEmit.push(`(${dest} && ${destDelta} > ${delta})`);
        toSettle.push(`(${destDelta} < ${delta})`);
        toOutput.push(`(${dest} !== ${escapeJs(value)})`);
      }

      if ("dateGt" in field) {
        const value = dateValue(field.dateGt);

        const delta = dateDelta(value, -50 * 3600 * 1000);

        toEmit.push(`(${dest} && ${destDelta} > ${delta})`);
        toSettle.push(`(${destDelta} < ${delta})`);
        toOutput.push(`(${dest} > ${escapeJs(value)})`);
      }

      if ("dateGte" in field) {
        const value = dateValue(field.dateGte);

        const delta = dateDelta(value, -50 * 3600 * 1000);

        toEmit.push(`(${dest} && ${destDelta} > ${delta})`);
        toSettle.push(`(${destDelta} < ${delta})`);
        toOutput.push(`(${dest} >= ${escapeJs(value)})`);
      }

      if ("dateLt" in field) {
        const value = dateValue(field.dateLt);

        const delta = dateDelta(value, -50 * 3600 * 1000);

        toEmit.push(`${dest}`);
        toSettle.push(`(${destDelta} < ${delta})`);
        toOutput.push(`(${dest} < ${escapeJs(value)})`);
      }

      if ("dateLte" in field) {
        const value = dateValue(field.dateLte);

        const delta = dateDelta(value, -50 * 3600 * 1000);

        toEmit.push(`${dest}`);
        toSettle.push(`(${destDelta} < ${delta})`);
        toOutput.push(`(${dest} <= ${escapeJs(value)})`);
      }
    }

  return {
    toEmit: and(toEmit),
    toOutput: and(toOutput),
    toSettle: and(toSettle)
  };
}

/**
 * Creates filter function.
 *
 * @param conds - Conditions.
 * @returns Filter function.
 */
function createFilter(conds: string): Filter {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func, no-type-assertion/no-type-assertion -- ???
  return new Function("doc", `return ${conds};`) as Filter;
}

/**
 * Creates filter function.
 *
 * @param conds - Conditions.
 * @param parentConds - Parent conditions.
 * @returns Filter function.
 */
function createFilterAttached(conds: string, parentConds: string): Filter {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func, no-type-assertion/no-type-assertion -- ???
  return new Function(
    "attached",
    uglify(`
      doc = attached.parentDoc;
      return ${conds} && ${parentConds};
    `)
  ) as Filter;
}

/**
 * Calculate delta between given date and now.
 *
 * @param date - Date.
 * @param offset - Offset.
 * @returns Delta.
 */
function dateDelta(date: string, offset: number): number {
  return num.round.step(
    datetime.create(date).toTime() - datetime.time() + offset,
    3600 * 1000
  );
}

/**
 * Creates date string from date condition.
 *
 * @param date - Date condition.
 * @returns Date string.
 */
function dateValue(date: database.DateCondition): string {
  if (is.string(date)) return date;

  if (date.length === 1) date = [date[0], "+", 0, "minutes"];

  const [type, sign, value, unit] = date;

  const result = datetime.create();

  switch (type) {
    case "endOfDay":
      result.setStartOfDay().add(1, "day");

      break;

    case "endOfHour":
      result.setStartOfHour().add(1, "hour");

      break;

    case "endOfMonth":
      result.setStartOfMonth().add(1, "month");

      break;

    case "endOfWeek":
      result.setStartOfWeekLocale().add(1, "week");

      break;

    case "now":
      break;

    case "startOfDay":
      result.setStartOfDay();

      break;

    case "startOfHour":
      result.setStartOfHour();

      break;

    case "startOfMonth":
      result.setStartOfMonth();

      break;

    case "startOfWeek":
      result.setStartOfWeekLocale();
  }

  switch (sign) {
    case "-":
      result.sub(value, unit);

      break;

    case "+":
      result.add(value, unit);
  }

  return result.toString();
}

/**
 * Escapes value for use in map/reduce function.
 *
 * @param value - Value.
 * @returns Escaped value.
 */
function escapeJs(value: unknown): string {
  switch (typeof value) {
    case "boolean":
      return value ? "true" : "false";

    case "number":
      return cast.string(value);

    case "string":
      return json.encode(value);

    default:
      throw new Error(`Unexpected value type: ${typeof value}`);
  }
}

/**
 * Uglify javascript code.
 *
 * @param code - Code.
 * @returns Uglified code.
 */
function uglify(code: string): string {
  return code.trim().replace(/\s+/gu, " ");
}
