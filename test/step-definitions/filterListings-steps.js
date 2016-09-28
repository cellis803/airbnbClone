 module.exports = function () {
 
       this.Then(/^there should be "([^"]*)" listings$/, function (numberOfListings, done) {                                                                                                                            
            driver.wait(until.elementsLocated(by.css('.airbnblisting')), 30000);
            driver.findElements(by.css('.airbnblisting')).then(function (elements) {
                expect(elements.length).to.equal(parseInt(numberOfListings));
                done(); 
                                                                                                                                                                                
            });                                                                                                                                                                            
       });
};