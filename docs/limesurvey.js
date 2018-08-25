
var surveyName = 'Survey MISO - Cypress';
var newGroupName = 'Información Personal';

describe('Failed authentication', function() {
    it('Failed authentication', function() {
        cy.visit('http://18.221.222.129/limesurvey/admin')
        cy.get('.login-content').find('input[name="user"]').click().type("admin")
        cy.get('.login-content').find('input[name="password"]').click().type("1234")
        cy.get('.login-content').find('button[name="login_submit"]').click()
        cy.contains('Incorrect username and/or password!')
    })
})
 

describe('Administrator authentication', function() {
    it('Administrator authentication', function() {
        cy.visit('http://18.221.222.129/limesurvey/admin')
        cy.get('.login-content').find('input[name="user"]').click().type("admin")
        cy.get('.login-content').find('input[name="password"]').click().type("admin")
        cy.get('.login-content').find('button[name="login_submit"]').click()
        cy.contains('This is the LimeSurvey admin interface. Start to build your survey from here.')
    })
})

describe('Survey creation', function() {
    it('Survey creation', function() {
        cy.visit('http://18.221.222.129/limesurvey/admin')
        cy.get('.login-content').find('input[name="user"]').click().type("admin")
        cy.get('.login-content').find('input[name="password"]').click().type("admin")
        cy.get('.login-content').find('button[name="login_submit"]').click()
    	cy.get('#welcomeModal').should('not.exist').then(($welcomeModal) => {
		    if ($welcomeModal && $welcomeModal.css('display') == 'block') { //Visible
		      cy.get('#welcomeModal').contains('Close').click()
		    }
	  	})
        cy.get('.ls-panelboxes .selector__create_survey').click()
        cy.get('.container-fluid').find('input[name="surveyls_title"]').click().type("Survey MISO - Cypress")
        cy.get('.menubar').find('a[id="save-form-button"]').click()
        cy.wait(5000)
		cy.contains('Survey summary') 
    })
})

describe('Go to List of Surveys', function() {
    it('List of Surveys', function() {
        cy.visit('http://18.221.222.129/limesurvey/admin')
        cy.get('.login-content').find('input[name="user"]').click().type("admin")
        cy.get('.login-content').find('input[name="password"]').click().type("admin")
        cy.get('.login-content').find('button[name="login_submit"]').click()
        cy.get('.ls-panelboxes .selector__list_surveys').click()
		cy.contains('Survey list')
    })
})

describe('Search survey', function() {
    it('Search survey', function() {
        cy.visit('http://18.221.222.129/limesurvey/admin')
        cy.get('.login-content').find('input[name="user"]').click().type("admin")
        cy.get('.login-content').find('input[name="password"]').click().type("admin")
        cy.get('.login-content').find('button[name="login_submit"]').click()
        cy.get('.ls-panelboxes .selector__list_surveys').click()
        cy.get('#surveys').find('input[name="Survey[searched_value]"]').click().type("Survey MISO - Cypress")
        cy.get('#surveys .btn-success').click()
		cy.contains('Displaying 1-1 of 1 result(s).')
    })
})


describe('Add question group and question', function() {
    it('Add question group and question', function() {
        cy.visit('http://18.221.222.129/limesurvey/admin')
        cy.get('.login-content').find('input[name="user"]').click().type("admin")
        cy.get('.login-content').find('input[name="password"]').click().type("admin")
        cy.get('.login-content').find('button[name="login_submit"]').click()
        cy.get('.ls-panelboxes .selector__list_surveys').click()
        cy.get('#surveys').find('input[name="Survey[searched_value]"]').click().type(surveyName)
        cy.get('#surveys').find('input[value="Search"]').click()
        
        cy.wait(5000)
        
        cy.get('#surveys a').contains(surveyName).click()
        cy.get('#sidebar button').contains('Structure').click()
        cy.get('#questionexplorer a').contains('Add question group').click()
        cy.wait(2000)
        cy.get('form#newquestiongroup #group_name_en').click().type(newGroupName)
        
        cy.get('#surveybarid a').contains('Save and add question').click() //Save and add question
        cy.wait(2000)
        cy.get('#edit-question-body #title').click({force: true}).type("Nombre")
       // cy.get('#edit-question-body #cke_question_en .cke_wysiwyg_frame').click({force: true}).type("Cual es su nombre?")
       cy.get('#surveybarid  #save-button').click()
       cy.wait(2000)
		cy.contains('Question summary')
    })
})

describe('Activate survey', function() {
    it('Activate survey', function() {
        cy.visit('http://18.221.222.129/limesurvey/admin')
        cy.get('.login-content').find('input[name="user"]').click().type("admin")
        cy.get('.login-content').find('input[name="password"]').click().type("admin")
        cy.get('.login-content').find('button[name="login_submit"]').click()
        cy.get('.ls-panelboxes .selector__list_surveys').click()
        cy.get('#surveys').find('input[name="Survey[searched_value]"]').click().type(surveyName)
        cy.get('#surveys').find('input[value="Search"]').click()
        
        cy.wait(5000)
        
        cy.get('#surveys a').contains(surveyName).click()
        cy.get('#sidebar button').contains('Structure').click()
        cy.get('#surveybarid a').contains('Activate this survey').click()
        cy.wait(2000)
    })
})

describe('Fill out survey', function() {
    it('Fill out survey', function() {
        cy.visit('http://18.221.222.129/limesurvey/')
    })
})

describe('Delete survey', function() {
    it('Delete survey', function() {
        cy.visit('http://18.221.222.129/limesurvey/admin')
        cy.get('.login-content').find('input[name="user"]').click().type("admin")
        cy.get('.login-content').find('input[name="password"]').click().type("admin")
        cy.get('.login-content').find('button[name="login_submit"]').click()
        cy.get('.ls-panelboxes .selector__list_surveys').click()
        cy.get('#surveys').find('input[name="Survey[searched_value]"]').click().type("Survey MISO - Cypress")
        cy.get('#surveys a').contains(surveyName).click()
        cy.get('.surveybar').contains('Tools').click({force: true})
        cy.get('.surveybar').contains('Delete survey').click()
        cy.wait(5000)
        cy.get('.jumbotron input').contains('Delete survey').click()
        cy.contains('This is the LimeSurvey admin interface. Start to build your survey from here.')
    })
})
