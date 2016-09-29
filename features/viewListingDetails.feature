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
  
  Scenario: Make a Reservation
    And I click on a listing
    And I click on "Reserve"
    And I enter "date" into the "Date From" field
    And I enter "date" into the "Date To" field
    And I enter "Chris" into the "First Name" field
    And I enter "D" into the "Middle" field
    And I enter "Ellis" into the "Last Name" field
    And I enter "100 House St." into the "Address" field
    And I enter "Baltimore" into the "City" field
    And I select "Maryland" in the "State" field
    And I enter "21244" into the "Zip" field
    And I enter "Chris Ellis" into the "Card Holder Name" field
    And I enter "0000000000000000" into the "Credit/Debit Card Number" field
    And I select "11" in the "Expiration Month" field
    And I select "2017" in the "Expiration Year" field
    And I click on "Make Reservation"
    Then I should see a confirmation message
