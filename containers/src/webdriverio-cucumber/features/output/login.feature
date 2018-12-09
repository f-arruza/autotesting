Feature: Login into losestudiantes
  As an user I want to authenticate myself within limesurvey website

  Scenario: Login failed
    Given I go to limesurvey login
    And I fill a wrong username and password
    And I try to login
    Then I expect to not be able to login

  Scenario: Login passed
    Given I go to limesurvey login
    And I fill a good username and password
    And I try to login
    Then I expect to be able to login
