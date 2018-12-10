Feature: Create surveys in page
  As an user I want to create my own survey in limesurvey website

  Scenario: Create survey
    Given I go to limesurvey login
    And I fill a good username and password
    And I try to login
    And I expect to be able to login
    And I fill fields for create survey with <randomText>
    Then I expect to create survey