module.exports = function () {
 
       this.Given(/^the airbnb application is started$/, function (done) {                                                                                                                                    
                done();                                                                                                                                                                               
       });  

       this.When(/^I navigate to the airbnb site$/, function (done) {                                                                                                                                                                                                                                                                              
            driver.get("http://localhost:3000");
            driver.wait(until.elementLocated(by.css('h2.form-signin-heading')), 30000, 'Could not locate the child element within the time specified');
            done();    
       
                                                                                                                                                                   
       });  

      this.Given(/^I am logged in$/, function (done) {                                                                                                                                          
            done();                                                                                                                                                                
      });        
 
      this.Then(/^I should see some listings$/, function (done) {                                                                                                                                            
            driver.wait(until.elementsLocated(by.css('.airbnblisting')), 30000);
            driver.findElements(by.css('.airbnblisting')).then(function (elements) {
                expect(elements.length).to.not.equal(0);
                done(); 
                                                                                                                                                                                
            });  
      });     

       this.Then(/^I should view the login page$/, function (done) {   
            driver.wait(until.elementsLocated(by.xpath("//h2[./text()='Home Away, Sweet Home!']")), 30000);                                                                                                                 
            driver.findElements(by.xpath("//h2[./text()='Home Away, Sweet Home!']")).then(function (elements) {
                expect(elements.length).to.not.equal(0);
                done(); 
                                                                                                                                                                                
            });                                                                                                                                                          
       });      

       this.Then(/^I should see an error message$/, function (done) {                                                                                                                                       
            driver.wait(until.elementsLocated(by.css(".alert-danger")), 30000);                                                                                                                 
            driver.findElement(by.css(".alert-danger")).then(function (element) {
                done(); 
                                                                                                                                                                                
            });                                                                                                                                                                                   
       });         

        
};
