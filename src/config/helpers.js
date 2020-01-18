const fs = require('fs');

const formatResponseSuccess = (action, actionFor) => `Successfully ${action} ${actionFor}`;

const formatResponseAboutTo = (action, actionFor) => `About to ${action} ${actionFor}`;

const getLocationSeedDataFromFile = () => {
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  return data;
};

module.exports = {
  formatResponseSuccess,
  formatResponseAboutTo,
  getLocationSeedDataFromFile,
};
