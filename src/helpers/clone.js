export const deepCopy = H => {
  if (Array.isArray(H)) {
    var mas = [];
    for (var i = 0; i < H.length; i++) mas[i] = deepCopy(H[i]);
    return mas;
  }
  if (typeof H === "object") {
    var Hnew = {};
    for (var k in H) Hnew[k] = deepCopy(H[k]);
    return Hnew;
  }
  return H;
};
