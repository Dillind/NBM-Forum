export const formatDate = (dateCreated: string) => {
  return new Date(dateCreated).toLocaleDateString().replace(/\//g, "-");
};
