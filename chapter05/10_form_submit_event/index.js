
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration_form");
  form.addEventListener("submit", (e) => {
    let email = document.getElementById("email").value;
    if(!email){
      e.preventDefault();
      displayErrorMessageByID("email_err", "Incorrect Email format!");
      return;
    } else {
      const email_pattern = /[a-zA-Z0-9\-_]{+}@[a-zA-Z0-9\-_\.]{+}.[a-zA-Z0-9\-_]{1,10}/
      const valid = email_pattern.test(email);
      if(!valid){
        e.preventDefault();
        displayErrorMessageByID("email_err", "Incorrect Email format!");
        return;
      }
    }
  });
});

function displayErrorMessageByID(elementID, message){
  const element = document.getElementById(elementID);
  element.innerText = message;
}


