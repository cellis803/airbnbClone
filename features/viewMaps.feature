# ./features/viewMaps.features
Feature: View a map of all listings

  Background:
  Given the airbnb application is started
  When I navigate to the airbnb site
  And I enter "cellis803@gmail.com" into the "Email" field
  And I enter "test" into the "Password" field
  And I click on "Take Me Away"
 
  Scenario: View the Maps page
    And I click on "Map View"
    Then I should see the Map View page

  Scenario: Return to home page
    And I click on "Map View"
    And I click on "Go back to rental property"
    Then I should see some listings