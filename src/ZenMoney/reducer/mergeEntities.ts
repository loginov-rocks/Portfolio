export default (oldArray, newArray) => {
  if (!oldArray && !newArray) {
    return [];
  }

  if (!oldArray) {
    return newArray;
  }

  const array = oldArray.slice();

  if (!newArray) {
    return array;
  }

  newArray.forEach(element => {
    const index = array.findIndex(({ id }) => id === element.id);

    if (index === -1) {
      array.push(element);
    } else {
      array[index] = element;
    }
  });

  return array;
};
