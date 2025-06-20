import React from "react";

const YAxisSelector = ({
  yMethod,
  setYMethod,
  yField,
  setYField,
  yNumericFields,
}) => {
  return (
    <div className="my-4">
      <strong>Value aggregation</strong>
      <select
        className="form-control form-control-sm mt-1"
        value={yMethod}
        onChange={(e) => setYMethod(e.target.value)}
      >
        <option value="count">Count</option>
        <option value="sum">Sum</option>
        <option value="avg">Average</option>
      </select>

      {(yMethod === "sum" || yMethod === "avg") && (
        <select
          className="form-control form-control-sm mt-2"
          value={yField}
          onChange={(e) => setYField(e.target.value)}
        >
          <option value="">- Numeric field -</option>
          {yNumericFields.map((f) => (
            <option key={f.name} value={f.name}>
              {f.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default YAxisSelector;
