// Helper function to format time in seconds to HH:MM:SS format
export const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}:`;
  }

  if (minutes < 10 && hours > 0) {
    formattedTime += `0${minutes}:`;
  } else {
    formattedTime += `${minutes}:`;
  }

  if (seconds < 10) {
    formattedTime += `0${seconds}`;
  } else {
    formattedTime += `${seconds}`;
  }

  if (hours === 0 && minutes === 0) {
    formattedTime = `0.${padNumber(seconds)}`;
  }
  // Helper function to pad single digit numbers with leading zeros

  return formattedTime;
};
const padNumber = (number) => {
  return number.toString().padStart(2, "0");
};
