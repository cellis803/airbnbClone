 module.exports = function () {
 
       this.When(/^I click on Add Listing$/, function (done) {                                                                                                                                   
            
            driver.findElements(by.xpath("//button[contains(text(),'Add Listing')]")).then(function (elements) {
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

};
 
