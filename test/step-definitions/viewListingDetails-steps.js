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
};