 module.exports = function () {
 
       this.When(/^I click on a listing$/, function (done) {                                                                                                                                                
            driver.wait(until.elementsLocated(by.css(".listingImage")), 30000);                                                                                                                              
            driver.findElements(by.css(".listingImage")).then(function (elements) {
                elements[0].click().then(function() {
                    done();
                });                                                                                                                                               
            });                                                                                                                                                                           
       });  

       this.Then(/^I should see the listing details screen$/, function (done) {                                                                                                                             
            driver.wait(until.elementsLocated(by.css("#listing")), 30000);                                                                                                                 
            driver.findElements(by.css("#listing")).then(function (elements) {
                expect(elements.length).to.not.equal(0);
                done(); 
                                                                                                                                                                                
            });   
        });

       this.When(/^I click on Back to Listings$/, function (done) {                                                                                                                                         
            driver.wait(until.elementsLocated(by.xpath("//*[@id='navbar']/div/ul/li[1]/a")), 30000);                                                                                                                              
            driver.findElements(by.xpath("//*[@id='navbar']/div/ul/li[1]/a")).then(function (elements) {
                elements[0].click().then(function() {
                    done();
                });                                                                                                                                        
            }); 
       }); 

       this.Then(/^I should see my saved review$/, function (done) {                                                                                                                                        
            driver.wait(until.elementsLocated(by.css("#reviews")), 30000);                                                                                                                 
            driver.findElements(by.css("#reviews")).then(function (elements) {
                expect(elements.length).to.not.equal(0);
                done(); 
                                                                                                                                                                                
            });        
       }); 

       this.Then(/^I should see a confirmation message$/, function (done) {
            driver.wait(until.elementsLocated(by.xpath("//h2[contains(text(),'Reservation Confirmed')]")), 30000);                                                                                                                 
            driver.findElements(by.xpath("//h2[contains(text(),'Reservation Confirmed')]")).then(function (elements) {
                expect(elements.length).to.not.equal(0);
                done(); 
                                                                                                                                                                                
            });                                             
       });         
};