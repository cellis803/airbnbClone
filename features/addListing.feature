# ./features/addListing.feature

Feature: Creating a new listing
  I want to be able to add a new listing

Background:
  Given the airbnb application is started
  When I navigate to the airbnb site
  And I am logged in

  Scenario: View the add listing page 
    And I click on "Add Listing"
    Then I should see the add new listing page

  Scenario: Create a new listing
    And I click on "Add Listing"
    And I enter "test" into the "Address" field
    And I enter "Baltimore" into the "City" field
    And I enter "MD" into the "State" field
    And I enter "21047" into the "Zip" field
    And I click on "Add"
    Then I should see my new listing