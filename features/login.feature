# ./features/google-search.feature
 
Feature: Logging in to airbnb app
  As an internet user
  In order to find a reservation
  I want to be able to browse the airbnb application
 
  Scenario: Access the airbnb home page
    Given the airbnb application is started
    When I navigate to the airbnb site
    Then I should see some listings
