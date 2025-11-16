const formatFieldValue = (value, field) => {
  if (value == null) return "—";

  // Gestion des dates
  if (field.type === "date" || field.renderer === "date" || field.type === "dateTime" || field.renderer === "dateTime") {
    const date = new Date(value);
    if (isNaN(date)) return "Invalide";
    return date.toLocaleDateString(); // ou toISOString() selon besoin
  }

  // Gestion des objets (ex: user, tag, asset, etc.)
  if (typeof value === "object") {
    if ("name" in value) return value.name;
    if ("title" in value) return value.title;
    if ("key" in value) return value.key;
    if ("value" in value && typeof value.value === "string") return value.value;

    return "[objet]";
  }

  // Valeurs primitives
  return String(value);
};

export default formatFieldValue;
