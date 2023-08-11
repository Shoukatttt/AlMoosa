import GetUsers from './get_users'
class Login {
    users = new GetUsers();
    LoginWithMRN() {

        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        cy.get('.custom-select').select('Proceed with MRN')
        this.users.getUserWithMRN().then(userData => {
            cy.get('[placeholder="Enter the ID Number"]').click()
            cy.get('[placeholder="Enter the ID Number"]').type(userData.mrn)
            cy.get('[placeholder="Enter Password"]').click()
            cy.get('[placeholder="Enter Password"]').type(userData.password)
            cy.contains('button', 'Login').click()
        })
    }

    LoginWithIncorrectMRN() {
        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        cy.get('.custom-select').select('Proceed with MRN')
        this.users.getUserWithIncorrectMRNCorrectPassword().then(userData => {
            cy.get('[placeholder="Enter the ID Number"]').click()
            cy.get('[placeholder="Enter the ID Number"]').type(userData.mrn)
            cy.get('[placeholder="Enter Password"]').click()
            cy.get('[placeholder="Enter Password"]').type(userData.password)
            cy.contains('button', 'Login').click()

        })
    }

    LoginWithIncorrectPassword() {
        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        cy.get('.custom-select').select('Proceed with MRN')
        this.users.getUserWithIncorrectMRNCorrectPassword().then(userData => {
            cy.get('[placeholder="Enter the ID Number"]').click()
            cy.get('[placeholder="Enter the ID Number"]').type(userData.mrn)
            cy.get('[placeholder="Enter Password"]').click()
            cy.get('[placeholder="Enter Password"]').type(userData.password)
            cy.contains('button', 'Login').click()

        })
    }

    LoginWithIncorrectPasswordAndMRN() {
        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        cy.get('.custom-select').select('Proceed with MRN')
        this.users.getUserWithIncorrectMRNCorrectPassword().then(userData => {
            cy.get('[placeholder="Enter the ID Number"]').click()
            cy.get('[placeholder="Enter the ID Number"]').type(userData.mrn)
            cy.get('[placeholder="Enter Password"]').click()
            cy.get('[placeholder="Enter Password"]').type(userData.password)
            cy.contains('button', 'Login').click()

        })
    }


    // LoginWithIncorrectMRN() {
    //     this.users.getUserWithIncorrectMRNCorrectPassword().then(userData => {
    //         cy.get('.language-switcher').click()
    //         cy.contains('Login').click()
    //         cy.get('.custom-select').select('Proceed with MRN')
    //         cy.get('[placeholder="Enter the ID Number"]').click()
    //         cy.get('[placeholder="Enter the ID Number"]').type(userData.mrn)
    //         cy.get('[placeholder="Enter Password"]').click()
    //         cy.get('[placeholder="Enter Password"]').type(userData.password)
    //         cy.contains('button', 'Login').click()

    //     })


    // }

    // LoginWithIncorrectPassword() {
    //     this.users.getUserWithCorrectMRNIncorrectPassword().then(userData => {
    //         cy.get('.language-switcher').click()
    //         cy.contains('Login').click()
    //         cy.get('.custom-select').select('Proceed with MRN')
    //         cy.get('[placeholder="Enter the ID Number"]').click()
    //         cy.get('[placeholder="Enter the ID Number"]').type(userData.mrn)
    //         cy.get('[placeholder="Enter Password"]').click()
    //         cy.get('[placeholder="Enter Password"]').type(userData.password)
    //         cy.contains('button', 'Login').click()

    //     })


    // }

    // loginWithMRN(mrn,password) {
    //     cy.get('.language-switcher').click()
    //     cy.contains('Login').click()
    //     cy.get('.custom-select').select('Proceed with MRN')
    //     cy.get('[placeholder="Enter the ID Number"]').click()
    //     cy.get('[placeholder="Enter the ID Number"]').type(mrn)
    //     cy.get('[placeholder="Enter Password"]').click()
    //     cy.get('[placeholder="Enter Password"]').type(password)
    //     cy.contains('button', 'Login').click()

    // }

    // loginWithSaudiId(id) {
    //     cy.get('.language-switcher').click()
    //     cy.contains('Login').click()
    //     cy.get('[placeholder="Enter the ID Number"]').click()
    //     cy.get('[placeholder="Enter the ID Number"]').type(id)
    //     cy.contains('button', 'Login').click()
    //     cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/otp/send').as('getOTP')
    //     cy.wait(10000)
    //     cy.contains('Enter Verification Code').should('be.visible')
    //     cy.get('.otp-filled').find('div').eq(3).find('input[class="otp-input"]').click()
    //         .click()
    //     cy.get('body').type('{backspace}{backspace}{backspace}{backspace}');
    //     cy.wait('@getOTP').then((resp) => {
    //         expect(resp.response.statusCode).to.eq(201)
    //         const otp = resp.response.body.data.otp_code;
    //         cy.get('.otp-filled').find('div').eq(0).find('input[class="otp-input"]').type(otp)
    //         cy.contains('button', 'Verify').click()
    //     })


    // }

    // loginWithIqamaId(id) {
    //     cy.get('.language-switcher').click()
    //     cy.contains('Login').click()
    //     cy.get('.custom-select').select('Proceed with Iqama ID')
    //     cy.get('[placeholder="Enter the ID Number"]').click()
    //     cy.get('[placeholder="Enter the ID Number"]').type(id)
    //     cy.contains('button', 'Login').click()
    //     cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/otp/send').as('getOTP')
    //     cy.wait(10000)
    //     cy.contains('Enter Verification Code').should('be.visible')
    //     cy.get('.otp-filled').find('div').eq(3).find('input[class="otp-input"]').click()
    //         .click()
    //     cy.get('body').type('{backspace}{backspace}{backspace}{backspace}');
    //     cy.wait('@getOTP').then((resp) => {
    //         expect(resp.response.statusCode).to.eq(201)
    //         const otp = resp.response.body.data.otp_code;
    //         cy.get('.otp-filled').find('div').eq(0).find('input[class="otp-input"]').type(otp)
    //         cy.contains('button', 'Verify').click()
    //     })



    // }

}

const login = new Login();
export default login;