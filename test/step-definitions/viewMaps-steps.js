module.exports = function () {
 
       this.Then(/^I should see the Map View page$/, function (done) {                                                                                                                                      
            driver.wait(until.elementsLocated(by.css("#map")), 30000);                                                                                                                 
            driver.findElements(by.css("#map")).then(function (elements) {
                expect(elements.length).to.not.equal(0);
                done(); 
                                                                                                                                                                                
            });                                                                                                                                                                             
       });  

};