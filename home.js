let isloggedin = JSON.parse(Cookies.get(`isloggedin`));

if (isloggedin) {
  axios
    .request({
      url: `https://reqres.in/api/unknown`,
    })
    .then(successFunction)
    .catch(failureFunction);

  let debug;

  function successFunction(request) {
    debug = request;

    for (let i = 0; i < request.data.data.length; i++) {
      let name = request.data.data[i].name;
      let hexcode = request.data.data[i].color;
      let year = request.data.data[i].year;

      document.getElementById(`page_container`).insertAdjacentHTML(
        `beforeend`,
        `
            <div>
            <h1>${name}</h1>
            <div style="width: 300px; height: 300px; background-color: ${hexcode}"></div>
            <p>This color was invented in the year <b>${year}</b></p>
            </div>
            `
      );
    }
  }

  function failureFunction(error) {
    console.log(error);
  }
}
