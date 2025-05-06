// Example shared utility functions

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

module.exports = {
  formatDate,
  isValidEmail
};