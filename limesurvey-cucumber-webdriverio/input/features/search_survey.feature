Feature: Search a survey in page
  As an user I want to search a survey in limesurvey website

  Scenario: Search a survey
    Given I go to limesurvey login
    And I fill a good username and password
    And I try to login
    And I expect to be able to login
    And I try see list of surveys
    And I try search and see a survey choosed
    Then I expect to search a survey