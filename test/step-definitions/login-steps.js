module.exports = function () {
 
       this.Given(/^the airbnb application is started$/, function (done) {                                                                                                                                    
                done();                                                                                                                                                                               
       });  

       this.When(/^I navigate to the airbnb site$/, function (done) {                                                                                                                                                                                                                                                                              
         driver.get("http://localhost:8080").then(function() {
            driver.wait(until.elementLocated(by.css('h2.form-signin-heading')), 10000, 'Could not locate the child element within the time specified');
            done();    
         });
         
                                                                                                                                                                   
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
            driver.findElements(by.xpath("/html/body/div/form/h2[./text()='Take Me Away:']")).then(function (elements) {
                expect(elements.length).to.not.equal(0);
                done(); 
                                                                                                                                                                                
            });                                                                                                                                                          
       });      

        
};
