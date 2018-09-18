Feature: User register in losestudiantes
    As an anonymous user I want to register myself within losestudiantes website in order to rate teachers

Scenario Outline: Register failed with wrong inputs

  Given I go to losestudiantes home screen
    When I open the register screen
    And I fill SignUp with <name>, <lastname>, <email>, <password> and <accept>
    And I try to register
    Then I expect <behavior>

    Examples:
      | name     | lastname | email                        | password | accept | behavior |
      |          | Arruza   |   f.arruza@uniandes.edu.co   | 12345678 | true   | E:Nombre obligatoria |
      | Fernando |          |   f.arruza@uniandes.edu.co   | 12345678 | true   | E:Apellidos obligatoria |
      | Fernando | Arruza   |                              | 12345678 | true   | A:Ingresa tu correo |
      | Fernando | Arruza   |   @                          | 12345678 | true   | A:Ingresa un correo valido |
      | Fernando | Arruza   |   f.arruza@uniandes.edu.co   |          | true   | A:Ingresa una contraseña |
      | Fernando | Arruza   |   f.arruza@uniandes.edu.co   | 1234     | true   | A:La contraseña debe ser al menos de 8 caracteres |
      | Fernando | Arruza   |   f.arruza@uniandes.edu.co   | 12345678 | false  | A:Debes aceptar los términos y condiciones |
      | Fernando | Arruza   |   f.arruza@uniandes.edu.co   | 12345678 | true   | RF:Registro fallido |
      | Radamel  | Falcao   |   r.falcao@uniandes.edu.co   | 12345678 | true   | RE:Regitro exitoso |
