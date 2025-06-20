import { getNestedValue, resolveDisplayValue, groupDate } from "../utils/pivotUtils";

import { useMemo } from "react";

export const useGroupedItems = (items, xFields, xGroupings, fields) => {
  return useMemo(() => {
    const groups = {};

    if (xFields.length === 0) {
      groups["Total"] = items;
    } else {
      items.forEach((item) => {
        const key = xFields
          .map((fieldName) => {
            const raw = getNestedValue(item, fieldName);
            const value = resolveDisplayValue(raw);
            const fieldMeta = fields.find((f) => f.name === fieldName);
            const grouping = xGroupings[fieldName] || "none";

            if (
              (fieldMeta?.type === "date" || fieldMeta?.renderer === "date") &&
              grouping !== "none"
            ) {
              return groupDate(value, grouping);
            }

            return value ?? "—";
          })
          .join(" | ");

        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
      });
    }

    return groups;
  }, [items, xFields, xGroupings, fields]);
};
