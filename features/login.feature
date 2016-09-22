# ./features/login.feature
 
Feature: Logging in to airbnb app

  Background:
    Given the airbnb application is started
 
  Scenario: Log in to the application to view listings
   
    When I navigate to the airbnb site
    And I enter "cellis803@gmail.com" into the "Email" field
    And I enter "test" into the "Password" field
    And I click on "Take Me Away"
    Then I should see some listings

