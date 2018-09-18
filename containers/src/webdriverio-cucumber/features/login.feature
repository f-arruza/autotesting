Feature: Login into losestudiantes
    As an user I want to authenticate myself within losestudiantes website in order to rate teachers

Scenario Outline: Login failed with wrong inputs and Login sucess

  Given I go to losestudiantes home screen
    When I open the login screen
    And I fill with <email> and <password>
    And I try to login
    Then I expect to see <error>

    Examples:
      | email                    | password   | error                    |
      |                          |            | Ingresa una contraseña   |
      | miso@gmail.com           |    1234    | Upss! El correo y        |
      | f.arruza@uniandes.edu.co | 1234567890 | SUCESS_FLAG              |
