# ./features/review.feature

Feature: Create a review for a listing
  I want to be able to review a listing from the listings page 

Background:
  Given the airbnb application is started
  When I navigate to the airbnb site
  And I enter "cellis803@gmail.com" into the "Email" field
  And I enter "test" into the "Password" field
  And I click on "Take Me Away"
  And I click on "Create Review"

  Scenario: Make a Review
    And I enter "September 2016" into the "Month and Year of Stay" field  
    And I enter "5" into the "Rating" field 
    And I enter "Review summary" into the "Review Summary" field
    And I enter "Review text" into the "Review" field      
    And I click on "Submit Review"
    Then I should see some listings

  Scenario: Start and then Cancel a Review 
    And I click on "Cancel"
    Then I should see some listings 