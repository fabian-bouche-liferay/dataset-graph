export const resolveDisplayValue = (val) => {
  if (typeof val === "object" && val !== null) {
    const keys = Object.keys(val);
    if (keys.length === 1 && keys.includes("name")) return val.name;
    if (keys.length === 1 && keys.includes("key")) return val.key;
    if (keys.length === 1 && keys.includes("title")) return val.title;
    return "[objet complexe]";
  }
  return val;
};

export const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, part) => acc?.[part], obj);

export const groupDate = (raw, mode) => {
  const date = new Date(raw);
  if (isNaN(date)) return "Invalide";

  switch (mode) {
    case "day":
      return date.toISOString().split("T")[0];
    case "week": {
      const firstDay = new Date(date.setDate(date.getDate() - date.getDay()));
      return `Week of ${firstDay.toISOString().split("T")[0]}`;
    }
    case "month":
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    case "year":
      return `${date.getFullYear()}`;
    default:
      return raw;
  }
};