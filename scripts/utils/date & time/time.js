
export function convertToTimestamp(dateString) {
  
  const currentYear = new Date().getFullYear();
  
  // Remove the day of the week and append the current year
  const cleaned = dateString.replace(/^.*?, /, ''); // removes "Monday, "

  // Create a new date string with the current year
  return new Date(`${cleaned}, ${currentYear}`).getTime();
}