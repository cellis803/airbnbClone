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

  Scenario: Navigate back to home screen 
    And I click on a listing
    And I click on Back to Listings
    Then I should see some listings

  Scenario: Create a Review 
    And I click on a listing
    And I click on "Create Review"
    And I enter "5" into the "Rating" field 
    And I enter "Review summary" into the "Review Summary" field
    And I enter "Review text" into the "Review" field      
    And I click on "Submit Review"
    Then I should see the listing details screen
    And I should see my saved review

  Scenario: Cancel Review creation 
    And I click on a listing
    And I click on "Create Review"
    And I enter "5" into the "Rating" field 
    And I enter "Review summary" into the "Review Summary" field
    And I enter "Review text" into the "Review" field      
    And I click on "Cancel"
    Then I should see the listing details screen 