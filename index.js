const os = require('os')
const {readFile} = require('fs-extra')
const {resolve} = require('path')

module.exports = function nowToken(options = {}) {
  const {NOW_TOKEN} = process.env
  if (NOW_TOKEN) {
    return Promise.resolve(NOW_TOKEN)
  }

  const {
    provider = 'sh'
  } = options

  const path = resolve(os.homedir(), '.now/auth.json')

  return readFile(path, 'utf8')
    .then(JSON.parse)
    .then(auth => {
      const creds = auth.credentials.filter(cred => cred.provider === provider)
      if (creds.length) {
        return creds[0].token
      } else {
        throw new Error(`No credentials for provider "${provider}" found in ${path}`)
      }
    })
}
