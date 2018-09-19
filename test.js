const {readFile} = require('fs-extra')
const getToken = require('./')

jest.mock('fs-extra')

const env = Object.assign({}, process.env)

afterEach(() => {
  process.env = env
})

describe('getToken()', () => {
  it('respects process.env.NOW_TOKEN', () => {
    const token = String(Date.now())
    process.env.NOW_TOKEN = token
    expect(getToken()).resolves.toEqual(token)
  })

  it('ignores process.env.NOW_TOKEN if empty', () => {
    const token = String(Date.now())
    process.env.NOW_TOKEN = ''
    mockAuthJSON({credentials: [{provider: 'sh', token}]})
    expect(getToken()).resolves.toEqual(token)
  })

  it('gets the token from credentials[] with default provider "sh"', () => {
    const token = 'deadhead'
    mockAuthJSON({credentials: [{provider: 'sh', token}]})
    expect(getToken()).resolves.toEqual(token)
  })

  it('gets the token from credentials[] with custom provider', () => {
    const provider = 'github'
    const token = 'bedhead'
    mockAuthJSON({credentials: [{provider, token}]})
    expect(getToken({provider})).resolves.toEqual(token)
  })

  it('throws when the default provider is missing', () => {
    const token = 'redhead'
    mockAuthJSON({credentials: [{provider: 'no', token}]})
    expect(getToken()).rejects.toThrow()
  })

  it('throws when a custom provider is missing', () => {
    const token = 'leadhead'
    const provider = 'github'
    mockAuthJSON({credentials: [{provider: 'sh', token}]})
    expect(getToken({provider})).rejects.toThrow()
  })

})

function mockAuthJSON(data) {
  readFile.mockResolvedValueOnce(JSON.stringify(data))
}
