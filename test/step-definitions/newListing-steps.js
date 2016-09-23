 module.exports = function () {
 
       this.When(/^I click on "([^"]*)"$/, function (button, done) { 
            driver.wait(until.elementsLocated(by.xpath("//button[./text()='" + button + "']")), 30000);                                                                                                                              
            driver.findElements(by.xpath("//button[./text()='" + button + "']")).then(function (elements) {
                elements[0].click().then(function() {
                    done();
                });
                                                                                                                                                               
            });                                                                                                                                                                    
       });    

     this.Then(/^I should see the add new listing page$/, function (done) {                                                                                                                    
            driver.wait(until.elementsLocated(by.xpath("//h3[contains(text(),'Add a Listing')]")), 30000);  
            driver.findElements(by.xpath("//h3[contains(text(),'Add a Listing')]")).then(function (elements) {
                expect(elements.length).to.not.equal(0);         
                done(); 
                                                                                                                                                                                
            });                                                                                                                                                               
       }); 

       this.When(/^I enter "([^"]*)" into the "([^"]*)" field$/, function (text, field, done) {                                                                                                   
            driver.wait(until.elementsLocated(by.xpath("//div[span[contains(text(),'" + field + "')]]/descendant::input|//div[span[contains(text(),'" + field + "')]]/descendant::textarea")), 30000);
            driver.findElements(by.xpath("//div[span[contains(text(),'" + field + "')]]/descendant::input|//div[span[contains(text(),'" + field + "')]]/descendant::textarea")).then(function (elements) {
                expect(elements.length).to.not.equal(0);
                    elements[0].sendKeys(text).then(function() {
                        done();
                    });                                                                                                                                                                  
            });                                                                                                                                                                    
       })   

      this.When(/^I select "([^"]*)" in the "([^"]*)" field$/, function (option, field, done) {                                                                                                    
            driver.wait(until.elementsLocated(by.xpath("//div[span[contains(text(),'" + field + "')]]/descendant::select/option[text()='" + option + "']")), 30000);
            driver.findElements(by.xpath("//div[span[contains(text(),'" + field + "')]]/descendant::select/option[text()='" + option + "']")).then(function (elements) {
                expect(elements.length).to.not.equal(0);
                    elements[0].click().then(function() {
                        done();
                    });                                                                                                                                                                  
            });                                                                                                                                                                    
       });        

      this.Then(/^I should see my new listing$/, function (done) {          
            driver.wait(until.elementsLocated(by.xpath("//h3[contains(text(),'Cucumber Test Listing')]")), 30000);      
            driver.findElements(by.xpath("//h3[contains(text(),'Cucumber Test Listing')]")).then(function (elements) {
                expect(elements.length).to.not.equal(0);         
                done(); 
                                                                                                                                                                                
            });  
       });    

      this.When(/^I upload "([^"]*)" as my image$/, function (absoluteFilePath, done) {    
            driver.wait(until.elementsLocated(by.xpath("//input[@type='file']")), 30000);                                                                                                         
            driver.findElements(by.xpath("//input[@type='file']")).then(function (elements) {
                expect(elements.length).to.not.equal(0);
                elements[0].sendKeys(absoluteFilePath).then(function() {
                    done();
                });                                                                                                                                                         
            });                     
      });
};
 
