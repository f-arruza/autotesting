describe('losestudiantes.co', function() {
    it('Buscar profesor.', function() {

        // Buscar profesor
        cy.visit('https://losestudiantes.co')
        cy.contains('Cerrar').click()

        cy.get('.Select-input').find('input[role="combobox"]').type("Fernando Arruza", {force:true})
        cy.contains('Fernando Arruza Hedman - Ingeniería de Sistemas')
    })
    it('Filtrar comentarios por materia.', function() {

        // Buscar profesor
        cy.visit('https://losestudiantes.co')
        cy.contains('Cerrar').click()

        cy.get('.Select-input').find('input[role="combobox"]').type("Rubby Casallas", {force:true})
        cy.contains('Rubby Casallas Gutierrez - Ingeniería de Sistemas')
        cy.get('.Select-input').find('input[role="combobox"]').type('{enter}', {force:true})
        cy.contains('Soy Rubby...')

        // Filtrar por ISIS2603
        cy.get('.materias').find('input[name="id:ISIS2603"]').check()
        cy.get('.jsx-3672521041').contains('Desarrollo De Sw En Equipo')
        cy.wait(2000)
        cy.get('.materias').find('input[name="id:ISIS2603"]').uncheck()

        // Filtrar por MISO4203
        cy.get('.materias').find('input[name="id:MISO4203"]').check()
        cy.get('.jsx-3672521041').contains('Gest. De Proy. Desarrollo Soft')
    })
    it('Visitar Los estudiantes y registrar nueva cuenta.', function() {

        // Iniciar sesión
        cy.visit('https://losestudiantes.co')
        cy.contains('Cerrar').click()
        cy.contains('Ingresar').click()
        cy.get('.cajaLogIn').find('input[name="correo"]').click().type("f.arruza@uniandes.edu.co")
        cy.get('.cajaLogIn').find('input[name="password"]').click().type("1234567890")
        cy.get('.cajaLogIn').contains('Ingresar').click()
        cy.get('.navbar').find('[id="cuenta"]').click()
        cy.wait(4000)

        // Cerrar sesión
        cy.get('.navbar').contains('Salir').click()

        // Intento de registro cuenta ya existente
        cy.contains('Ingresar').click()

        cy.get('.cajaSignUp').find('input[name="nombre"]').click().type("Fernando")
        cy.get('.cajaSignUp').find('input[name="apellido"]').click().type("Arruza")
        cy.get('.cajaSignUp').find('input[name="correo"]').click().type("f.arruza@uniandes.edu.co")
        cy.get('.cajaSignUp').find('input[name="password"]').click().type("xxxxxxxxxx")
        cy.get('.cajaSignUp').find('[type="checkbox"]').check()
        cy.get('.cajaSignUp').find('[name="idPrograma"]').select('16')
        cy.get('.cajaSignUp').find('input[name="acepta"]').check()
        cy.get('.cajaSignUp').contains('Registrarse').click()
        cy.contains('Ocurrió un error activando tu cuenta')
    })
    it('Visitar Los estudiantes y registrar nueva cuenta.', function() {

        // Registrar nueva cuenta
        cy.visit('https://losestudiantes.co')
        cy.contains('Cerrar').click()
        cy.contains('Ingresar').click()

        cy.get('.cajaSignUp').find('input[name="nombre"]').click().type("Fernando")
        cy.get('.cajaSignUp').find('input[name="apellido"]').click().type("Arruza")
        cy.get('.cajaSignUp').find('input[name="correo"]').click().type("f.arruza@uniandes.edu.co")
        cy.get('.cajaSignUp').find('input[name="password"]').click().type("xxxxxxxxxx")
        cy.get('.cajaSignUp').find('[type="checkbox"]').check()
        cy.get('.cajaSignUp').find('[name="idPrograma"]').select('16')
        cy.get('.cajaSignUp').find('input[name="acepta"]').check()
        cy.get('.cajaSignUp').contains('Registrarse').click()
        //cy.contains('Registro exitoso!')
        cy.contains('Ocurrió un error activando tu cuenta')
        cy.get('.sweet-alert').find('[type="button"]').click()

        // Se recibe un correo solicitando la ACTIVACION de la cuenta
    })
    it('Ingresar a página del profesor.', function() {

        // Ingresar a página del profesor
        cy.visit('https://losestudiantes.co')
        cy.contains('Cerrar').click()

        cy.get('.Select-input').find('input[role="combobox"]').type("Fernando Arruza", {force:true})
        cy.contains('Fernando Arruza Hedman - Ingeniería de Sistemas')

        cy.get('.Select-input').find('input[role="combobox"]').type('{enter}', {force:true})

        cy.contains('Soy Fernando...')
    })
})
