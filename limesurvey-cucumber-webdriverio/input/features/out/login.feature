Feature: Login into losestudiantes
  As an user I want to authenticate myself within limesurvey website

  Scenario Outline: Login failed [randomExamples=5]

    Given I go to limesurvey login
    And I fill a wrong <randomUserName> and <randomPassword>
    And I try to login
    Then I expect to not be able to login

    Examples:
     |randomUserName             | randomPassword             | 
     |Ahmed_Keeling78             | WFpWucmUcbvRcC8             | 
     |Tatum71             | IpuETYB6iDOPw9U             | 
     |Rosanna.Rempel             | b2fpktYfP52eyt7             | 
     |Devyn.Gusikowski74             | bR9kGZUznYX7Vcu             | 
     |Kristian.DAmore             | UK_hzW5NVHSYzD_             | 

  Scenario: Login passed
    Given I go to limesurvey login
    And I fill a good username and password
    And I try to login
    Then I expect to be able to login
