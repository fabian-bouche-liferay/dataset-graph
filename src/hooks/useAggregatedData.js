import { useMemo } from "react";
import { useGroupedItems } from "./useGroupedItems";
import { getNestedValue } from "../utils/pivotUtils";

export const useAggregatedData = (items, xFields, xGroupings, yMethod, yField, fields, colors) => {
  const groups = useGroupedItems(items, xFields, xGroupings, fields);

  return useMemo(() => {
    const labels = Object.keys(groups).sort();

    const computeValue = (groupItems) => {
      if (yMethod === "count") return groupItems.length;

      const values = groupItems
        .map((i) => {
          const v = getNestedValue(i, yField);
          if (typeof v === "number") return v;
          if (v && typeof v.value === "number") return v.value;
          return null;
        })
        .filter((v) => typeof v === "number");

      if (values.length === 0) return 0;
      if (yMethod === "sum") return values.reduce((a, b) => a + b, 0);
      if (yMethod === "avg") return values.reduce((a, b) => a + b, 0) / values.length;

      return 0;
    };

    const data = labels.map((label) => computeValue(groups[label]));

    const chartData = {
      labels,
        datasets: [
            {
            label:
                yMethod === "count"
                ? "Count"
                : `${yField} (${yMethod})`,
            data,
            backgroundColor: colors?.length ? labels.map((_, i) => colors[i % colors.length]) : undefined,
            borderWidth: 1,
            },
        ],
    };

    let pieData = null;

    if (xFields.length >= 2) {
      pieData = {};
      labels.forEach((label, idx) => {
        const parts = label.split(" | ");
        const x1 = parts[0] ?? "—";
        const x2 = parts[1] ?? "—";

        if (!pieData[x1]) pieData[x1] = {};
        pieData[x1][x2] = data[idx];
      });
    }

    return { chartData, pieData };
  }, [groups, yMethod, yField, xFields]);
};
