class GetUsers {
    getUserData(userId) {
        return cy.fixture('users.json').then(users => {
            const user = users.find(user => user.id === userId);
            return user ? { mrn: user.mrn, password: user.password, id: user.id } : null;
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
}

export default GetUsers;
