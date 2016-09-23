 module.exports = function () {
 
       this.Then(/^I should see the Edit Listing page$/, function (done) {                                                                                                                                  
            driver.wait(until.elementsLocated(by.xpath("//h3[contains(text(),'Edit Listing')]")), 30000);  
            driver.findElements(by.xpath("//h3[contains(text(),'Edit Listing')]")).then(function (elements) {
                expect(elements.length).to.not.equal(0);    
                driver.findElements(by.xpath("//div[span[contains(text(),'Title')]]/descendant::input"));
                done();

                                                                                                                                                                                
            });                                                                                                                                                                          
       }); 

       this.Then(/^the listing should be deleted$/, function (done) {                                                                                                                                       
         //console.log(shared.server.currentlyEditing);                                                                                                                                  
         done();                                                                                                                                                                             
       });          

};