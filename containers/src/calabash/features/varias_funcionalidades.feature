Feature: Varias funcionalidades.

  Scenario: Unico escenario.
    When I press view with id "next"
    When I press view with id "next"
    When I press view with id "next"
    When I press view with id "next"
    When I press view with id "next"
    When I press view with id "done"
    And I wait for 2 seconds

    # Registrar nota de tipo lista de chequeo.
    When I press view with id "fab_expand_menu_button"
    And I wait for 2 seconds
    When I press view with id "fab_checklist"
    Then I enter text "Tareas del curso MISO MISO4208- Semana 16" into field with id "detail_title"
    Then I enter "Construir Reporte Sprint 5." into input field number 2
    Then I enter text "Desplegar herramienta de automatización de pruebas." into CheckList
    Then I enter text "Investigar sobre técnica de pruebas avanzada." into CheckList
    Then I enter text "Estudiar para el parcial 2." into CheckList
    Then take picture
    Then I click on screen 3% from the left and 5% from the top
    Then take picture
    And I wait for 3 seconds

    # Registrar nota de tipo texto, iteración 1.
    When I press view with id "fab_expand_menu_button"
    And I wait for 2 seconds
    When I press view with id "fab_note"
    And I wait for 2 seconds
    Then I enter text "Actividad Nro. 1" into field with id "detail_title"
    Then I enter text "Resumen de actividad nro. 1." into field with id "detail_content"
    Then I click on screen 3% from the left and 5% from the top
    Then take picture
    And I wait for 3 seconds

    # Registrar nota de tipo texto con recordatorio.
    When I press view with id "fab_expand_menu_button"
    And I wait for 2 seconds
    When I press view with id "fab_note"
    Then I enter text "Reporte de Sprint 5" into field with id "detail_title"
    Then I enter text "Construir reporte de Sprint 5 tomando como base el reporte del Sprint 4 e incluyendo los nuevos aportes." into field with id "detail_content"
    And I wait for 1 seconds
    When I press view with id "datetime"
    And I wait for 1 seconds
    When I press view with id "done"
    And I wait for 1 seconds
    When I press view with id "done_button"
    And I wait for 1 seconds
    When I press view with id "done"
    And I wait for 1 seconds
    Then take picture
    Then I click on screen 3% from the left and 5% from the top
    Then take picture
    And I wait for 3 seconds

    # Registrar nota de tipo texto, iteración 2.
    When I press view with id "fab_expand_menu_button"
    And I wait for 2 seconds
    When I press view with id "fab_note"
    And I wait for 2 seconds
    Then I enter text "Actividad Nro. 2" into field with id "detail_title"
    Then I enter text "Resumen de actividad nro. 2." into field with id "detail_content"
    Then I click on screen 3% from the left and 5% from the top
    Then take picture
    And I wait for 3 seconds

    # Registrar nota de tipo texto, iteración 3.
    When I press view with id "fab_expand_menu_button"
    And I wait for 2 seconds
    When I press view with id "fab_note"
    And I wait for 2 seconds
    Then I enter text "Actividad Nro. 3" into field with id "detail_title"
    Then I enter text "Resumen de actividad nro. 3." into field with id "detail_content"
    Then I click on screen 3% from the left and 5% from the top
    Then take picture
    And I wait for 3 seconds

    # Buscar nota, ver contenido y eliminarla.
    When I press view with id "menu_search"
    Then I enter text "reporte de" into field with id "search_src_text"
    Then I press the enter button
    When I press view with id "note_title"
    And I wait for 1 seconds
    Then I click on screen 98% from the left and 5% from the top
    Then take picture
    Then I press "Trash"
    Then take picture
    And I wait for 1 seconds
    When I press view with id "search_cancel"
    Then take picture
    And I wait for 3 seconds

    # Ordenar lista de notas por fecha de creación
    When I press view with id "menu_sort"
    And I wait for 1 seconds
    Then take picture
    Then I press "Creation date"
    Then take picture
    And I wait for 5 seconds
