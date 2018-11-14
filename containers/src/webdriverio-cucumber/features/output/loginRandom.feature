Feature: Login into losestudiantes
    As an user I want to authenticate myself within losestudiantes website in order to rate teachers

Scenario Outline: Login failed with wrong inputs
Given I go to losestudiantes home screen
  When I open the login screen
  And I fill with <randomEmail> and <randomPassword>
  And I try to login
  Then I expect to see error


    Examples:
     |randomEmail      | randomPassword      | 
     |Elvera.Kuhic@hotmail.com      | NWLPzfZEmfI7j3I      | 

Scenario Outline: login works with correct username and password
Given I go to losestudiantes home screen
  When I open the login screen
  And I fill with <email_> and <password_>
  And I try to login
  Then I expect to see user icon

    Examples:
      | email_                     | password_ |
      | ja.picon@uniandes.edu.co   | 12345678  |