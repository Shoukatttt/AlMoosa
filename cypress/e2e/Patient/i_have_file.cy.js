import register from "../../support/Patient_Classes/Patient_Registration/i_have_file";

describe('Register Via Medical File Process', () => {
    beforeEach(() => {
        cy.visit('https://stage-patientportal.almoosahospital.com.sa/auth/user/dashboard',{timeout:60000})
    })
    it('Register via Iqama Id', () => {
        register.RegisterViaIqamaId()

    })
    it('Register Via Saudi Id',() =>{
        register.RegisterViaSaudiId()
    })
    it('Verify Input Validations on Register Screen.',() =>{
        register.InputValidations()
    })
})