localStorage = {
    username: '',
    password: '',
    token: '',
    department: '',
    thname: '',
    enname:'',
    email: '',
    faculty: '',
    status: '',
};

function login() {
// state is the state of the login form


  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://restapi.tu.ac.th/api/v1/auth/Ad/verify");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader(
    "Application-Key",
    "TU0489b72c925ce111d4dec85273ba7e4629d711fa3ad28b3fa68957b3f43ffdcf8b15333d373a293395047a0f1ea449f5"
  );
  xhttp.send(JSON.stringify({ UserName: username, PassWord: password }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const object = JSON.parse(xhttp.responseText);
        // set local storage
        localStorage.username = username;
        localStorage.password = password;
        localStorage.token = object.token;
        localStorage.department = object.department;
        localStorage.thname = object.displayname_th;
        localStorage.enname = object.displayname_en;
        localStorage.email = object.email;
        localStorage.faculty = object.faculty;
        localStorage.status = "login";


      console.log(object);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Success',
        showConfirmButton: false,
        timer: 1500
      })
        window.setTimeout(function(){
            window.location.href = "../html/home.html";
        }
        ,1500);

    }
    if (this.readyState != 4 && this.status != 200) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username or Password is incorrect!',
            footer: '<a href="../html/forgot.html">Forgot password?</a>'
          })
    }
  };
}
// get localStorage
console.log(localStorage);

function logout(){
    localStorage.clear();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'LogOut Success',
        showConfirmButton: false,
        timer: 1500
      })
        window.setTimeout(function(){
            window.location.href = "../html/index.html";
        }
        ,1500);
}

let showusername = document.getElementById("username")
showusername.innerHTML += localStorage.username;

// dont let user go back to login page if not logout
if(localStorage.status == "login"){
    // get path
    let path = window.location.pathname;
    let page = path.split("/").pop();
    if (page == "index.html"){
        window.location.href = "../html/home.html";
    }
}

let email = document.getElementById("email");
email.value += localStorage.email;
let stuid = document.getElementById("stuid");
stuid.value += localStorage.username;
let thname = document.getElementById("thname");
thname.value += localStorage.thname;
let enname = document.getElementById("enname");
enname.value += localStorage.enname;
let faculty = document.getElementById("faculty");
faculty.value += localStorage.faculty;
let department = document.getElementById("department");
department.value += localStorage.department;

var state= false;
function toggle(){
    if(state){
	document.getElementById("password").setAttribute("type","password");
	document.getElementById("eye").style.color='#7a797e';
	state = false;
     }
     else{
	document.getElementById("password").setAttribute("type","text");
	document.getElementById("eye").style.color='#5887ef';
	state = true;
     }
}