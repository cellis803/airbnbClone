# ./features/addListing.feature
 
Feature: Creating a new listing
  I want to be able to add a new listing
 
  Scenario: View the add listing page
    Given the airbnb application is started
    And I am logged in
    When I navigate to the airbnb site
    And I click on Add Listing
    Then I should see the add new listing page

