
const deleteArt = (e) => {
  let delete_promise = fetch('/v1/articles/' + e.dataset.artid, { method: 'DELETE'})
  delete_promise.then(response => response.json())
                     .then( data => {
                        window.location = data.redirect;
                     })
                     .then(data => {  })
    .catch((reject) => {
      document.getElementById("message").textContent = reject;
    });
}

const updateArt = (e) => {
  const tds = document.querySelectorAll(`#tr_${e.dataset.artid} td`);
  const code = tds[1].innerText;
  const name = tds[2].innerText;
  const desc = tds[3].innerText;
  let update_promise = fetch(`/v1/articles/id/${e.dataset.artid}/code/${code}/name/${name}/desc/${desc}/`
                             , { method: 'PUT'})
  update_promise.then(response => response.json())
                     .then( data => {
                        window.location = data.redirect;
                     })
                     .then(data => {  })
    .catch((reject) => {
      document.getElementById("message").textContent = reject;
    });
}