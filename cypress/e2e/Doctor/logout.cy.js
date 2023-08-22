import logout from '../../support/doctor_logout'
describe('Logout from Doctor', () => {
    beforeEach(() => {
        cy.visit('https://stage-patientportal.almoosahospital.com.sa/auth/user/dashboard',{timeout:60000})
    })

    it('Doctor Logout', () => {
        logout.doctorLogout()
    })
})