// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('WrongLogin', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('WrongLogin', async function() {
    // Test name: WrongLogin
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    // 2 | setWindowSize | 1552x832 | 
    await driver.manage().window().setRect({ width: 1552, height: 832 })
    // 3 | click | id=email | 
    await driver.findElement(By.id("email")).click()
    // 4 | type | id=email | hanyelbob99@gmail.com
    await driver.findElement(By.id("email")).sendKeys("hanyelbob99@gmail.com")
    // 5 | click | id=password | 
    await driver.findElement(By.id("password")).click()
    // 6 | type | id=password | 123
    await driver.findElement(By.id("password")).sendKeys("123")
    // 7 | click | id=btn | 
    await driver.findElement(By.id("btn")).click()
    // 8 | assertElementPresent | id=login-error-msg | 
    {
      const elements = await driver.findElements(By.id("login-error-msg"))
      assert(elements.length)
    }
  })
})
