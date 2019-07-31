export const parseScore = score => {
  if (score !== undefined) {
    return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return;
};

export default parseScore;

export const sortArrayByScores = scores => {
  return scores.sort((a, b) =>
    parseInt(b.score) > parseInt(a.score) ? 1 : -1
  );
};
