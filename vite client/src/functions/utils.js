//FOR GETTING RANDOM NUMBERS WITHIN A RANGE
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const getTime = (timestamp) => {
  if (timestamp === undefined) return null;
  const date = new Date(timestamp.toString());

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate.toString();
};
