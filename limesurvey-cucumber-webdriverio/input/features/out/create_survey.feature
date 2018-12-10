Feature: Create surveys in page
  As an user I want to create my own survey in limesurvey website

  Scenario Outline: Create survey [randomExamples=5]

    Given I go to limesurvey login
    And I fill a good username and password
    And I try to login
    And I expect to be able to login
    And I fill fields for create survey with <randomWord>
    Then I expect to create survey
    Examples:
     |randomWord             | 
     |quod             | 
     |ullam             | 
     |non             | 
     |itaque             | 
     |iure             | 

