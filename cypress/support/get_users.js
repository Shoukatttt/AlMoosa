class GetUsers {
    getUserData(userId) {
        return cy.fixture('users.json').then(users => {
            const user = users.find(user => user.id === userId);
            return user ? { mrn: user.mrn, password: user.password, id: user.id, saudiId: user.saudi_id, iqamaId: user.iqama_id  } : null;
        });
    }

    getUserWithMRN() {
        return this.getUserData(1);
    }

    getUserWithIncorrectMRNCorrectPassword() {
        return this.getUserData(4);
    }

    getUserWithCorrectMRNIncorrectPassword() {
        return this.getUserData(5);
    }

    getUserWithIncorrectMRNIncorrectPassword() {
        return this.getUserData(6);
    }
    getUserWithCorrectSaudiId() {
        return this.getUserData(2)
    }
    getUserWithInCorrectSaudiId() {
        return this.getUserData(7)
    }
    getUserWithCorrectIqamaId() {
        return this.getUserData(3)

    }
    getUserWithInCorrectIqamaId() {
        return this.getUserData(8)

    }
}

export default GetUsers;
