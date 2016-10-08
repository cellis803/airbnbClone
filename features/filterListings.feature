# ./features/filterListings.feature

Feature: Filtering the listings
  I want to be able to filter listings by price

Background:
  Given the airbnb application is started
  When I navigate to the airbnb site
  And I enter "cellis803@gmail.com" into the "Email" field
  And I enter "test" into the "Password" field
  And I click on "Take Me Away"

  Scenario: Filter the listings 
    And I select "$100" in the "Min Rental Amount" field
    And I select "$200" in the "Max Rental Amount" field
    Then I should see some listings
    And there should be "2" listings