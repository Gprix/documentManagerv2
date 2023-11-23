export const getTitle = (isTemplate: boolean) => {
  const documentType = isTemplate ? "plantilla" : "acta";

  return `Título de la nueva ${documentType}`;
};
