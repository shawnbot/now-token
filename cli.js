const options = require('yargs').argv
const nowToken = require('./')

nowToken(options)
  .then(token => console.log(token))
  .catch(error => {
    console.error(`Error: ${error.message}`)
    process.exitCode = 1
  })
