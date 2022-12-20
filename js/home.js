let started = document.getElementById('started');
started.onclick = function(){submitToRegister()};
window.addEventListener('keyup' , function(e){
    if(e.code == "Enter"){
        submitToRegister()
    }
})
function submitToRegister(){
    window.location = 'signup.html';
}












