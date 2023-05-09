// Includes
const {Builder, By, Key, until} = require('selenium-webdriver');
const should = require('chai').should();
require('dotenv').config();

// Login data
let user = process.env.USER;
let pass = process.env.PASS;

/*
    As a user of Luma Webstore,
    I would like to be able to login,
    so that i can see my profile
*/

// .only() = run only this test block // .skit() = skip this specific test
describe.only('Login to Luma Demostore', () => {
    context('I click on login and enter my credentials', () => {
        it('I should be logged in and see my profile', async () => {
            const driver = await new Builder().forBrowser('firefox').build();
            try {  
                // Go to store
                await driver.get('https://magento.softwaretestingboard.com/');
                // Go to login
                await driver.findElement(By.css('.authorization-link > a:nth-child(1)')).click();
                // Get the from (Username)
                await driver.wait(until.elementLocated(By.id('email')), 10000);
                // Send keys (Username)
                await driver.findElement(By.id('email')).sendKeys(user);
                // Get the form (Password)
                //await driver.wait(until.elementLocated(By.id('pass')), 10000);
                // Send key (Password)
                await driver.findElement(By.id('pass')).sendKeys(pass);

                // Click login
                await driver.findElement(By.css('#send2')).click();

                // Implicit wait to allow site to load
                await driver.sleep(1000);

                // Get to our profile
                await driver.wait(until.elementLocated(By.css('.action.switch')), 20000);
                await driver.findElement(By.css('.action.switch')).click();

                await driver.wait(until.elementLocated(By.css('a[href="https://magento.softwaretestingboard.com/customer/account/"]')), 10000);
                //await driver.wait(until.elementLocated(By.css('a[href$="/customer/account/"]')), 10000);
                await driver.findElement(By.css('a[href="https://magento.softwaretestingboard.com/customer/account/"]')).click();

                // Get and check our information
                await driver.wait(until.elementLocated(By.css('.box-information .box-content p')), 10000);
                const information = await driver.findElement(By.css('.box-information .box-content p')).getText();

                // Assert
                information.should.contain('Test Testsson');
            } finally {
                await driver.quit();
            }
        });
    });
});