import login from '../../support/Doctor_Classes/Doctor_login/doctor_login'

describe('Login as a Doctor', () => {
    beforeEach(() => {
        cy.visit('https://stage-patientportal.almoosahospital.com.sa/auth/user/dashboard',{timeout:100000})
    })

    it('Login with correct Id and password', () => {
        login.doctorLogin()
    })
    it.only('Login with Incorrect Credentials', () => {
        login.doctorloginFailed()
    }) 
})