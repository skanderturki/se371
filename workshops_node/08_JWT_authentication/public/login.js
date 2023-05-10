

const doLogin = (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email == "" || password == "") {
    alert("Email and password cannot be empty");
    return;
  }

  fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        password: password,
    })
  }).then((result) => {
      if (result.ok) return result.json();
      return result.json().then( json => Promise.reject(json));
  }).then(( result ) => {
        const url = result.redirectionURL;
        const token = result.accessToken;
        window.location = url + '/token/' + token;
  }).catch( err => {
      console.error(err);
  })
}


document.addEventListener("DOMContentLoaded", () => {
  const form_login = document.getElementById("form_login");
  form_login.addEventListener("submit", doLogin);
})
