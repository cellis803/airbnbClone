# ./features/addListing.feature

Feature: Creating a new listing
  I want to be able to add a new listing

Background:
  Given the airbnb application is started
  When I navigate to the airbnb site
  And I enter "cellis803@gmail.com" into the "Email" field
  And I enter "test" into the "Password" field
  And I click on "Take Me Away"

  Scenario: View the add listing page 
    And I click on "Add Listing"
    Then I should see the add new listing page

  Scenario: Create a new listing
    And I click on "Add Listing"
    And I enter "test" into the "Address" field
    And I enter "Baltimore" into the "City" field
    And I enter "MD" into the "State" field
    And I enter "21047" into the "Zip" field
    And I enter "USA" into the "Country" field
    And I select "House" in the "Property Type" field
    And I enter "500" into the "Price" field
    And I select "Weekly" in the "Duration" field
    And I enter "Cucumber Test Listing" into the "Title" field
    And I enter "you will not be disappointed" into the "Description" field
    And I enter "3" into the "Beds" field
    And I enter "2" into the "Baths" field
    And I enter "1000" into the "Area SqFt" field
    And I select "Yes" in the "Pool" field
    And I select "Yes" in the "Pets Allowed" field
    And I enter "4109655500" into the "Phone" field
    And I upload "C:\Users\admin\temp.png" as my image
    And I click on "Add"
    Then I should see my new listing