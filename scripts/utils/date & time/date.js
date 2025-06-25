

export function readableDate(dateData) {

  const date = new Date(dateData);

  // Output example: "Month Day, Year"
  const convertDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return convertDate;
}