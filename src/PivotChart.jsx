import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { useAggregatedData } from "./hooks/useAggregatedData";
import ChartConfigurator from "./ChartConfigurator";
import MultiPieChart from "./MultiPieChart";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const PivotChart = ({ items, fields, colors }) => {
  const [xFields, setXFields] = useState([]);
  const [xGroupings, setXGroupings] = useState({});
  const [yMethod, setYMethod] = useState("count");
  const [yField, setYField] = useState("");

  const xOptions = fields.filter(f => f.isDisplayableObject);
  const yNumericFields = fields.filter(f => f.type === "integer");

  const { chartData, pieData } = useAggregatedData(
    items,
    xFields,
    xGroupings,
    yMethod,
    yField,
    fields,
    colors
  );

  return (
    <>
      {chartData ? (
        <>
          <ChartConfigurator
            xFields={xFields}
            setXFields={setXFields}
            xGroupings={xGroupings}
            setXGroupings={setXGroupings}
            xOptions={xOptions}
            fields={fields}
            yMethod={yMethod}
            setYMethod={setYMethod}
            yField={yField}
            setYField={setYField}
            yNumericFields={yNumericFields}
          />        
          {chartData && xFields.length <= 1 && (
            <Bar data={chartData} options={{ responsive: true }} />
          )}

          {chartData && xFields.length >= 2 && (
            <MultiPieChart aggregated={pieData} colors={colors} />
          )}
        </>
      ) : (
        <p>No data to display</p>
      )}
    </>
  );
};

export default PivotChart;
