export const sortPlayersByName = players => {
  return players.sort((a, b) => (a.name > b.name ? 1 : -1));
};
