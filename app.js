document.getElementById(`submit`).addEventListener(`click`, submitLogin);

let debug = {};
isloggedin = false

function submitLogin() {
  let username = document.getElementById(`username`).value;
  let password = document.getElementById(`password`).value;

  axios
    .request({
      url: `https://reqres.in/api/login`,
      method: `POST`,
      data: {
        email: username,
        password: password,
      },
      // data: {
      //     email: "eve.holt@reqres.in",
      //     password: "123",
      // },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(successFunction)
    .catch(failureFunction);
}

function successFunction(request) {
  console.log(request);
  if (request.status == 200) {
    document.getElementById(
      `error_container`
    ).innerHTML = `<h3 style="color: green">Login Success</h3>`;
    isloggedin = true
    updateCookies(isloggedin)
  }
  document.body.style.cursor = "wait";
  setTimeout(function () {
    window.location.href = `home.html`;
  }, 2400);
}

function failureFunction(error) {
  debug = error;
  document.getElementById(
    `error_container`
  ).innerHTML = `<h3 style="color: red">
    Login Failed: 
    ${JSON.parse(debug.request.responseText).error}
    </h3>`;
  console.log(error);
  isloggedin = false
  updateCookies(isloggedin)
}

function updateCookies(value) {
  let value_JSON = JSON.stringify(value);

  Cookies.set("isloggedin", value_JSON);

  console.log(value);
}
