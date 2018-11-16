Feature: Trayectorias y Rutas

  Scenario: Yo como usuario quiero consultar la trayectoria de la ruta de TRANSMI "B16" y verla en forma de lista.
    #button to remove the splash screen
    Given I press "Stations"
    Then I press "Routes"
    Then I wait for 1 seconds
    Then I press view with id "search_button"
    Then I enter text "B16" into field with id "search_src_text"
    Then I press the enter button
    Then I press view with id "txtBusDescription"
    And I wait for 5 seconds

  Scenario: Yo como usuario quiero consultar la trayectoria de la ruta de servicio ESPECIAL "6-18" y verla en un mapa.
    Given I press "Routes"
    Then I wait for 1 seconds
    Then I press "COMPLEMENTARIO"
    Then I wait for 1 seconds
    Then I press "ESPECIAL"
    Then I wait for 1 seconds
    Then I press view with id "search_button"
    Then I enter text "6-18" into field with id "search_src_text"
    Then I press the enter button
    Then I wait for 2 seconds
    Then I press view with id "txtBusDescription"
    Then I wait for 2 seconds
    Then I press view with id "action_map"
    And I wait for 5 seconds

  Scenario: Yo como usuario quiero buscar la ruta "C37" del servicio URBANO y marcarla como favorita para que me pida login social.
    Given I press "Routes"
    Then I wait for 1 seconds
    Then I press "URBANO"
    Then I wait for 1 seconds
    Then I press view with id "search_button"
    Then I enter text "C37" into field with id "search_src_text"
    Then I press the enter button
    Then I wait for 2 seconds
    Then I press view with id "imgFavorite"
    And I wait for 5 seconds
