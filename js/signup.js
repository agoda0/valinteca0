let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let passwordConfirm = document.getElementById('passwordConfirm');
let register = document.getElementById('register');
let form = document.getElementById('form');


let usernameError = document.getElementById('usernameError');
let emailError = document.getElementById('emailError');
let passError= document.getElementById('passError');
let passConfirmError =document.getElementById('passConfirmError');


let successResponse = {};
let errorResponse = {};


// username frontend validation
function usernameValidation(){
    let rejex = /^[A-z][A-z0-9]{3,13}[A-z]$/;
    if (!rejex.test(username.value)){
        username.classList.add('is-invalid');
        username.classList.remove('is-valid');
        usernameError.classList.add('d-block');
        usernameError.classList.remove('d-none');
        return false;
    } else {
        username.classList.add('is-valid');
        username.classList.remove('is-invalid');
        usernameError.classList.remove('d-block')
        usernameError.classList.add('d-none')
        return true;
    }
}
// email frontend validation
function emailValidation(){
    if(email.checkValidity()){
        email.classList.add('is-valid');
        email.classList.remove('is-invalid');
        emailError.classList.remove('d-block')
        emailError.classList.add('d-none')
        return true;
    }else{
        email.classList.add('is-invalid');
        email.classList.remove('is-valid');
        emailError.classList.add('d-block')
        emailError.classList.remove('d-none')
        return false;
    }
}
// password frontend validation
function passwordValidation(){
    if(password.checkValidity()){
        password.classList.add('is-valid');
        password.classList.remove('is-invalid');
        passError.classList.remove('d-block')
        passError.classList.add('d-none')
        return true;
    }else{
        password.classList.add('is-invalid');
        password.classList.remove('is-valid');
        passError.classList.add('d-block')
        passError.classList.remove('d-none')
        return false;
    }
}
// password confirmation frontend validation
function passwordConfirmValidation(){
    if(passwordConfirm.checkValidity()){
        passwordConfirm.classList.add('is-valid');
        passwordConfirm.classList.remove('is-invalid');
        passConfirmError.classList.remove('d-block')
        passConfirmError.classList.add('d-none')
        return true;
    }else{
        passwordConfirm.classList.add('is-invalid');
        passwordConfirm.classList.remove('is-valid');
        passConfirmError.classList.add('d-block')
        passConfirmError.classList.remove('d-none')
        return false;
    }
}
username.onkeyup = function(){usernameValidation()}
email.onkeyup = function(){emailValidation()}
password.onkeyup = function(){passwordValidation()}
passwordConfirm.onkeyup = function(){passwordConfirmValidation()}
// display password api validation
function passwordValidationFromApi(){
    password.classList.add('is-invalid');
    password.classList.remove('is-valid');
    passError.classList.add('d-block')
    passError.classList.remove('d-none')
    passError.innerHTML = " "
    passwordConfirm.classList.add('is-invalid');
    passwordConfirm.classList.remove('is-valid');
    passConfirmError.classList.add('d-block')
    passConfirmError.classList.remove('d-none')
    passConfirmError.innerHTML = " "
    for(let error of errorResponse.password){
        passError.innerHTML += `${error} <br>`;
        passConfirmError.innerHTML += `${error} <br>`;
    }
}
// display username api validation
function usernameValidationFromApi(){
    username.classList.add('is-invalid');
    username.classList.remove('is-valid');
    usernameError.classList.add('d-block');
    usernameError.classList.remove('d-none');
    usernameError.innerHTML = " "
    for(let error of errorResponse.username){
        usernameError.innerHTML += `${error} <br>`;
    }
}
// display email api validation
function emailValidationFromApi(){
    email.classList.add('is-invalid');
    email.classList.remove('is-valid');
    emailError.classList.add('d-block');
    emailError.classList.remove('d-none');
    emailError.innerHTML = " "
    for(let error of errorResponse.email){
        emailError.innerHTML += `${error} <br>`;
    }
}
// submit form to api
form.addEventListener('submit' , function(e){
    // check all values validation before send to api
    if(usernameValidation() && emailValidation() && passwordValidation() && passwordConfirmValidation()){
        e.preventDefault();
        postData();
    } else {
        alert(' Follow Instructions To Enter The Correct Data ');
    }
})
window.addEventListener('keyup' , function(e){
    if(e.code == "Enter"){
        if(usernameValidation() && emailValidation() && passwordValidation() && passwordConfirmValidation()){
            e.preventDefault();
            postData();
        } else {
            alert(' Follow Instructions To Enter The Correct Data ');
        }
    }
})

async function postData(){
    let user = {
        username : username.value,
        email : email.value,
        password : password.value,
        password_confirmation : passwordConfirm.value
    }
    // Post to api
    const fetchPromise = await fetch(`https://goldblv.com/api/hiring/tasks/register`,{
        method:'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(user)
    });
    let response = fetchPromise.json();
    if(fetchPromise.status == 201){
        // response from api success
        await response.then((data) => {successResponse = data })
        localStorage.setItem('logs', JSON.stringify(successResponse));
        window.location = 'success.html';
    } else {
        // response from api handle errors
        await response.then((data) =>{errorResponse = data.errors});
        if(errorResponse.password){passwordValidationFromApi()} 
        if(errorResponse.username){usernameValidationFromApi()}
        if(errorResponse.email){emailValidationFromApi()}
    }
}

