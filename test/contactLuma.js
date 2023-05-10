// Includes

const { Builder, By, Key, until } = require('selenium-webdriver');
const should = require ('chai').should();

/*
    Som kund,
    vill jag ha möjlighet att kontakta Luma,
    för att få svar på eventuella frågor jag har.
*/

// Test: Kontaktformulär
describe('Hitta kontakformulär', () => {
// Testfall
    context('Jag går till "Contact us", fyller i fälten och klickar på "Submit"', () => {
        it('Sidan uppdateras och ett meddelande dyker med en text i om att meddelandet tagist emot', async () => {
            const driver = await new Builder().forBrowser('firefox').build();
            try{
                // Gå till butiken
                await driver.get('https://magento.softwaretestingboard.com/');

                // Gå till "Contact us"
                //await driver.wait(until.elementLocated(By.css('a[href="https://magento.softwaretestingboard.com/contact/"]')), 10000);
                await driver.findElement(By.css('a[href="https://magento.softwaretestingboard.com/contact/"]')).click();

                // Gå till "Name"-fältet och fyll i det
                await driver.wait(until.elementLocated(By.id('name')), 10000);
                await driver.findElement(By.id('name')).sendKeys('Lars Larsson');

                // Gå till "Email"-fältet och fyll i det
                await driver.findElement(By.id('email')).sendKeys('Lars.Larsson@Larson.Lars');

                // Gå till "Phone Number"-fältet och fyll i det
                await driver.findElement(By.id('telephone')).sendKeys('001001110');

                // Gå till "What'on your mind?"-fältet och fyll i det
                await driver.findElement(By.id('comment')).sendKeys('Jag är inte nöjd med min leverans och vill göra en retur! Hur går jag till väga för att lyckas med detta?');

                // Skicka iväg formuläret
                await driver.findElement(By.css('.action.submit.primary')).click();

                // Vänta på att sidan ska ladda
                await driver.sleep(1000);

                // Hitta meddelandet om att de tagit emot formuläret
                await driver.wait(until.elementLocated(By.css('.message-success')), 10000);
                const information = await driver.findElement(By.css('.message-success')).getText();

                // Assert
                information.should.contain('Thanks for contacting us');

    
            } finally {
               // await driver.quit();
            }
        });
    });
});