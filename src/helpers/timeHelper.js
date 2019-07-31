export const timeDifference = previous => {
  const current = new Date().getTime();
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " sekunder siden";
  } else if (elapsed < msPerHour) {
    return (
      Math.round(elapsed / msPerMinute) +
      (Math.round(elapsed / msPerMinute) === 1 ? " minutt" : " minutter") +
      " siden"
    );
  } else if (elapsed < msPerDay) {
    return (
      Math.round(elapsed / msPerHour) +
      (Math.round(elapsed / msPerHour) === 1 ? " time" : " timer") +
      " siden"
    );
  } else if (elapsed < msPerMonth) {
    return (
      "ca " +
      Math.round(elapsed / msPerDay) +
      (Math.round(elapsed / msPerDay) === 1 ? " dag" : " dager") +
      " siden"
    );
  } else if (elapsed < msPerYear) {
    return (
      "ca " +
      Math.round(elapsed / msPerMonth) +
      (Math.round(elapsed / msPerMonth) === 1 ? " måned" : " måneder") +
      " siden"
    );
  } else {
    return "ca " + Math.round(elapsed / msPerYear) + " år siden";
  }
};

export default timeDifference;
