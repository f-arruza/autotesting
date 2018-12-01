

Feature: Filling out reading

  Scenario: As a user I want to be able to fill out my information
  	Given I press "Allow" 
    When I should see "Solo necesitamos un par de cosas antes comenzar."   
    Then I wait for progress
    Then I scroll down
    And I press "EMPEZAR"

