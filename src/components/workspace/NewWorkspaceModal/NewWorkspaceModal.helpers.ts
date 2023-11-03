export const countUIDs = (uids: string) => {
  const uidArray = uids
    .trim()
    .split(" ")
    .filter((uid) => uid !== "");

  return uidArray.length;
};
