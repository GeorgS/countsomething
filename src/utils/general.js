
export const today = function today() {
  const date = new Date();
  return date.getYear() + '' + date.getMonth() + '' + date.getDay();
};
