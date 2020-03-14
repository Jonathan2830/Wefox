
const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');

(async function main() {
  let driver = await new Builder().forBrowser('chrome').build();

    await driver.get("https://my.wefox.de/login");

	const user = By.id("user_name");
	const password = By.id("password");
    const login = By.className("wf-c-btn--primary wf-c-btn--block-xs");
	const image = By.className("wf-c-header-agent__image wf-u-mb-8");
	const contracts = By.xpath("/html/body/div[1]/div[2]/div[2]/ul/li[2]/a");
	const contractsLabel = By.className("h1 wf-u-pt-24 wf-u-pb-12");
    const profile = By.xpath("/html/body/div[1]/div[2]/div[2]/ul/li[5]/a");
    const personalDetails = By.className("wf-c-card wf-u-h-100");
    const firstName = By.id("first_name");
    const lastName = By.id("last_name");
    const street = By.id("street");
    const zipCode = By.id("zip_code");
    const city = By.id("city");
    const birthdate = By.id("birthdate");
    const email = By.id("email");
    const phone = By.id("phone");
    var jsonArray = [];
	const logout = By.xpath("/html/body/div[1]/div[2]/div[2]/ul/li[6]/a");
    const image2 = By.className("fusion-top-level-link fusion-bar-highlight");

    driver.getCurrentUrl().then(function(value){
        if(value !== 'https://my.wefox.de/login'){
          console.log("The page loaded is not the expected one");
          driver.quit();
        }else{
	driver.wait(until.elementLocated(user),3000).then(function(element) {
        
        driver.findElement(user).sendKeys('aqawefox+testtecnico@wefoxgroup.com');

            driver.wait(until.elementLocated(password),3000).then(function(element) {

                driver.findElement(password).sendKeys('qwertyasdf');

                driver.wait(until.elementLocated(login),3000).then(function(element) {

                    driver.findElement(login).click();

                    driver.wait(until.elementLocated(image),3000).then(function(element) {

                        driver.wait(until.elementLocated(contracts),3000).then(function(element) {
                            driver.wait(until.elementIsVisible(driver.findElement(contracts)), 10000).then(() => {

                            driver.findElement(contracts).click();

                            driver.wait(until.elementLocated(contractsLabel),3000).then(function(element) {
                                driver.wait(until.elementIsVisible(driver.findElement(contractsLabel)), 10000).then(() => {
                                driver.findElement(contractsLabel).getText().then(function(value){
                                    if(value !== 'No contracts added'){
                                        console.log("The text is not expected");
                                        driver.quit();
                                    }else{
                                        driver.wait(until.elementLocated(profile),3000).then(function(element) {
                                            driver.wait(until.elementIsVisible(driver.findElement(profile)), 10000).then(() => {

                                                driver.findElement(profile).click();

                                                driver.wait(until.elementLocated(personalDetails),3000).then(function(elm) {
                                                    driver.wait(until.elementIsVisible(driver.findElement(personalDetails)), 3000).then(() => {

                                                        driver.findElement(personalDetails).click();

                                                        driver.wait(until.elementLocated(firstName),3000).then(function(element) {
                                                            driver.wait(until.elementIsVisible(driver.findElement(firstName)), 10000).then(() => {
                                                                 driver.findElement(firstName).getAttribute("value").then(function(value){
                                                                    jsonArray.push({"firstName" : value});
                                                                 });
                                                            });
                                                            driver.wait(until.elementIsVisible(driver.findElement(lastName)), 10000).then(() => {
                                                                 driver.findElement(lastName).getAttribute("value").then(function(value){
                                                                     jsonArray.push({"lastName" : value});
                                                                 });
                                                            });
                                                            driver.wait(until.elementIsVisible(driver.findElement(street)), 10000).then(() => {
                                                                 driver.findElement(street).getAttribute("value").then(function(value){
                                                                     jsonArray.push({"street" : value});
                                                                 });
                                                            });
                                                            driver.wait(until.elementIsVisible(driver.findElement(zipCode)), 10000).then(() => {
                                                                 driver.findElement(zipCode).getAttribute("value").then(function(value){
                                                                     jsonArray.push({"zipCode" : value});
                                                                 });
                                                            });
                                                            driver.wait(until.elementIsVisible(driver.findElement(city)), 10000).then(() => {
                                                                 driver.findElement(city).getAttribute("value").then(function(value){
                                                                     jsonArray.push({"city" : value});
                                                                 });
                                                            });
                                                            driver.wait(until.elementIsVisible(driver.findElement(birthdate)), 10000).then(() => {
                                                                 driver.findElement(birthdate).getAttribute("value").then(function(value){
                                                                     jsonArray.push({"birthdate" : value});
                                                                 });
                                                            });
                                                            driver.wait(until.elementIsVisible(driver.findElement(email)), 10000).then(() => {
                                                                 driver.findElement(email).getAttribute("value").then(function(value){
                                                                    jsonArray.push({"email" : value});
                                                                 });
                                                            });
                                                            driver.wait(until.elementIsVisible(driver.findElement(phone)), 10000).then(() => {
                                                                 driver.findElement(phone).getAttribute("value").then(function(value){
                                                                    jsonArray.push({"phone" : value});
                                                                     var jsonData = JSON.stringify(jsonArray);
                                                                        fs.writeFile("wefox.json", jsonData, function(error) {
                                                                            if (error) {
                                                                                console.log(err);
                                                                            }
                                                                        });

                                                                        fs.readFile('wefox.json', 'utf8', (error, jsonString) => {
                                                                            if (error) {
                                                                                console.log("File read failed:", error);
                                                                                return
                                                                            }
                                                                            console.log('Personal information: ', jsonString); 

                                                                            driver.wait(until.elementLocated(logout),3000).then(function(element) {
                
                                                                            driver.findElement(logout).click();     
                                                                                 driver.wait(until.elementLocated(image2),4000).then(function(element) {
                                                                                    driver.getCurrentUrl().then(function(value){
                                                                                        if(value !== 'https://www.wefox.de/'){
                                                                                          console.log("The page loaded is not the expected one");
                                                                                        }
                                                                                          driver.quit();
                                                                                        });
                                                                                     });
                                    
                                                                            }).catch(function(error) {
                                                                                console.log("The logout button is not present"); //COMPARAR LA PAGINA QUE SE CARGA DESPUES DEL LOAD
                                                                                driver.quit();
                                                                            });  

                                                                        })
                                                                 });
                                                            });

                                                        });

                                                    });
                                                });

                                            });
                                        });
                                    }
                                });
                                });  
                            }).catch(function(error) {
                                console.log("The text is not expected"); 
                                driver.quit();
                            });
                            });
                        }).catch(function(error) {
                            console.log("Contract side bar item is not present");
                            driver.quit();
                        });
                    }).catch(function(error) {
                        console.log("Agent broker image is not not loaded");
                        driver.quit();
                    });
                }).catch(function(error) {
                    console.log("Login button is not present");
                    driver.quit();
                });
            }).catch(function(error) {
                console.log("Password field is not present");
                driver.quit();
            });
    }).catch(function(error) {
        console.log("User_name field is not present");
        driver.quit();
    });

            }
    });

})();