const portfinder = require('portfinder')
const puppeteer = require('puppeteer')

const app = require('../../meadowlark.js')

let server = null
let port = null

beforeEach(async () => {
  // jest based hooks
  port = await portfinder.getPortPromise()
  server = app.listen(port)
})

afterEach(() => {
  // jest based hooks
  server.close()
})

test('home page links to about page', async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(`http://localhost:${port}`)
  await Promise.all([
    page.waitForNavigation(),
    // sets puppeteer to expect page change
    page.click('[data-test-id="about"]'),
    // searches for tag with about set as data-test-id
  ])
  expect(page.url()).toBe(`http://localhost:${port}/about`)
  await browser.close()
})