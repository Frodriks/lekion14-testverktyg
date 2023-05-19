// Includes

const { Builder, By, Key, until } = require('selenium-webdriver');
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('assert');

/*
    Som kund,
    vill jag ha möjlighet att lägga till och ta bort produkter ur min kundkorg, 
    för att kunna redigera den innan jag checkar ut för betalning
*/

// Test: Lägg till/ta bort produkt ur kundkorg
describe('Lägg till produkt i kundkorg', () => {
    // Testfall
    context('Jag lägger till en produkt i kundkorgen och sedan tar jag bort den', () => {
        it('Jag öppnar kundkorgen och den är tom', async () => {
            const driver = await new Builder().forBrowser('firefox').build();
            try {
                // Gå till butiken
                await driver.get('https://magento.softwaretestingboard.com/');

                // Gå till en produkt     (Den grabbar bara tag i first-child, även om jag skriver nth-child(X))
                await driver.wait(until.elementLocated(By.css('.product-item :first-child')), 10000);
                await driver.findElement(By.css('.product-item :first-child')).click();

                await driver.sleep(2000);

                // Välj storlek på produkten
                await driver.wait(until.elementLocated(By.id('option-label-size-143-item-166')), 10000);
                await driver.findElement(By.id('option-label-size-143-item-166')).click();

                // Välj färg på produkten
                await driver.findElement(By.id('option-label-color-93-item-57')).click();

                // Lägg till produkten i kundkorgen
                await driver.findElement(By.id('product-addtocart-button')).click();

                await driver.sleep(2000);

                // Öppna kundkorgen
                await driver.wait(until.elementLocated(By.css('.action.showcart')), 10000);
                await driver.findElement(By.css('.action.showcart')).click();

                

                // Ta bort produkten från kundkorgen
                await driver.findElement(By.css('.action.delete')).click();

                await driver.sleep(2000);

                // Bekräfta att du vill ta bort produkten från kundkorgen
                await driver.wait(until.elementLocated(By.css('.action-accept')), 10000);
                await driver.findElement(By.css('.action-accept')).click();

                await driver.sleep(2000);

                // Konrollera så att kundkorgen är tom
                await driver.wait(until.elementLocated(By.id('ui-id-1')), 10000);
                const information = await driver.findElement(By.id('ui-id-1')).getText();

                // Asserts
                information.should.contain('You have no items');
                // assert.equal(information, "You have no items in your shopping cart.");
                expect(information).to.equal("You have no items in your shopping cart.");

            } finally {
                await driver.quit();
            }
        });
    });
});