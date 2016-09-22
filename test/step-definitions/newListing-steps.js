 module.exports = function () {
 
       this.When(/^I click on Add Listing$/, function (done) {                                                                                                                                   
            
            driver.findElements(by.xpath("//button[contains(text(),'Add Listing')]")).then(function (elements) {
                elements[0].click();
                done(); 
                                                                                                                                                                                
            });                                                                                                                                                                                                                                                                                     
       });   


     this.Then(/^I should see the add new listing page$/, function (done) {                                                                                                                    
            driver.findElements(by.xpath("//h3[contains(text(),'Add A Listing')]")).then(function (elements) {
                done(); 
                                                                                                                                                                                
            });                                                                                                                                                               
       }); 

};
 
