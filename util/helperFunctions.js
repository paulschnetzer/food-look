export function findMatchingObjectBasedOnName(arrayOne, arrayTwo) {
  return arrayOne.filter((item1) =>
    arrayTwo.some((item2) => item2.name === item1.name),
  );
}

export function transformTheIngArray(actualarray) {
  return actualarray.map((item1) => item1.ing);
}

export function findMatchingObjectBasedOnIng(arrayOne, arrayTwo) {
  return arrayOne.filter((item1) =>
    arrayTwo.every((item2) => item1.ing.includes(item2)),
  );
}
