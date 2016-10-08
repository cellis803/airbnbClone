# ./features/editOrDelete.feature

Feature: Edit, Update, Delete a listing
  I want to be able to edit or delete an existing listing

Background:
  Given the airbnb application is started
  When I navigate to the airbnb site
  And I enter "cellis803@gmail.com" into the "Email" field
  And I enter "test" into the "Password" field
  And I click on "Take Me Away"

  Scenario: Edit a listing 
    And I click on "Edit"
    Then I should see the Edit Listing page

  Scenario: Delete a listing
    And I click on "Edit"
    And I click on "Delete"  
    Then the listing should be deleted
    And I should see some listings