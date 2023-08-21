import login from '../../support/doctor_login'

describe('Login as a Doctor', () => {
    beforeEach(() => {
        cy.visit('https://stage-patientportal.almoosahospital.com.sa/auth/user/dashboard',{timeout:60000})
    })

    it('Login with correct Id and password', () => {
        login.doctorLogin()
    })
    it('Login with Incorrect Credentials', () => {
        login.doctorloginFailed()
    }) 
})