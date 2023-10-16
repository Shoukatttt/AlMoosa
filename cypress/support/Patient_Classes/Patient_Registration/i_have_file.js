import GetUsers from '../../get_users'
let toast_message
class Registeration {
    users = new GetUsers();
    RegisterViaIqamaId() {
        cy.get('.language-switcher').click()
        cy.contains('Register').click()
        cy.contains('Do you have a medical file?').should('be.visible')
        cy.contains('button', 'I have a medical file').click()
        try {
            cy.url().then((url) => {
                expect(url).to.eq('https://stage-patientportal.almoosahospital.com.sa/auth/user/register/medical-file')
                cy.get('.multiselect__prepend-icon', { timeout: 10000 }).click();
                cy.contains('.multiselect__element', 'Proceed with Iqama ID').click();
            })
        } catch (error) {
            cy.log('An error occurred:', error);

        }
        this.users.RegisterViaIqama().then((userData) => {
            cy.xpath('//input[@placeholder="Enter ID"]').type(userData.iqamaId)
            cy.xpath('//input[@placeholder="Phone Number"]').type(userData.phone)
            cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v2/auth/patient/register',).as('getResponse')
            cy.contains('button', 'Register').click()
            cy.wait(10000)
            cy.wait('@getResponse', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(201)
                const message = interception.response.body.message
                const status = interception.response.body.status
                if (status === true) {
                    cy.contains('Registered Successfully').should('be.visible')
                    cy.contains('button', 'Ok').click()
                    cy.contains('button', 'Login').should('be.visible')
                }
                else {
                    cy.log(`Here is the response message from API: ${message}`)
                    cy.contains('Already Registered').should('be.visible')
                    cy.get('.swal2-confirm').click()
                    cy.contains('button', 'Login').should('be.visible')
                }
            })

        })
    }
    RegisterViaSaudiId() {
        cy.get('.language-switcher').click()
        cy.contains('Register').click()
        cy.contains('Do you have a medical file?').should('be.visible')
        cy.contains('button', 'I have a medical file').click()
        try {
            cy.url().then((url) => {
                expect(url).to.eq('https://stage-patientportal.almoosahospital.com.sa/auth/user/register/medical-file')
            })
        } catch (error) {
            cy.log('An error occurred:', error);

        }
        this.users.RegisterViaSaudiId().then((userData) => {
            cy.xpath('//input[@placeholder="Enter ID"]').type(userData.saudiId)
            cy.xpath('//input[@placeholder="Phone Number"]').type(userData.phone)
            cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v2/auth/patient/register',).as('getResponse')
            cy.contains('button', 'Register').click()
            cy.wait(10000)
            cy.wait('@getResponse', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(201)
                const message = interception.response.body.message
                const status = interception.response.body.status
                if (status === true) {
                    cy.contains('Registered Successfully').should('be.visible')
                    cy.contains('button', 'Ok').click()
                    cy.contains('button', 'Login').should('be.visible')
                }
                else {
                    cy.log(`Here is the response message from API: ${message}`)
                    cy.contains('Already Registered').should('be.visible')
                    cy.get('.swal2-confirm').click()
                    cy.contains('button', 'Login').should('be.visible')
                }
            })

        })
    }
    InputValidations() {
        cy.get('.language-switcher').click()
        cy.contains('Register').click()
        cy.contains('Do you have a medical file?').should('be.visible')
        cy.contains('button', 'I have a medical file').click()
        try {
            cy.url().then((url) => {
                expect(url).to.eq('https://stage-patientportal.almoosahospital.com.sa/auth/user/register/medical-file')
            })
        } catch (error) {
            cy.log('An error occurred:', error);

        }
        cy.contains('button', 'Register').click()
        cy.get('.toasted-container.top-right')
            .invoke('text')
            .then((text) => {
                toast_message = text
                expect(toast_message).to.eq('Saudi ID is required')
                cy.wait(5000)
                cy.xpath('//input[@placeholder="Enter ID"]').type('123')
                cy.contains('button', 'Register').click()
                cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) =>{
                    expect(text).to.eq('Saudi ID should be 10 digits')
                })
                cy.wait(5000)
                cy.xpath('//input[@placeholder="Enter ID"]').type('123222222222')
                cy.contains('button', 'Register').click()
                cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) =>{
                    expect(text).to.eq('Saudi ID should be 10 digits')
                })
                cy.xpath('//input[@placeholder="Enter ID"]').clear()
                cy.wait(5000)
                cy.xpath('//input[@placeholder="Enter ID"]').type('1232323232')
                cy.contains('button', 'Register').click()
                cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) =>{
                    expect(text).to.eq('Phone Number is required')
                    cy.wait(5000)
                })
                cy.xpath('//input[@placeholder="Phone Number"]').type('056')
                cy.contains('button', 'Register').click()
                cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) =>{
                    expect(text).to.eq('Phone Number should be 10 digits')
                    cy.xpath('//input[@placeholder="Phone Number"]').clear()
                    cy.wait(5000)
                })
                cy.xpath('//input[@placeholder="Phone Number"]').type('1111111111')
                cy.contains('button', 'Register').click()
                cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) =>{
                    expect(text).to.eq('Phone Number is not valid')
                    cy.xpath('//input[@placeholder="Phone Number"]').clear()
                    cy.wait(5000)
                })
                cy.xpath('//input[@placeholder="Phone Number"]').type('0566532632')
                cy.xpath('//input[@placeholder="Email Address"]').type('shoukat')
                cy.contains('button', 'Register').click()
                cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) =>{
                    expect(text).to.eq('Email is not valid')
                    cy.xpath('//input[@placeholder="Enter ID"]').clear()
                    cy.xpath('//input[@placeholder="Phone Number"]').clear()
                    cy.xpath('//input[@placeholder="Email Address"]').clear()
                    cy.wait(5000)
                })
                cy.xpath('//input[@placeholder="Enter ID"]').type('1232123232')
                    cy.xpath('//input[@placeholder="Phone Number"]').type('0548562362')
                cy.xpath('//input[@placeholder="Email Address"]').type('shouka@gmail.com')
                cy.contains('button', 'Register').click()
                cy.wait(10000)
                cy.get('.toasted-container.top-right')
                .invoke('text')
                .then((text) =>{
                    expect(text).to.eq(`The medical file against this Saudi ID / Iqama Id doesn't found`)
                })
            })


    }

}
const register = new Registeration();
export default register;