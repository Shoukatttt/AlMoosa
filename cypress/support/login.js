import GetUsers from './get_users'
let toast_message
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
            cy.wait(10000)
            cy.contains('With Our Specialist Today').should('be.visible')
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
            cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/auth/patient/login').as('getResponse')
            cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) => {
                    toast_message = text
                    console.log('Here is tost message', toast_message)

                })
            cy.contains('Forgot Password?').should('be.visible')



            cy.wait('@getResponse').then((resp) => {
                console.log('This is response', resp)
                expect(resp.response.statusCode).to.eq(401)
                const message = resp.response.body.message
                expect(message).to.eq(toast_message)
            })

        })
    }

    LoginWithIncorrectPassword() {
        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        cy.get('.custom-select').select('Proceed with MRN')
        this.users.getUserWithCorrectMRNIncorrectPassword().then(userData => {
            cy.get('[placeholder="Enter the ID Number"]').click()
            cy.get('[placeholder="Enter the ID Number"]').type(userData.mrn)
            cy.get('[placeholder="Enter Password"]').click()
            cy.get('[placeholder="Enter Password"]').type(userData.password)
            cy.contains('button', 'Login').click()
            cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/auth/patient/login').as('getResponse')
            cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) => {
                    toast_message = text
                    console.log('Here is tost message', toast_message)

                })
            cy.contains('Forgot Password?').should('be.visible')



            cy.wait('@getResponse').then((resp) => {
                console.log('This is response', resp)
                expect(resp.response.statusCode).to.eq(401)
                const message = resp.response.body.message
                expect(message).to.eq(toast_message)
            })

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
            cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/auth/patient/login').as('getResponse')
            cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) => {
                    toast_message = text

                })
            cy.contains('Forgot Password?').should('be.visible')



            cy.wait('@getResponse').then((resp) => {
                console.log('This is response', resp)
                expect(resp.response.statusCode).to.eq(401)
                const message = resp.response.body.message
                expect(message).to.eq(toast_message)
            })

        })
    }

    loginWithSaudiId() {
        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        this.users.getUserWithCorrectSaudiId().then(userData => {
            cy.get('[placeholder="Enter the ID Number"]').click()
            cy.get('[placeholder="Enter the ID Number"]').type(userData.saudiId)
            cy.contains('button', 'Login').click()
            cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/otp/send').as('getOTP')
            cy.wait(10000)
            cy.contains('Enter Verification Code').should('be.visible')
            cy.get('.otp-filled').find('div').eq(3).find('input[class="otp-input"]').click()
                .click()
            cy.get('body').type('{backspace}{backspace}{backspace}{backspace}');
            cy.wait('@getOTP').then((resp) => {
                expect(resp.response.statusCode).to.eq(201)
                const otp = resp.response.body.data.otp_code;
                cy.get('.otp-filled').find('div').eq(0).find('input[class="otp-input"]').type(otp)
                cy.contains('button', 'Verify').click()
            })
        })
    }

    loginWithIncorrectSaudiId() {
        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        this.users.getUserWithInCorrectSaudiId().then(userData => {
            cy.get('[placeholder="Enter the ID Number"]').click()
            cy.get('[placeholder="Enter the ID Number"]').type(userData.saudiId)
            cy.contains('button', 'Login').click()
            cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/otp/send').as('getOTP')
            cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) => {
                    toast_message = text
                })
            cy.contains('have an account yet?').should('be.visible')
            cy.wait('@getOTP').then((resp) => {
                console.log('This is response', resp)
                expect(resp.response.statusCode).to.eq(201)
                const message = resp.response.body.message
                expect(message).to.eq(toast_message)
            })

        })
    }

    loginWithIqamaId() {
        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        this.users.getUserWithCorrectIqamaId().then(userData => {
            cy.get('.custom-select').select('Proceed with Iqama ID')
            cy.get('[placeholder="Enter the ID Number"]').click()
            cy.get('[placeholder="Enter the ID Number"]').type(userData.iqamaId)
            cy.contains('button', 'Login').click()
            cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/otp/send').as('getOTP')
            cy.wait(10000)
            cy.contains('Enter Verification Code').should('be.visible')
            cy.get('.otp-filled').find('div').eq(3).find('input[class="otp-input"]').click()
                .click()
            cy.get('body').type('{backspace}{backspace}{backspace}{backspace}');
            cy.wait('@getOTP').then((resp) => {
                expect(resp.response.statusCode).to.eq(201)
                const otp = resp.response.body.data.otp_code;
                cy.get('.otp-filled').find('div').eq(0).find('input[class="otp-input"]').type(otp)
                cy.contains('button', 'Verify').click()
            })
        })
    }

    loginWithIncorrectIqamaId() {
        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        this.users.getUserWithInCorrectIqamaId().then(userData => {
            cy.get('.custom-select').select('Proceed with Iqama ID')
            cy.get('[placeholder="Enter the ID Number"]').click()
            cy.get('[placeholder="Enter the ID Number"]').type(userData.iqamaId)
            cy.contains('button', 'Login').click()
            cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/otp/send').as('getOTP')
            cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) => {
                    toast_message = text
                })
            cy.contains('have an account yet?').should('be.visible')
            cy.wait('@getOTP').then((resp) => {
                console.log('This is response', resp)
                expect(resp.response.statusCode).to.eq(201)
                const message = resp.response.body.message
                expect(message).to.eq(toast_message)
            })
        })
    }

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