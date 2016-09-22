module.exports = function () {
 
       this.Given(/^the airbnb application is started$/, function (done) {                                                                                                                                    
                                                                                                                                             
         done();                                                                                                                                                                         
       });  

       this.When(/^I navigate to the airbnb site$/, function (done) {                                                                                                                                                                                                                                                                              
         driver.get("http://localhost:8080");
         done();
                                                                                                                                                                   
       });  
 
      this.Then(/^I should see some listings$/, function (done) {                                                                                                                                            
            driver.wait(until.elementsLocated(by.css('.airbnblisting')), 30000);
    
            driver.findElements(by.css('.airbnblisting')).then(function (elements) {
                expect(elements.length).to.not.equal(0);
    
                done(); 
                                                                                                                                                                                
        });  
      });       
};
