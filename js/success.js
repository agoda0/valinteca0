let loggedAccount = document.getElementById('loggedAccount');
let mail = JSON.parse(localStorage.getItem('logs')).email;
loggedAccount.innerHTML = `${mail}`;