import React from "react";
import List from "@clayui/list";
import Button from '@clayui/button';

const XAxisSelector = ({
  xFields,
  setXFields,
  xGroupings,
  setXGroupings,
  xOptions = [],
  fields = [],
}) => {
  const updateGrouping = (fieldName, value) => {
    setXGroupings((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

    const handleAddField = (fieldName) => {
    setXFields((prev) => {
        if (prev.includes(fieldName)) return prev;
        if (prev.length >= 2) return prev;
        return [...prev, fieldName];
    });
    };

  const selectedFields = xFields.map((name) =>
    fields.find((f) => f.name === name)
  );
  const availableFields = xOptions.filter((f) => !xFields.includes(f.name));

  return (
    <List>
      <List.Header>Selected category fields</List.Header>
      {selectedFields.map((field, index) => {
        const isDate = field?.type === "date" || field?.renderer === "date" || field?.type === "dateTime" || field?.renderer === "dateTime";
        return (
          <List.Item key={field.name} flex>
            <List.ItemField expand>
              <List.ItemTitle>{field.label}</List.ItemTitle>
              {isDate && (
                <select
                  className="form-control form-control-sm mt-1"
                  value={xGroupings[field.name] || "none"}
                  onChange={(e) =>
                    updateGrouping(field.name, e.target.value)
                  }
                >
                  <option value="none">— No grouping —</option>
                  <option value="day">Group by day</option>
                  <option value="week">Group by week</option>
                  <option value="month">Group by month</option>
                  <option value="year">Group by year</option>
                </select>
              )}
            </List.ItemField>

            {index > 0 && (
              <List.ItemField>
                <Button
                  className="btn-secondary"
                  onClick={() => {
                    const updated = [...xFields];
                    [updated[index - 1], updated[index]] = [
                      updated[index],
                      updated[index - 1],
                    ];
                    setXFields(updated);
                  }}
                >
                  Up
                </Button>
              </List.ItemField>
            )}

            {index < xFields.length - 1 && (
              <List.ItemField>
                <Button
                  className="btn-secondary"
                  onClick={() => {
                    const updated = [...xFields];
                    [updated[index], updated[index + 1]] = [
                      updated[index + 1],
                      updated[index],
                    ];
                    setXFields(updated);
                  }}
                >
                  Down
                </Button>
              </List.ItemField>
            )}

            <List.ItemField>
              <Button
                className="btn-secondary"
                onClick={() => {
                  setXFields((prev) =>
                    prev.filter((f) => f !== field.name)
                  );
                }}
              >
                Del
              </Button>
            </List.ItemField>
          </List.Item>
        );
      })}

      <List.Header>Available fields</List.Header>
      {availableFields.map((field) => (
        <List.Item
          key={field.name}
          flex
        >
          <List.ItemField expand>
            <List.ItemTitle>{field.label}</List.ItemTitle>
          </List.ItemField>

          <List.ItemField>
            <Button
              className="btn-secondary"
              onClick={() => handleAddField(field.name)}
            >
              Add
            </Button>
          </List.ItemField>
        </List.Item>
      ))}
    </List>
  );
};

export default XAxisSelector;