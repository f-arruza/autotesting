Feature: List of surveys in page
  As an user I want to list of surveys in limesurvey website

  Scenario: List of surveys
    Given I go to limesurvey login
    And I fill a good username and password
    And I try to login
    And I expect to be able to login
    And I try see list of surveys
    Then I expect to list of surveys