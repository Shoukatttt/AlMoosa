import GetUsers from '../../get_users'
import 'cypress-file-upload';

let toast_message
class Registeration {
    users = new GetUsers();
    RegisterViaSaudiId() {
        cy.get('.language-switcher').click()
        cy.contains('Register').click()
        cy.contains('Do you have a medical file?').should('be.visible')
        cy.contains('button', `I don't have a medical file`).click()
        try {
            cy.url().then((url) => {
                expect(url).to.eq('https://stage-patientportal.almoosahospital.com.sa/auth/user/register/')
                // cy.get('.multiselect__prepend-icon', { timeout: 10000 }).click();
                // cy.contains('.multiselect__element', 'Proceed with Iqama ID').click();
            })
        } catch (error) {
            cy.log('An error occurred:', error);

        }

        cy.xpath('//input[@placeholder="Enter the ID Number"]').click()
        cy.xpath('//input[@placeholder="Enter the ID Number"]').type('1221212212')
        cy.xpath('//input[@placeholder="First Name"]').type('Shoukat')
        cy.xpath('//input[@placeholder="Middle Name"]').type('QA')
        cy.xpath('//input[@placeholder="Family Name"]').type('Engineer')
        cy.xpath('//input[@placeholder="Email Address"]').type('shoukat@gmail.com')
        cy.get('.multiselect__placeholder').click()
        cy.contains('Male').should('be.visible').click()
        cy.get('#datepicker-placeholder__value_').click()
        cy.get('div[aria-label="10/4/2023 (Today)"]').click()
        cy.xpath('//input[@placeholder="Primary"]').type('0568214562')
        cy.xpath('//input[@placeholder="Secondary"]').type('0568214562')
        cy.xpath('//input[@placeholder="Area"]').type('Test')
        cy.xpath('//input[@placeholder="City"]').type('Test')
        cy.xpath('//input[@placeholder="District"]').type('Test')
        cy.fixture('imag1.jpg', 'base64').then((fileContent) => {
            cy.get('.file-upload-container').find('.upload-text').click({ force: true })
            const formData = new FormData();
            formData.append('patient_id', new Blob([fileContent], { type: 'image/jpeg' }), 'imag1.jpg');
            cy.get('.file-upload-container').find('.upload-text').click({ force: true })
            cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/mediafiles/upload', (req) => {
                req.body = formData;
                req.headers = {
                    'Content-Type': 'multipart/form-data',
                    "Connection": "keep-alive",
                    "Bypass-Ash-Deprecated-Version": "true"
                }
            }).as('uploadRequest')
            cy.wait('@uploadRequest', { timeout: 10000 }).then((interception) => {
                console.log('API Response:', interception.response);
                expect(interception.response.statusCode).to.equal(201);
                // cy.request({
                //     method: 'POST',
                //     url: 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/mediafiles/upload',
                //     body: formData,
                //     headers: {
                //       'Content-Type': 'multipart/form-data',
                //       "Connection": "keep-alive",
                //       "Bypass-Ash-Deprecated-Version":"true"
                //     },}).then((response) => {
                //         expect(response.status).to.equal(201);
                //       });
            });


        });


    }
}
    const register = new Registeration();
export default register;

// cy.request({
//     method: 'POST',
//     url: 'https://stage-ash-backend.almoosahospital.com.sa/api/v1/mediafiles/upload', // Replace with your API endpoint
//     body: formData, // Set the FormData as the request body
//     headers: {
//         'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
//     },
// }).then((response) => {
//     // Assert on the response as needed
//     expect(response.status).to.equal(201); // Example assertion
// });

// https://stage-ash-backend.almoosahospital.com.sa/api/v1/mediafiles/upload
// cy.get('.file-upload-container input[type="file"]').find('.upload-text')

// Assuming you have a file to upload in your project's fixtures folder
// For example, if you have a file named "example.txt" in the fixtures folder
// You can use cy.fixture to read the file



// cy.get('.file-upload-container').click()


// cy.xpath('//input[@placeholder="Phone Number"]').type(userData.phone)
// cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v2/auth/patient/register',).as('getResponse')
// cy.contains('button', 'Register').click()
// cy.wait(10000)
// cy.wait('@getResponse', { timeout: 10000 }).then((interception) => {
//     expect(interception.response.statusCode).to.eq(201)
//     const message = interception.response.body.message
//     const status = interception.response.body.status
//     if (status === true) {
//         cy.contains('Registered Successfully').should('be.visible')
//         cy.contains('button', 'Ok').click()
//         cy.contains('button', 'Login').should('be.visible')
//     }
//     else {
//         cy.log(`Here is the response message from API: ${message}`)
//         cy.contains('Already Registered').should('be.visible')
//         cy.get('.swal2-confirm').click()
//         cy.contains('button', 'Login').should('be.visible')
//     }
// })
// RegisterViaSaudiId() {
//     cy.get('.language-switcher').click()
//     cy.contains('Register').click()
//     cy.contains('Do you have a medical file?').should('be.visible')
//     cy.contains('button', 'I have a medical file').click()
//     try {
//         cy.url().then((url) => {
//             expect(url).to.eq('https://stage-patientportal.almoosahospital.com.sa/auth/user/register/medical-file')
//         })
//     } catch (error) {
//         cy.log('An error occurred:', error);

//     }
//     this.users.RegisterViaSaudiId().then((userData) => {
//         cy.xpath('//input[@placeholder="Enter ID"]').type(userData.saudiId)
//         cy.xpath('//input[@placeholder="Phone Number"]').type(userData.phone)
//         cy.intercept('POST', 'https://stage-ash-backend.almoosahospital.com.sa/api/v2/auth/patient/register',).as('getResponse')
//         cy.contains('button', 'Register').click()
//         cy.wait(10000)
//         cy.wait('@getResponse', { timeout: 10000 }).then((interception) => {
//             expect(interception.response.statusCode).to.eq(201)
//             const message = interception.response.body.message
//             const status = interception.response.body.status
//             if (status === true) {
//                 cy.contains('Registered Successfully').should('be.visible')
//                 cy.contains('button', 'Ok').click()
//                 cy.contains('button', 'Login').should('be.visible')
//             }
//             else {
//                 cy.log(`Here is the response message from API: ${message}`)
//                 cy.contains('Already Registered').should('be.visible')
//                 cy.get('.swal2-confirm').click()
//                 cy.contains('button', 'Login').should('be.visible')
//             }
//         })

//     })
// }
// InputValidations() {
//     cy.get('.language-switcher').click()
//     cy.contains('Register').click()
//     cy.contains('Do you have a medical file?').should('be.visible')
//     cy.contains('button', 'I have a medical file').click()
//     try {
//         cy.url().then((url) => {
//             expect(url).to.eq('https://stage-patientportal.almoosahospital.com.sa/auth/user/register/medical-file')
//         })
//     } catch (error) {
//         cy.log('An error occurred:', error);

//     }
//     cy.contains('button', 'Register').click()
//     cy.get('.toasted-container.top-right')
//         .invoke('text')
//         .then((text) => {
//             toast_message = text
//             expect(toast_message).to.eq('Saudi ID is required')
//             cy.wait(5000)
//             cy.xpath('//input[@placeholder="Enter ID"]').type('123')
//             cy.contains('button', 'Register').click()
//             cy.get('.toasted-container.top-right')
//             .invoke('text')
//             .then((text) =>{
//                 expect(text).to.eq('Saudi ID should be 10 digits')
//             })
//             cy.wait(5000)
//             cy.xpath('//input[@placeholder="Enter ID"]').type('123222222222')
//             cy.contains('button', 'Register').click()
//             cy.get('.toasted-container.top-right')
//             .invoke('text')
//             .then((text) =>{
//                 expect(text).to.eq('Saudi ID should be 10 digits')
//             })
//             cy.xpath('//input[@placeholder="Enter ID"]').clear()
//             cy.wait(5000)
//             cy.xpath('//input[@placeholder="Enter ID"]').type('1232323232')
//             cy.contains('button', 'Register').click()
//             cy.get('.toasted-container.top-right')
//             .invoke('text')
//             .then((text) =>{
//                 expect(text).to.eq('Phone Number is required')
//                 cy.wait(5000)
//             })
//             cy.xpath('//input[@placeholder="Phone Number"]').type('056')
//             cy.contains('button', 'Register').click()
//             cy.get('.toasted-container.top-right')
//             .invoke('text')
//             .then((text) =>{
//                 expect(text).to.eq('Phone Number should be 10 digits')
//                 cy.xpath('//input[@placeholder="Phone Number"]').clear()
//                 cy.wait(5000)
//             })
//             cy.xpath('//input[@placeholder="Phone Number"]').type('1111111111')
//             cy.contains('button', 'Register').click()
//             cy.get('.toasted-container.top-right')
//             .invoke('text')
//             .then((text) =>{
//                 expect(text).to.eq('Phone Number is not valid')
//                 cy.xpath('//input[@placeholder="Phone Number"]').clear()
//                 cy.wait(5000)
//             })
//             cy.xpath('//input[@placeholder="Phone Number"]').type('0566532632')
//             cy.xpath('//input[@placeholder="Email Address"]').type('shoukat')
//             cy.contains('button', 'Register').click()
//             cy.get('.toasted-container.top-right')
//             .invoke('text')
//             .then((text) =>{
//                 expect(text).to.eq('Email is not valid')
//                 cy.xpath('//input[@placeholder="Enter ID"]').clear()
//                 cy.xpath('//input[@placeholder="Phone Number"]').clear()
//                 cy.xpath('//input[@placeholder="Email Address"]').clear()
//                 cy.wait(5000)
//             })
//             cy.xpath('//input[@placeholder="Enter ID"]').type('1232123232')
//                 cy.xpath('//input[@placeholder="Phone Number"]').type('0548562362')
//             cy.xpath('//input[@placeholder="Email Address"]').type('shouka@gmail.com')
//             cy.contains('button', 'Register').click()
//             cy.wait(10000)
//             cy.get('.toasted-container.top-right')
//             .invoke('text')
//             .then((text) =>{
//                 expect(text).to.eq(`The medical file against this Saudi ID / Iqama Id doesn't found`)
//             })
//         })


// }