# ./features/login.feature
 
Feature: Logging in to airbnb app

  Background:
    Given the airbnb application is started
    When I navigate to the airbnb site
 
  Scenario: View the Login page
    Then I should view the login page

  Scenario: Successful Login
    And I enter "cellis803@gmail.com" into the "Email" field
    And I enter "test" into the "Password" field
    And I click on "Take Me Away"
    Then I should see some listings

  Scenario: Incomplete Login  
    And I enter "cellis803@gmail.com" into the "Email" field
    And I click on "Take Me Away"
    Then I should view the login page

  Scenario: Invalid username
    And I enter "test" into the "Email" field
    And I enter "test" into the "Password" field
    And I click on "Take Me Away"
    Then I should view the login page
    And I should see an error message
