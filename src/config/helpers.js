function formatResponseSuccess(action, actionFor) {
	return `Successfully ${action} ${actionFor}`
}

function formatResponseAboutTo(action, actionFor) {
	return `About to ${action} ${actionFor}`
}


module.exports = {
  formatResponseSuccess,
  formatResponseAboutTo
}
