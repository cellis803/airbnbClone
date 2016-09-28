# ./features/viewListingDetails.feature

Feature: Listing Details
  I want to be able to view the details of a listing

Background:
  Given the airbnb application is started
  When I navigate to the airbnb site
  And I enter "cellis803@gmail.com" into the "Email" field
  And I enter "test" into the "Password" field
  And I click on "Take Me Away"

  Scenario: Click on a listing and navigate to the details screen 
    And I click on a listing
    Then I should see the listing details screen