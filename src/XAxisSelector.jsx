import React from "react";
import List from "@clayui/list";

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
        const isDate = field?.type === "date" || field?.renderer === "date";
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

            <List.ItemField>
              <List.QuickActionMenu>
                {index > 0 && (
                  <List.QuickActionMenu.Item
                    symbol="order-arrow-up"
                    title="Monter"
                    onClick={() => {
                      const updated = [...xFields];
                      [updated[index - 1], updated[index]] = [
                        updated[index],
                        updated[index - 1],
                      ];
                      setXFields(updated);
                    }}
                  />
                )}
                {index < xFields.length - 1 && (
                  <List.QuickActionMenu.Item
                    symbol="order-arrow-down"
                    title="Descendre"
                    onClick={() => {
                      const updated = [...xFields];
                      [updated[index], updated[index + 1]] = [
                        updated[index + 1],
                        updated[index],
                      ];
                      setXFields(updated);
                    }}
                  />
                )}
                <List.QuickActionMenu.Item
                  symbol="times"
                  title="Remove"
                  onClick={() => {
                    setXFields((prev) =>
                      prev.filter((f) => f !== field.name)
                    );
                  }}
                />
              </List.QuickActionMenu>
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
            <List.QuickActionMenu>
                <List.QuickActionMenu.Item
                    symbol="plus"
                    title="Add"
                    onClick={() => handleAddField(field.name)}
                />
            </List.QuickActionMenu>
          </List.ItemField>
        </List.Item>
      ))}
    </List>
  );
};

export default XAxisSelector;