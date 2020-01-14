const fs = require('fs')

formatResponseSuccess = (action, actionFor) => {
	return `Successfully ${action} ${actionFor}`
}

formatResponseAboutTo = (action, actionFor) => {
	return `About to ${action} ${actionFor}`
}

getLocationSeedDataFromFile = () => {
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
  return data
}

module.exports = {
  formatResponseSuccess,
  formatResponseAboutTo,
  getLocationSeedDataFromFile
}
