
const makeArticle = (htmlID, position, name, lastname, email) => {
  const html = `<article> \
    <h2>Position: ${position}</h2>
    <p>Name: ${name}</p>
    <p>Last name: ${lastname}</p>
    <p>Email: ${email}</p>
  </article>`;

  const e = document.getElementById(htmlID);
  e.innerHTML = html;
}

makeArticle("display", "Director", "Saleh", "Munthir", "smunthir@PushSubscription.edu.sa");