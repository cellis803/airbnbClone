 module.exports = function () {
 
       this.When(/^I click on "([^"]*)"$/, function (button, done) {                                                                                                                               
            driver.findElements(by.xpath("//button[./text()='" + button + "']")).then(function (elements) {
                elements[0].click().then(function() {
                    done();
                });
                                                                                                                                                               
            });                                                                                                                                                                    
       });    

     this.Then(/^I should see the add new listing page$/, function (done) {                                                                                                                    
            driver.findElements(by.xpath("//h3[contains(text(),'Add a Listing')]")).then(function (elements) {
                expect(elements.length).to.not.equal(0);         
                done(); 
                                                                                                                                                                                
            });                                                                                                                                                               
       }); 

       this.When(/^I enter "([^"]*)" into the "([^"]*)" field$/, function (text, field, done) {                                                                                                   
           
            driver.findElements(by.xpath("//div[span[contains(text(),'" + field + "')]]/descendant::input")).then(function (elements) {
                expect(elements.length).to.not.equal(0);
                //elements[0].findElements(by.xpath("input")).then(function(inputs) {
                    elements[0].sendKeys(text).then(function() {
                        done();
                    });
                //});
                                                                                                                                                                               
            });                                                                                                                                                                    
       })   

      this.Then(/^I should see my new listing$/, function (callback) {                                                                                                                              
         // Write code here that turns the phrase above into concrete actions                                                                                                                        
         callback(null, 'pending');                                                                                                                                                                  
       });                  

};
 
