import logout from '../../support/Patient_Classes/Patient_logout/patient_logout'
describe('Logout from Patient', () => {
    beforeEach(() => {
        cy.visit('https://stage-patientportal.almoosahospital.com.sa/auth/user/dashboard',{timeout:60000})
    })

    it('Patient Logout', () => {
        logout.PatientLogout()
    })
})