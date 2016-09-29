# ./features/reservation.feature

Feature: Reserve a listing
  I want to be able to reserve a listing from the listings page 

Background:
  Given the airbnb application is started
  When I navigate to the airbnb site
  And I enter "cellis803@gmail.com" into the "Email" field
  And I enter "test" into the "Password" field
  And I click on "Take Me Away"
  And I click on "Reserve"

  Scenario: Make a Reservation   
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

  Scenario: Return from confirmation screen   
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
    And I click on "Go back to rental property"
    Then I should see some listings   

  Scenario: Start and then Cancel a Reservation 
    And I click on "Cancel"
    Then I should see some listings 