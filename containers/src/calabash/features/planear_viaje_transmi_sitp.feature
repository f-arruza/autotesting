Feature: Planear viaje en Transmi o SITP

  Scenario: Yo como usuario quiero buscar la ruta óptima de Transmi entre la estación Av. Rojas y Pepe Sierra, y verla en un mapa.
    #button to remove the splash screen
    Given I press "Stations"
    Then I press "Travel in Transmi, SITP or Taxi"
    Then I wait for 1 seconds
    Then I press view with id "imgExchange"
    Then I wait for 1 seconds
    Then I press view with id "tvOrigen"
    Then I enter text "Av. Rojas" into field with id "etSearch"
    Then I press view with id "txtEstName"
    Then I press view with id "tvDestino"
    Then I enter text "Pepe Sierra" into field with id "etSearch"
    Then I press view with id "txtEstName"
    Then I press "fabGo"
    Then I wait for 10 seconds
    Then I press view with id "tvMap"
    And I wait for 5 seconds

  Scenario: Yo como usuario quiero buscar las rutas óptima en SITP entre la Torre Colpatria y el Centro Comercial Av Chile, e iniciar viaje.
    Given I press "Travel in Transmi, SITP or Taxi"
    Then I wait for 1 seconds
    Then I press view with id "imgExchange"
    Then I wait for 1 seconds
    Then I touch the "Transmilenio" text
    Then I touch the "SITP" text
    Then I press view with id "tvOrigen"
    Then I enter text "Torre Colpatria" into field with id "etSearch"
    Then I press view with id "txtEstName"
    Then I press view with id "tvDestino"
    Then I enter text "Centro Comercial Av Chile" into field with id "etSearch"
    Then I press view with id "txtEstName"
    Then I press "fabGo"
    Then I wait for 10 seconds
    Then I press view with id "tvTravel"
    And I wait for 5 seconds

  Scenario: Yo como usuario quiero consultar el listado de estaciones de la troncal "Américas".
    Given I press "Travel in Transmi, SITP or Taxi"
    Then I wait for 1 seconds
    Then I press view with id "imgExchange"
    Then I wait for 1 seconds
    Then I touch the "LINES" text
    Then I touch the "Américas" text
    And I wait for 5 seconds
