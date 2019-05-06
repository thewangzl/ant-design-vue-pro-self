function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [20, 40, 56, 10, 30, 33];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
