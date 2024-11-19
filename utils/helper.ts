export function multiSelection(item: any, selectedItems: any) {
  const index = selectedItems.indexOf(item);

  if (index === -1) {
    // Item not in the list, add it
    selectedItems.push(item);
  } else {
    // Item already in the list, remove it
    selectedItems.splice(index, 1);
  }

  return selectedItems;
}

export const isMatchAvailable = (array, matchId) => {
  return array.some((item) => item.matchDetails.matchId === matchId);
};

export const getDayByMatchId = (array, matchId) => {
  const match = array.find((item) => item.matchDetails.matchId === matchId);
  return match ? match.day : null; // Return the day object or null if not found
};
