Feature: A1C Calculator

  Scenario: As a user I want to be able to fill out my information
  	Given I press "Allow" 
    When I should see "Solo necesitamos un par de cosas antes comenzar."       
    And I enter text "30" into field with id "activity_hello_age"
    And I press the enter button
    And I scroll down
    And I press "EMPEZAR"
    And I wait for progress
    And I press image button number 1
    And I wait for progress
    And I press image button number 1
