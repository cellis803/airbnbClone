# ./features/login.feature
 
Feature: Logging in to airbnb app

  Background:
    Given the airbnb application is started
 
  Scenario: Access the airbnb home page
   
    When I navigate to the airbnb site
    Then I should see some listings

