export const formatDate = function formatDate(date) {
  return date.getYear() + '' + date.getMonth() + '' + date.getDate();
};

export const today = function today() {
  const date = new Date();
  const tempDate = localStorage.getItem('tempDate');
  return tempDate || formatDate(date);
};
