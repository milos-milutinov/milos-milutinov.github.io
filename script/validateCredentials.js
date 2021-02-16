function validateCredentials() {

}

function stringContainsLowerCase(string) {
    return /[a-z]/.test(string);
}

function stringContainsUpperCase(string) {
    return /[A-Z]/.test(string);
}

function stringContainsANumber(string) {
    return /[0-9]/.test(string);
}

function stringContainsSpecialCharacter(string) {
    return /@"\|!#$%&\/()=?»«@£§€{}.-;'<>_,"/.test(string);
}

function emailIsValid(email) {
    return /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(email);
}
