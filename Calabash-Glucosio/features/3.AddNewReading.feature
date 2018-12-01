Feature: Adding new information

  Scenario: As a user I want to be able to fill out my information
  	Given I press "Allow" 
    When I should see "Solo necesitamos un par de cosas antes comenzar."       
    And I enter text "30" into field with id "activity_hello_age"  
    And I press the enter button
    And I scroll down
    And I press "EMPEZAR"
    And I press "activity_main_fab_add_reading"
    Then I should see "Add new reading"   