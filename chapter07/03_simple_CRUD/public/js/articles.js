
const deleteArt = (obj) => {
  let delete_promise = fetch('/articles/v1/' + obj.dataset.artid, { method: 'DELETE'})
  delete_promise.then(data => {
                        //alert(`Article deleted successfully!`);
                     })
    .catch((reject) => {
      document.getElementById("message").textContent = reject;
    });
}

const updateArt = (obj) => {
  const tds = document.querySelectorAll(`#tr_${obj.dataset.artid} td`);
  const code = tds[1].innerText;
  const name = tds[2].innerText;
  const desc = tds[3].innerText;
  let update_promise = fetch(`/articles/v1/id/${obj.dataset.artid}/code/${code}/name/${name}/desc/${desc}/`
                             , { method: 'PUT'})
  update_promise.then( data => {
                        //alert(`Article updates successfully!`);
                     })
    .catch((reject) => {
      document.getElementById("message").textContent = reject;
    });
}