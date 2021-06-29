"use strict";

// AllUsers Data Object
const userSignUp = {
  fullname: [],
  pass: [],
  confirmPass: [],
  email: [],
  gsm: [],
  data(Index, name, pass = "şifre bulunamadı", email, gsm) {
    console.log(
      `${Index} Index numaralı "${name}" ismindeki  kullanıcıya ait => şifre: ${pass}, e-mail: ${email}, gsm: ${gsm}`
    );
  },
};

// Current User Account Data Object
const accountİnfo = {
  Bitcoin: 0,
  Etherium: 0,
  Ripple: 0,
  Litecoin: 0,
  currencyDeposits: [],
  currencyWithdrawals: [],
  currentUserMovementsFeedback: [],
};
// To transfer account movements to allusers object
const allUsersAccountMov = new Array();

// NAVBAR INIT
const currentAccount = document.querySelector(".welcome");
const navLog = document.querySelector(".nav-log");
const navLogInputs = navLog.getElementsByTagName("input");
const navLogBtn = navLog.getElementsByTagName("button")[0];
const navCurrency = document.querySelector(".navbar-currency");
const currencyNav = document.getElementById("currency-nav");
const changeCurrency = function () {
  // Change The selected Currency
  selectedCurrency = currencyNav.value;

  inBalance = 0;
  outBalance = 0;
  // Reset Money IN
  inBalance += Number(depositAmount.value);
  moneyIn.textContent = Number(inBalance);

  // Reset Money IN
  outBalance += Number(transferMoneyAmount.value);
  moneyOut.textContent = Number(outBalance);

  // Get Coin Pngs
  for (let i = 0; i < 4; i++) {
    currentCoin[i].src = `img/${selectedCurrency}.png`;
  }
  coinImg.style.animation = "auto-logout 0.25s ease alternate infinite ";
  setTimeout(function () {
    coinImg.style.animation = null;
  }, 1000); //wait 0.5 seconds
  balance = allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`];
  totalBalance.textContent = new Intl.NumberFormat(navigator.language).format(
    balance
  );
  const calculated = calculateInterest(
    allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`],
    1,
    selectedInterest,
    2
  );
  const result =
    calculated -
    allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`];
  moneyInterest.textContent = new Intl.NumberFormat(navigator.language).format(
    result
  );
};

// FORM INIT
const section1 = document.querySelector(".Form");
const signUp = document.querySelector(".sign-up");
const signIn = document.querySelector(".sign-in");
const logAccount = document.querySelector(".Log-Account");
const eye = document.querySelectorAll(".eye");
const eyeClosed = document.querySelectorAll(".closed-eye");
const currency = document.getElementById("currency");
let selectedCurrency;
const interest = document.getElementById("interest");
let selectedInterest;
const createAccount = document.querySelector(".Create-Account");
const logTel = document.querySelector(".Log-Tel");
const logTelInputs = logTel.getElementsByTagName("input");
const switchSignIn = document.getElementById("go-sign-in");
const switchSignUp = document.getElementById("go-sign-up");
const createInputs = createAccount.getElementsByTagName("input");
const logInputs = logAccount.getElementsByTagName("input");
const divs = createAccount.getElementsByTagName("div");
const divss = logAccount.getElementsByTagName("div");
const fullNameBlank = document.querySelector(".Full-Name");
const passBlank = document.querySelector(".password");
const confirmPassBlank = document.querySelector(".confirm-password");
const telBlank = document.querySelector(".tel");
const choose = document.querySelector(".choose");
let valueIndexNumb;
const allUser = new Array();
const currentUser = [];
const sendCodeBtn = document.getElementById("send-code");
const sendCodeInput = document.getElementById("Code");
let code;
const waitCode = document.querySelector(".time");
const logMessage = document.querySelector(".message");

// USER ACCOUNT INIT
const section2 = document.querySelector(".User-Account");
const coinImg = document.querySelector(".coin");
const logOut = document.querySelector(".Log-Out");
const currentBalanceShowId = document.querySelector(".uid");
const totalBalance = document.querySelector(".total-balance");
const incDecValue = document.querySelector(".inc-dec-value");
const portfilio = document.querySelector(".show-portfilio");
const moneyIn = portfilio.getElementsByTagName("span")[0];
const moneyOut = portfilio.getElementsByTagName("span")[1];
const moneyInterest = portfilio.getElementsByTagName("span")[2];
const sort = portfilio.querySelector(".sort");
const tranfers = document.querySelector(".transferans");
const transferMoney = document.querySelector(".transfer-money");
const transferCrypto = transferMoney.getElementsByTagName("span")[0];
const transferMoneyTo = document.getElementById("username");
const transferMoneyAmount = document.getElementById("transfer-amount");
const transferMoneyBtn = transferMoney.getElementsByTagName("button")[0];
const deposit = document.querySelector(".deposit");
const depositAmount = document.getElementById("deposit-amount");
const depositBtn = deposit.getElementsByTagName("button")[0];
const closeAccount = document.querySelector(".close-account");
const closeAccountInputs = closeAccount.getElementsByTagName("input");
const closeAccountUser = document.getElementById("conf-username");
const closeAccountPass = document.getElementById("conf-pass");
const closeAccountBtn = closeAccount.getElementsByTagName("button")[0];
const currentCoin = section2.getElementsByTagName("img");
const transactions = document.querySelector(".account-transactions");
let resultDeposit = new Array();
const logOutCountdown = document.querySelector(".countdown");
let interval2;
let deletedUserInfo = [];
const allDeletedUsersInfo = [];
let countSortClick = 0;
let sortArr = new Array();

// Clear Send Code Button
const clearSendCodeInput = function () {
  document.getElementById("phone2").style.boxShadow = null;
  logTel.getElementsByTagName("span")[0].classList.remove("invalid");
  logTel.getElementsByTagName("span")[0].classList.remove("valid");
  logTel.getElementsByTagName("span")[0].classList.remove("length");
  logTel.getElementsByTagName("span")[0].classList.remove("Correct");
};

// Active (for after send code success login to start countdown with deposit btn click)
let active = 0;

// Clear Create Account Inputs
const clearCreateAccountInput = function () {
  document.getElementById("pass1").style.boxShadow = null;
  if (createInputs[1].value === createInputs[2].value)
    document.getElementById("pass2").style.boxShadow = null;
  document.getElementById("phone").style.boxShadow = null;
  divs[4].getElementsByTagName("span")[0].classList.remove("valid");
  confirmPassBlank.classList.remove("matchup");
};

// clear Log Account Inputs
const clearLogAccountInput = function () {
  document
    .getElementById("open-padlock")
    .classList.remove("open-padlock-scale");
  document.getElementById("open-padlock").classList.add("hidden");
  document.getElementById("locked-padlock").classList.remove("hidden");
  divss[1].classList.remove("Correct");
  divss[0].classList.remove("opacity");
  divss[1].classList.remove("opacity");
  choose.classList.remove("invisible");
  signIn.classList.remove("invisible");
  divss[0].classList.remove("hidden");
  divss[1].classList.remove("hidden");
  divss[2].classList.add("hidden");
  navLogInputs[0].value = "";
  navLogInputs[1].value = "";
  logInputs[0].value = "";
  logInputs[1].value = "";
  logTelInputs[0].value = "";
};

// Hide phone number
const hidePhoneNumber = function (number) {
  const str = number + ""; // stringe çeviriyor
  const last = str.slice(0, 6);
  return last.padEnd(str.length, "*");
};

// Auto LOGOUT Countdown Start Counting
const autoLogoutFunc = function () {
  const autoLogoutMin = 10;
  let time = autoLogoutMin * 60;
  interval2 = setInterval(logoutCountdown, 1000);
  function logoutCountdown() {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (darkMode.checked) {
      logOutCountdown.style.color = "#ffffff";
    } else {
      logOutCountdown.style.color = "rgb(71, 70, 70)";
    }
    logOutCountdown.innerHTML = `${min < 10 ? "0" + min : min}:${
      sec < 10 ? "0" + sec : sec
    }`;
    time--;

    if (min === 0 && sec <= 10) {
      logOutCountdown.style.color = "red";
      logOutCountdown.style.animation =
        "auto-logout 0.5s ease alternate infinite";
    }
    if (min === 0 && sec === 0) {
      time = autoLogoutMin * 60;
      logOutCountdown.style.animation = null;
      clearInterval(interval2);
      logoutfunc();
    }
  }
};

// Save The Current Currency Total Balance
const saveBalance = function (selectedCurrency) {
  let saveTotalBalance = balance;
  allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`] =
    saveTotalBalance;
};

// Get Movements feedback
const movFeedbackFunc = function () {
  if (transactions.childElementCount >= 0) {
    allUsersAccountMov[currentUser[0].userID].currentUserMovementsFeedback = [];
    allUsersAccountMov[currentUser[0].userID].currentUserMovementsFeedback.push(
      ...transactions.children
    );
  }
};

// LOG IN Feedback
const LogInFunct = function () {
  const dateLogIn = new Date();
  console.log(
    `User "${currentUser[0].fullname}", UserID: #${
      currentUser[0].userID
    } is Log In!, Date: ${dateLogIn.toLocaleString()}`
  );
  if (
    allUsersAccountMov[currentUser[0].userID].currentUserMovementsFeedback != []
  ) {
    allUsersAccountMov[
      currentUser[0].userID
    ].currentUserMovementsFeedback.forEach(function (ul) {
      transactions.appendChild(ul);
    });
  }
  function createListItem(text) {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
  }
  const newUl = document.createElement("ul");
  const newLi = [
    createListItem(`${currentUser[0].fullname}  LOGIN`),
    createListItem(`${dateLogIn.toDateString()}`),
    createListItem(
      `${String(dateLogIn.getHours()).padStart(2, "0")} : ${String(
        dateLogIn.getMinutes()
      ).padStart(2, "0")} : ${String(dateLogIn.getSeconds()).padStart(2, "0")} `
    ),
    createListItem(`${selectedCurrency}`),
  ];
  newLi.forEach(function (li) {
    transactions.appendChild(newUl).appendChild(li);
  });
  newUl.style.backgroundColor = "#5AC278";
  newUl.style.height = "3rem";
  newUl.style.borderRadius = "20px 20px";
  newUl.firstChild.style.letterSpacing = "5px";
  console.log(`User ID => ${currentUser[0].userID}`);
  console.log(
    `${selectedCurrency} => ${
      allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`]
    }`
  );
};

// LOG-OUT
const logoutfunc = function () {
  const dateLogOut = new Date();
  console.log(
    `User "${currentUser[0].fullname}", UserID: #${
      currentUser[0].userID
    } is Log Out!, Date: ${dateLogOut.toLocaleString()}`
  );
  //LOG-OUT FeedBacks
  const dateLogout = new Date();
  function createListItem(text) {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
  }
  const newUl = document.createElement("ul");
  const newLi = [
    createListItem(`${currentUser[0].fullname}  LOGOUT`),
    createListItem(`${dateLogout.toDateString()}`),
    createListItem(
      `${String(dateLogout.getHours()).padStart(2, "0")} : ${String(
        dateLogout.getMinutes()
      ).padStart(2, "0")} : ${String(dateLogout.getSeconds()).padStart(
        2,
        "0"
      )} `
    ),
    createListItem(`${selectedCurrency}`),
  ];

  newLi.forEach(function (li) {
    transactions.appendChild(newUl).appendChild(li);
  });
  newUl.style.backgroundColor = "#ED385C";
  newUl.style.height = "3rem";
  newUl.style.borderRadius = "20px 20px";
  newUl.firstChild.style.letterSpacing = "5px";

  // Clearing Log Account
  clearLogAccountInput();
  currentAccount.innerHTML = "Log in to get started";
  navLogBtn.style.animation = null;
  navLogBtn.style.borderColor = null;

  // Get Movements feedback
  if (transactions.childElementCount >= 0) {
    allUsersAccountMov[currentUser[0].userID].currentUserMovementsFeedback.push(
      transactions.lastElementChild
    );
  }
  // Reset Information
  balance = 0;
  inBalance = 0;
  outBalance = 0;
  click = 0;
  active = 0;
  logOutCountdown.innerHTML = "";
  clearInterval(interval2);
  countArr = [];
  // Navbar Inputs
  navCurrency.style.animation = "opacity-scale 1s ease";
  navLog.style.animation = "navlog-reverse 0.75s ease forwards";
  // Launching Section2
  section1.classList.remove("hidden");
  section1.style.animation = "scale-reverse 1.25s ease";
  section2.style.animation = "opacity-scale  1s ease";
  section1.classList.add("absolute");
  setTimeout(function () {
    section1.classList.remove("absolute");
    logOutCountdown.style.animation = null;
    navCurrency.style.animation = null;
    navCurrency.style.display = "none";
    navLog.classList.remove("hidden");
  }, 750); //wait 0.75 seconds
  setTimeout(function () {
    section2.style.display = "none";
    navLog.style.animation = null;
    navLog.style.transform = "translateX(0rem)";

    // Clear Inputs
    moneyInterest.textContent = "0.00";
    moneyOut.textContent = "0.00";
    moneyIn.textContent = "0.00";
    totalBalance.textContent = 0.0;
    depositAmount.value = "";
    transferMoneyAmount.value = "";
    transferMoneyTo.value = "";
    closeAccountPass.value = "";
    closeAccountUser.value = "";
    logOutCountdown.style.color = "rgb(71, 70, 70)";
    // Clear Account-transactions
    transactions.innerHTML = "";
    // Clear cache memory
    sortArr = [];
    countSortClick = 0;
    currentUser.shift();
  }, 1500); //wait 1.5 seconds
};

// Dark Mode
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");
const codeLabel = document.querySelector(".Log-Password label");
const btn = document.querySelector(".button h5");
const darkMode = document.getElementById("dark-mode");
const mode = document.querySelector(".box-mode");
mode.addEventListener("click", function () {
  if (darkMode.checked) {
    document.querySelector(".body").classList.add("dark");
    sort.style.color = "#ffffff";
    btn.style.color = "#ffffff";
    createAccount.style.backgroundColor = "#5d5a5a";
    logAccount.style.backgroundColor = "#5d5a5a";
    codeLabel.style.color = "#ffffff";
    logOutCountdown.style.color = "#ffffff";
    sun.classList.remove("hidden");
    moon.classList.add("hidden");
  } else {
    document.querySelector(".body").classList.remove("dark");
    sort.style.color = "inherit";
    createAccount.style.backgroundColor = "#ffffff";
    logAccount.style.backgroundColor = "#ffffff";
    logOutCountdown.style.color = "rgb(71,70,70)";

    btn.style.color = "rgb(70,70,70)";
    codeLabel.style.color = "#555";
    moon.classList.remove("hidden");
    sun.classList.add("hidden");
  }
});

// <-- FORM SECTION -->
//Password Matchup

function checkPasswordMatch() {
  const fullName = document.getElementById("fullname").value;
  const password = document.getElementById("pass1").value;
  const confirmPassword = document.getElementById("pass2").value;
  const phone = document.getElementById("phone").value;
  // remove "can't be blank" span when start filling input field
  if (fullName != "") {
    divs[0].classList.remove("blank");
  }
  if (password != "") {
    divs[1].classList.remove("blank");
  }
  if (confirmPassword != "") {
    divs[2].classList.remove("blank");
  }
  if (phone != "") {
    divs[4].classList.remove("blank");
  }

  if (password != confirmPassword && confirmPassword != "") {
    confirmPassBlank.classList.add("not-matchup");
    confirmPassBlank.classList.remove("matchup");
    confirmPassBlank.classList.add("move-up");

    if (password === "") {
      createInputs[2].style.color = "red";
      divs[1].classList.add("blank");
    } else if (confirmPassword != "") {
      divs[1].classList.remove("blank");
      document.getElementById("pass2").style.boxShadow = "0 0 2px 1px red";
      createInputs[2].style.color = "red";
    }
    document.getElementById("pass1").style.boxShadow = null;
  } else if (password === "" && confirmPassword === "") {
    confirmPassBlank.classList.remove("not-matchup");
    confirmPassBlank.classList.remove("matchup");
    document.getElementById("pass2").style.boxShadow = null;
    confirmPassBlank.classList.remove("move-up");
  } else if (confirmPassword != "") {
    confirmPassBlank.classList.remove("not-matchup");
    confirmPassBlank.classList.add("matchup");
    confirmPassBlank.classList.remove("move-up");
    createInputs[2].style.color = null;

    document.getElementById("pass1").style.boxShadow =
      "0 0 2px 1px rgb(66, 248, 10)";
    if (password != "") {
      document.getElementById("pass2").style.boxShadow =
        "0 0 2px 1px rgb(66, 248, 10)";
      divs[1].classList.remove("blank");
    }
  }

  // Check Phone Number
  const phoneValue = createInputs[4].value;

  if (phoneValue[0] === "0") {
    divs[4].getElementsByTagName("span")[0].classList.remove("length");
    divs[4].getElementsByTagName("span")[0].classList.add("invalid");
    divs[4].getElementsByTagName("span")[0].classList.remove("valid");
    divs[4].getElementsByTagName("span")[0].classList.add("zero");
    console.log("sıfırla başlama");
    document.getElementById("phone").style.boxShadow = "0 0 2px 1px red";
  }
  /*
  // htmldeki oninput code olduğu için gerek kalmadı
  if (phoneValue[0] === " ") {
    divs[4].getElementsByTagName("span")[0].classList.remove("length");
    divs[4].getElementsByTagName("span")[0].classList.add("invalid");
    divs[4].getElementsByTagName("span")[0].classList.remove("valid");
    divs[4].getElementsByTagName("span")[0].classList.add("space");
    document.getElementById("phone").style.boxShadow = "0 0 2px 1px red";
  }
*/
  /*
  // htmldeki oninput code olduğu için gerek kalmadı
  for (let i = 0; i <= phoneValue.length; i++) {
    if (phoneValue[i] === " " && phoneValue[0] != "0") {
      divs[4].getElementsByTagName("span")[0].classList.remove("length");
      divs[4].getElementsByTagName("span")[0].classList.remove("valid");
      divs[4].getElementsByTagName("span")[0].classList.add("invalid");
      divs[4].getElementsByTagName("span")[0].classList.add("space");
      console.log("boşluk bırakma!");
      document.getElementById("phone").style.boxShadow = "0 0 2px 1px red";
    }
  }
  */
  if (createInputs[4].value === "") {
    divs[4].getElementsByTagName("span")[0].classList.remove("length");
    divs[4].getElementsByTagName("span")[0].classList.remove("invalid");
    divs[4].getElementsByTagName("span")[0].classList.remove("valid");
    divs[4].getElementsByTagName("span")[0].classList.remove("space");
    divs[4].getElementsByTagName("span")[0].classList.remove("zero");
    document.getElementById("phone").style.boxShadow = null;
  }

  if (
    createInputs[4].value.length != 10 &&
    createInputs[4].value != "" &&
    createInputs[4].value != " "
  ) {
    divs[4].getElementsByTagName("span")[0].classList.remove("length");
    divs[4].getElementsByTagName("span")[0].classList.add("invalid");
    divs[4].getElementsByTagName("span")[0].classList.remove("valid");
    divs[4].getElementsByTagName("span")[0].classList.remove("space");
  } else if (phoneValue[0] != 0) {
    divs[4].getElementsByTagName("span")[0].classList.remove("length");
    divs[4].getElementsByTagName("span")[0].classList.remove("invalid");
    divs[4].getElementsByTagName("span")[0].classList.add("valid");
    document.getElementById("phone").style.boxShadow =
      "0 0 2px 1px rgb(66, 248, 10)";
    divs[4].getElementsByTagName("span")[0].classList.remove("zero");

    for (let i = 0; i < phoneValue.length; i++) {
      if (phoneValue[i] === " ") {
        divs[4].getElementsByTagName("span")[0].classList.remove("length");
        divs[4].getElementsByTagName("span")[0].classList.remove("valid");
        divs[4].getElementsByTagName("span")[0].classList.add("invalid");
        divs[4].getElementsByTagName("span")[0].classList.add("space");
        console.log("boşluk bırakma!");
        document.getElementById("phone").style.boxShadow = "0 0 2px 1px red";
      }
    }
  }
  if (createInputs[4].value === "") {
    divs[4].getElementsByTagName("span")[0].classList.remove("length");
    divs[4].getElementsByTagName("span")[0].classList.remove("invalid");
    divs[4].getElementsByTagName("span")[0].classList.remove("valid");
    divs[4].getElementsByTagName("span")[0].classList.remove("space");
    divs[4].getElementsByTagName("span")[0].classList.remove("zero");
    document.getElementById("phone").style.boxShadow = null;
  }
}

// Jquery
$(document).ready(function () {
  $("#fullname").keyup(checkPasswordMatch);
  $("#pass1").keyup(checkPasswordMatch);
  $("#pass2").keyup(checkPasswordMatch);
  $("#phone").keyup(checkPasswordMatch);
  $("#Code").keyup(checkPasswordMatch);
});

// counter for use to assign each user as object to allUser array
let counter = -1;

// SIGN UP -- Save The Data -- Go Login Box
signUp.addEventListener("click", function (e) {
  e.preventDefault();
  for (let i = 0; i < 3; i++) {
    if (createInputs[i].value === "") {
      divs[i].classList.add("blank");
      divs[i].classList.add("move-up");
      setTimeout(function () {
        divs[i].classList.remove("move-up");
      }, 500); //wait 0.5 seconds
    } else divs[i].classList.remove("blank");
  }
  if (createInputs[1].value != createInputs[2].value) {
    divs[2].classList.add("move-up");
    setTimeout(function () {
      divs[2].classList.remove("move-up");
    }, 500); //wait 0.5 seconds
  }
  if (createInputs[4].value === "") {
    divs[4].classList.add("blank");
    divs[4].classList.add("move-up");
    setTimeout(function () {
      divs[4].classList.remove("move-up");
    }, 500); //wait 0.5 seconds
  } else if (
    createInputs[4].value.length != 10 ||
    divs[4].getElementsByTagName("span")[0].classList.contains("invalid")
  ) {
    divs[4].getElementsByTagName("span")[0].classList.add("length");
    divs[4].classList.remove("blank");
    divs[4].classList.add("move-up");
    setTimeout(function () {
      divs[4].classList.remove("move-up");
    }, 500); //wait 0.5 seconds
  }

  if (
    createInputs[0].value != "" &&
    createInputs[1].value === createInputs[2].value &&
    createInputs[1].value != "" &&
    createInputs[2].value != "" &&
    createInputs[4].value != "" &&
    createInputs[4].value.length === 10 &&
    divs[4].getElementsByTagName("span")[0].classList.contains("valid")
  ) {
    counter++;

    for (let i = 0; i < allUser.length; i++) {
      if (
        createInputs[0].value === allUser[i].fullname &&
        createInputs[1].value === allUser[i].pass
      ) {
        counter--;
        alert(
          `Account already created with user "${allUser[i].fullname}" and password "${allUser[i].pass}"! please login with a different username!`
        );
        clearCreateAccountInput();
        for (let i = 0; i < createInputs.length; i++)
          createInputs[i].value = "";

        return;
      }
    }

    for (let i = 0; i < createInputs.length; i++) {
      Object.values(userSignUp)[i].push(createInputs[i].value);
      createInputs[i].value = "";
      createAccount.classList.add("Create");
      logAccount.classList.toggle("Log");
    }
    console.log(userSignUp);

    // SET A GLOBAL ARRAY WİCH CONTAİNS ALL USERS OWNS DATA İN OBJECT
    const signUpUsers = Object.assign(
      ...Object.entries(userSignUp).map(([key, value]) => ({
        [key]: value[counter],
      }))
    );
    allUser.push(signUpUsers);
    console.log(allUser);

    const signUpUsersAccount = JSON.parse(JSON.stringify(accountİnfo));
    signUpUsers;
    allUsersAccountMov.push(signUpUsersAccount);
    console.log(allUsersAccountMov);
  }

  // clean create account box
  clearCreateAccountInput();
  signUp.classList.add("btnClicks");
  setTimeout(function () {
    signUp.classList.remove("btnClicks");
  }, 500); //wait 2 seconds
  signIn.classList.remove("btnClicks");
});

// Decrypt Password
for (let i = 0; i < eye.length; i++) {
  eye[i].addEventListener("click", function () {
    logInputs[1].type = "text";
    createInputs[1].type = "text";
    createInputs[2].type = "text";
    eye[i].classList.add("hidden");
    eyeClosed[i].classList.remove("hidden");
  });
}
//Encrypt Password
for (let i = 0; i < eyeClosed.length; i++) {
  eyeClosed[i].addEventListener("click", function () {
    logInputs[1].type = "password";
    createInputs[1].type = "password";
    createInputs[2].type = "password";
    eye[i].classList.remove("hidden");
    eyeClosed[i].classList.add("hidden");
  });
}

// Sıgn In With Navbar Log In
navLogBtn.addEventListener("click", function (a) {
  a.preventDefault(); // Blocks Form Submit Refresh

  // Get Users Index Number
  if (userSignUp.fullname.length === 0 && navLogInputs[0].value != "") {
    alert(
      `There is no user "${navLogInputs[0].value}" CLICK "SIGN UP"  to REGISTER! `
    );
    switchSignUp.classList.add("vibration");
    setTimeout(function () {
      switchSignUp.classList.remove("vibration");
    }, 3000);
    return;
  }
  for (let i = 0; i < userSignUp.fullname.length; i++) {
    if (userSignUp.fullname[i] === navLogInputs[0].value) {
      countArr.push(i);
    }
  }
  // GET DATAS and LOG
  valueIndexNumb = countArr.slice(0, countArr.length);
  if (Object.values(userSignUp)[0].includes(`${navLogInputs[0].value}`)) {
    console.log(
      `There is/are "${countArr.length}" Users With "${navLogInputs[0].value}" Fullnamed`
    );
    for (const i of valueIndexNumb) {
      userSignUp.data(
        i,
        userSignUp.fullname[i],
        userSignUp.pass[i],
        userSignUp.email[i],
        userSignUp.gsm[i]
      );
    }
    console.log(
      `Index numbers of user "${navLogInputs[0].value}": [${valueIndexNumb}]`
    );
  }
  countArr = [];

  // Checking users and passwords which in the input value

  if (navLogInputs[0].value === "" || navLogInputs[1].value === "") {
    alert("Please enter Username and Password!");
  }

  // Logged With Correct password and User
  for (let i = 0; i < userSignUp.fullname.length; i++) {
    if (
      navLogInputs[0].value != "" &&
      navLogInputs[1].value != "" &&
      navLogInputs[0].value === userSignUp.fullname[i] &&
      navLogInputs[1].value === userSignUp.pass[i]
    ) {
      selectedCurrency = currency.value;
      currencyNav.value = currency.value;
      selectedInterest = Number(interest.value);
      transferCrypto.textContent = selectedCurrency;
      navLogBtn.style.borderColor = null;
      navLogBtn.style.animation = "navlog-correct 1.25s ease-in";

      // Get Coin Pngs
      for (let i = 0; i < 4; i++) {
        currentCoin[i].src = `img/${selectedCurrency}.png`;
      }

      autoLogoutFunc();
      signIn.classList.add("hidden");
      logMessage.classList.remove("hidden");
      logMessage.innerHTML = "Login Successful!";
      logMessage.style.color = "rgb(66, 248, 10)";
      logMessage.style.animation = "scale 1s ease alternate ";
      section2.style.display = "block";
      section1.style.animation = "opacity 1s ease 0.5s";
      section2.style.animation = "opacity-reverse 2s ease 1s ";
      setTimeout(function () {
        navLog.style.animation = "navlog 0.5s ease";
        section2.classList.add("absolute");
      }, 1000);
      setTimeout(function () {
        currentAccount.innerHTML = `Welcome back, ${currentUser[0].fullname}!`;
        section2.classList.remove("absolute");
        section1.classList.add("hidden");
        logMessage.classList.add("hidden");
        signIn.classList.remove("hidden");
        navLog.classList.add("hidden");
        navCurrency.style.display = "inline-block";
        navLog.style.transform = "translateX(70rem)";
      }, 1100);

      console.log(
        `Logged In: ${i} => Index numbered,  "${userSignUp.fullname[i]}" => Named, "${userSignUp.pass[i]}" => Password, "${userSignUp.email[i]}" => E-mail Adresses, "${userSignUp.gsm[i]}" => GSM Number User Logged In!`
      );

      // transfer the logged  user in to a currentuser array
      currentUser.push(
        Object.assign(
          ...Object.entries(userSignUp).map(([key, value]) => ({
            [key]: value[i],
          }))
        )
      );
      currentUser[0].userID = i;
      console.log("Logged In User=>", currentUser);

      // Push to Currentuser's movements into AllUser object
      allUser[currentUser[0].userID].accountMovements =
        allUsersAccountMov[currentUser[0].userID];

      currentBalanceShowId.innerHTML = `${currentUser[0].userID}`;
      // For Changeble Currency after Log In!
      changeCurrency();

      // when Users Logging Again
      if (
        currentUser[0].fullname === allUser[currentUser[0].userID].fullname &&
        currentUser[0].pass === allUser[currentUser[0].userID].pass
      ) {
        // LOG IN Feedback
        const LogInFunct = function () {
          const dateLogIn = new Date();
          if (
            allUsersAccountMov[currentUser[0].userID]
              .currentUserMovementsFeedback != []
          ) {
            allUsersAccountMov[
              currentUser[0].userID
            ].currentUserMovementsFeedback.forEach(function (ul) {
              transactions.appendChild(ul);
            });
          }
          function createListItem(text) {
            const li = document.createElement("li");
            li.textContent = text;
            return li;
          }
          const newUl = document.createElement("ul");
          const newLi = [
            createListItem(`${currentUser[0].fullname}  LOGIN`),
            createListItem(`${dateLogIn.toDateString()}`),
            createListItem(
              `${String(dateLogIn.getHours()).padStart(2, "0")} : ${String(
                dateLogIn.getMinutes()
              ).padStart(2, "0")} : ${String(dateLogIn.getSeconds()).padStart(
                2,
                "0"
              )} `
            ),
            createListItem(`${selectedCurrency}`),
          ];
          newLi.forEach(function (li) {
            transactions.appendChild(newUl).appendChild(li);
          });
          newUl.style.backgroundColor = "#5AC278";
          newUl.style.height = "3rem";
          newUl.style.borderRadius = "20px 20px";
          newUl.firstChild.style.letterSpacing = "5px";
          console.log(`User ID => ${currentUser[0].userID}`);
          console.log(
            `${selectedCurrency} => ${
              allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`]
            }`
          );
        };
        LogInFunct();
        // Get Movements feedback
        movFeedbackFunc();
        balance =
          allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`];
        totalBalance.textContent = new Intl.NumberFormat(
          navigator.language
        ).format(balance);
        const calculated = calculateInterest(
          allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`],
          1,
          selectedInterest,
          2
        );
        const result =
          calculated -
          allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`];
        moneyInterest.textContent = new Intl.NumberFormat(
          navigator.language
        ).format(result);
      }
      return;
    }
  }
  for (let i = 0; i < userSignUp.fullname.length; i++) {
    if (
      navLogInputs[0].value === userSignUp.fullname[i] &&
      navLogInputs[1].value != userSignUp.pass[i] &&
      navLogInputs[1].value != ""
    ) {
      navLogBtn.style.animation = null;
      navLogBtn.style.borderColor = "rgb(241, 35, 35)";
      navLogBtn.style.animation = "navlog-btn-move 0.1s ease 3";
      setTimeout(() => {
        navLogBtn.style.animation = null;
      }, 1500);
      alert(
        `You entered the wrong password of the user "${navLogInputs[0].value}", please try again!`
      );
      console.log(
        `Wrong password entered for "${userSignUp.fullname[i]}" user. Wrong pasword => ${navLogInputs[1].value}`
      );
      return;
    }
  }
  for (let i = 0; i < userSignUp.fullname.length; i++) {
    if (
      navLogInputs[0].value != userSignUp.fullname[i] &&
      navLogInputs[0].value != "" &&
      navLogInputs[1].value != ""
    ) {
      switchSignUp.classList.add("vibration");
      setTimeout(function () {
        switchSignUp.classList.remove("vibration");
      }, 5000);
      alert(
        `There is no user "${navLogInputs[0].value}" CLICK "SIGN UP"  to REGISTER! `
      );
      console.log(
        `There is no user "${navLogInputs[0].value}" in the system!!`
      );
      return;
    }
  }
});

// Sign In with Form Log IN
let countArr = new Array();
signIn.addEventListener("click", function (e) {
  e.preventDefault(); // Blocks Form Submit Refresh

  // Get Users Index Number
  if (userSignUp.fullname.length === 0 && logInputs[0].value != "") {
    alert(
      `There is no user "${logInputs[0].value}" CLICK "SIGN UP"  to REGISTER!`
    );
    switchSignUp.classList.add("vibration");
    setTimeout(function () {
      switchSignUp.classList.remove("vibration");
    }, 3000);
    return;
  }
  for (let i = 0; i < userSignUp.fullname.length; i++) {
    if (userSignUp.fullname[i] === logInputs[0].value) {
      countArr.push(i);
    }
  }
  // GET DATAS and LOG
  valueIndexNumb = countArr.slice(0, countArr.length);
  if (Object.values(userSignUp)[0].includes(`${logInputs[0].value}`)) {
    console.log(
      `There is/are "${countArr.length}" Users With "${logInputs[0].value}" Fullnamed`
    );
    for (const i of valueIndexNumb) {
      userSignUp.data(
        i,
        userSignUp.fullname[i],
        userSignUp.pass[i],
        userSignUp.email[i],
        userSignUp.gsm[i]
      );
    }
    console.log(
      `Index numbers of user "${logInputs[0].value}": [${valueIndexNumb}]`
    );
  }
  countArr = [];

  // Checking users and passwords which in the input value
  if (logInputs[0].value === "" || logInputs[1].value === "") {
    alert("Please enter Username and Password!");
  }

  // Logged With Correct password and User
  for (let i = 0; i < userSignUp.fullname.length; i++) {
    if (
      logInputs[0].value != "" &&
      logInputs[1].value != "" &&
      logInputs[0].value === userSignUp.fullname[i] &&
      logInputs[1].value === userSignUp.pass[i]
    ) {
      document
        .getElementById("open-padlock")
        .classList.add("open-padlock-scale");
      document.getElementById("open-padlock").classList.remove("hidden");
      document.getElementById("locked-padlock").classList.add("hidden");
      divss[1].classList.add("Correct");

      selectedCurrency = currency.value;
      currencyNav.value = currency.value;
      selectedInterest = Number(interest.value);
      transferCrypto.textContent = selectedCurrency;

      // Get Coin Pngs
      for (let i = 0; i < 4; i++) {
        currentCoin[i].src = `img/${selectedCurrency}.png`;
      }

      if (logInputs[2].checked === false) {
        autoLogoutFunc();
        signIn.classList.add("hidden");
        logMessage.classList.remove("hidden");
        logMessage.innerHTML = "Login Successful!";
        logMessage.style.color = "rgb(66, 248, 10)";
        logMessage.style.animation = "scale 1s ease alternate ";
        section2.style.display = "block";
        switchSignUp.disabled = true;
        section1.style.animation = "opacity 1s ease 0.5s";
        section2.style.animation = "opacity-reverse 2s ease 1s ";
        setTimeout(function () {
          navLog.style.animation = "navlog 0.75s ease";
          section2.classList.add("absolute");
        }, 1000);
        setTimeout(function () {
          currentAccount.innerHTML = `Welcome back, ${currentUser[0].fullname}!`;
          section2.classList.remove("absolute");
          section1.classList.add("hidden");
          logMessage.classList.add("hidden");
          signIn.classList.remove("hidden");
          navLog.classList.add("hidden");
          navCurrency.style.display = "inline-block";
          navLog.style.transform = "translateX(70rem)";
          switchSignUp.disabled = false;
        }, 1100);
      } else {
        divss[0].classList.add("opacity");
        divss[1].classList.add("opacity");
        choose.classList.add("invisible");
        signIn.classList.add("invisible");
        setTimeout(function () {
          divss[0].classList.add("hidden");
          divss[1].classList.add("hidden");
          divss[2].classList.remove("hidden");
        }, 1000);
      }
      console.log(
        `Logged In: ${i} => Index numbered,  "${userSignUp.fullname[i]}" => Named, "${userSignUp.pass[i]}" => Password, "${userSignUp.email[i]}" => E-mail Adresses, "${userSignUp.gsm[i]}" => GSM Number User Logged In!`
      );

      // transfer the logged  user in to a currentuser array
      currentUser.push(
        Object.assign(
          ...Object.entries(userSignUp).map(([key, value]) => ({
            [key]: value[i],
          }))
        )
      );
      currentUser[0].userID = i;
      console.log("Logged In User=>", currentUser);
      // Push to Currentuser's movements into AllUser object
      allUser[currentUser[0].userID].accountMovements =
        allUsersAccountMov[currentUser[0].userID];
      currentBalanceShowId.innerHTML = `${currentUser[0].userID}`;

      // For Changeble Currency affter Log In!
      changeCurrency();

      // when Users Logging Again
      if (
        currentUser[0].fullname === allUser[currentUser[0].userID].fullname &&
        currentUser[0].pass === allUser[currentUser[0].userID].pass
      ) {
        // LOG IN Feedback
        LogInFunct();
        // Get Movements feedback
        movFeedbackFunc();
        balance =
          allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`];
        totalBalance.textContent = new Intl.NumberFormat(
          navigator.language
        ).format(balance);
        const calculated = calculateInterest(
          allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`],
          1,
          selectedInterest,
          2
        );
        const result =
          calculated -
          allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`];
        moneyInterest.textContent = new Intl.NumberFormat(
          navigator.language
        ).format(result);
      }
      return;
    }
  }
  for (let i = 0; i < userSignUp.fullname.length; i++) {
    if (
      logInputs[0].value === userSignUp.fullname[i] &&
      logInputs[1].value != userSignUp.pass[i] &&
      logInputs[1].value != ""
    ) {
      alert(
        `You entered the wrong password of the user "${logInputs[0].value}", please try again!`
      );
      console.log(
        `Wrong password entered for "${userSignUp.fullname[i]}" user. Wrong pasword => ${logInputs[1].value}`
      );
      return;
    }
  }
  for (let i = 0; i < userSignUp.fullname.length; i++) {
    if (
      logInputs[0].value != userSignUp.fullname[i] &&
      logInputs[0].value != "" &&
      logInputs[1].value != ""
    ) {
      switchSignUp.classList.add("vibration");
      setTimeout(function () {
        switchSignUp.classList.remove("vibration");
      }, 5000);
      alert(
        `There is no user "${logInputs[0].value}" CLICK "SING UP"  to REGISTER! `
      );
      console.log(`There is no user "${logInputs[0].value}" in the system!!`);
      return;
    }
  }
});
// Security section => SEND CODE to correct users gsm

let clicker = 0;
sendCodeInput.disabled = true;
logTelInputs[0].value = "";
sendCodeBtn.addEventListener("click", function (e) {
  if (logTelInputs[0].value === currentUser[0].gsm && clicker != 4) {
    logTel.getElementsByTagName("span")[0].classList.add("valid");
    logTel.getElementsByTagName("span")[0].classList.add("Correct");
    logTel.getElementsByTagName("span")[0].classList.remove("invalid");
    logTel.getElementsByTagName("span")[0].classList.remove("length");
    document.getElementById("phone2").style.boxShadow =
      "0 0 2px 1px rgb(66, 248, 10)";
    logTel.querySelector(".tel-number").textContent = hidePhoneNumber(
      logTelInputs[0].value
    );
    sendCodeBtn.disabled = true;
    sendCodeInput.style.boxShadow = null;
    sendCodeInput.value = null;
    sendCodeInput.disabled = false;
    clicker++;
    console.log(`Correct number entered for user "${currentUser[0].fullname}"`);

    console.log(`clicker => ${clicker}`);

    // TİMER

    let time = 10;
    if (clicker < 4) {
      sendCodeBtn.style.pointerEvents = "none";
      let interval = setInterval(updateCountdown, 1000);
      function updateCountdown() {
        let seconds = time;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        sendCodeBtn.innerHTML = seconds + " s";
        time--;
        if (seconds <= 0 && clicker != 4) {
          time = 1;
          sendCodeBtn.innerHTML = "Send Code";
          sendCodeBtn.style.cursor = "pointer";
          sendCodeBtn.style.pointerEvents = null;
          sendCodeInput.disabled = true;
          sendCodeInput.style.boxShadow = null;
          sendCodeInput.value = null;
          clearSendCodeInput();
          clearInterval(interval);
        }
      }
    }
    if (clicker === 4) {
      e.preventDefault();
      logTelInputs[0].disabled = true;
      waitCode.classList.remove("hidden");
      sendCodeBtn.style.pointerEvents = "none";
      sendCodeBtn.style.backgroundColor = "rgba(235,235,228,0.5)";
      sendCodeBtn.style.color = "rgba(218,165,32,0.6)";
      sendCodeBtn.style.boxShadow = "none";
      sendCodeInput.value = null;
      sendCodeInput.disabled = true;
      alert(
        "You could not login after 3 attempts. wait 30 seconds and try again"
      );
      clearSendCodeInput();
      const startingMin = 0.5;
      let time = startingMin * 60;
      let interval1 = setInterval(waitCountdown, 1000);
      function waitCountdown() {
        document.querySelector(".time").style.color = "goldenrod";
        sendCodeInput.disabled = true;
        logTelInputs[0].value = "";
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        console.log(seconds);
        waitCode.innerHTML = `Remains ${
          minutes < 10 ? "0" + minutes : minutes
        }:${seconds < 10 ? "0" + seconds : seconds}`;
        time--;
        if (minutes === 0 && seconds <= 10) {
          waitCode.style.color = "red";
          waitCode.style.animation = "move 0.5s ease alternate infinite";
        }
        clicker = 0;
        if (minutes === 0 && seconds === 0) {
          time = startingMin * 60;
          sendCodeBtn.style.pointerEvents = null;
          sendCodeBtn.style.cursor = "pointer";
          sendCodeBtn.classList.add("styles");
          sendCodeBtn.style.backgroundColor = "rgb(244, 244, 248)";
          sendCodeBtn.style.color = "rgba(218, 165, 32,0.9)";
          sendCodeBtn.style.boxShadow = "0px 0px 1px 2px rgba(65, 64, 64, 0.5)";
          sendCodeInput.style.boxShadow = null;
          sendCodeInput.disabled = true;
          logTelInputs[0].disabled = false;
          logTel.querySelector(".after-wait").style.animation =
            "emoji 0.5s ease";
          waitCode.innerHTML = "";
          waitCode.classList.add("hidden");
          clearInterval(interval1);
        }
      }
    }
    if (clicker < 4) {
      code = String(Math.floor(100000 + Math.random() * 900000));
    }

    if (clicker <= 3) confirm(`Senden code! ${code}`);
    console.log(
      clicker < 4 ? `Sended code => ${code}` : `Last Sended code => ${code}`
    );

    // Check Code Input
    function checkPasswordMatch() {
      if (sendCodeInput.value === code && sendCodeInput.value.length === 6) {
        clicker = 0;
        active = 1;
        sendCodeInput.style.boxShadow = "0 0 2px 1px rgb(66, 248, 10)";
        waitCode.classList.remove("hidden");
        waitCode.style.animation = "scale 0.5s ease alternate";
        waitCode.style.color = "rgb(66, 248, 10)";
        waitCode.innerHTML = "Login Successful!";
        section2.style.display = "block";
        section1.style.animation = "opacity 1s ease 0.5s";
        section2.style.animation = "opacity-reverse 2s ease 1s ";
        setTimeout(function () {
          section2.classList.add("absolute");
          navLog.style.animation = "navlog 0.75s ease";
        }, 1000); //wait 1 seconds

        setTimeout(function () {
          sendCodeInput.value = "";
          currentAccount.innerHTML = `Welcome back, ${currentUser[0].fullname}!`;
          waitCode.classList.add("hidden");
          section2.classList.remove("absolute");
          section1.classList.add("hidden");
          logTel.querySelector(".tel-number").textContent = "";
          navLog.classList.add("hidden");
          navCurrency.style.display = "inline-block";
          navLog.style.transform = "translateX(70rem)";
          waitCode.style.animation = null;
          waitCode.style.color = null;
          waitCode.innerHTML = null;
        }, 1100); //wait 1 seconds
      }

      if (sendCodeInput.value.length != 6) sendCodeInput.style.boxShadow = null;
      if (sendCodeInput.value.length === 6 && sendCodeInput.value != code) {
        sendCodeInput.classList.toggle("move-up");
        sendCodeInput.style.boxShadow = "0 0 2px 1px red";
      }
    }
    $(document).ready(function () {
      $("#Code").keyup(checkPasswordMatch);
    });
  } else {
    logTel.getElementsByTagName("span")[0].classList.add("invalid");
    logTel.getElementsByTagName("span")[0].classList.remove("valid");
    logTel.getElementsByTagName("span")[0].classList.remove("Correct");
    document.getElementById("phone2").style.boxShadow = "0 0 2px 1px red";
    console.log(
      `Entered number not match of user "${currentUser[0].fullname}"`
    );
  }
  if (
    (logTelInputs[0].value.length != 10 && logTelInputs[0].value != "") ||
    logTelInputs[0].value != currentUser[0].gsm
  ) {
    alert(
      `Please enter the correct number belonging to the "${currentUser[0].fullname}" user!`
    );
    logTel.getElementsByTagName("span")[0].classList.add("invalid");
    logTel.getElementsByTagName("span")[0].classList.add("length");
    logTel.getElementsByTagName("span")[0].classList.remove("valid");
    logTel.getElementsByTagName("span")[0].classList.remove("space");
    logTel.getElementsByTagName("span")[0].classList.remove("Correct");
  }
  return;
});

// Button Clicks

signIn.addEventListener("click", function () {
  signIn.classList.add("btnClicks");
  setTimeout(function () {
    signIn.classList.remove("btnClicks");
  }, 500); //wait 0.5 seconds
  signUp.classList.remove("btnClicks");
});

// Switchs
switchSignIn.addEventListener("click", function () {
  logAccount.classList.toggle("Log");
  createAccount.classList.add("Create");
});

switchSignUp.addEventListener("click", function () {
  createAccount.classList.toggle("Create");
  logAccount.classList.toggle("Log");
  // Clearing Log Account
  clearLogAccountInput();
  clicker = 0;
  // Clear currentUser
  currentUser.shift();
});

// <--USER ACCOUNT SECTION -->

// Interest
var calculateInterest = function (total, years, ratePercent, roundToPlaces) {
  var interestRate = ratePercent / 100 + 1;
  return (total * Math.pow(interestRate, years)).toFixed(roundToPlaces);
};
var answer = calculateInterest(
  Number(totalBalance.textContent),
  1,
  selectedInterest,
  2
);
let click = 0;
let balance = 0;
let outBalance = 0;
let inBalance = 0;

// Set Current Date and Time!
const currentTime = document.querySelector(".current-time");
const currenttime = function () {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  currentTime.textContent =
    ("0" + h).substr(-2) +
    ":" +
    ("0" + m).substr(-2) +
    ":" +
    ("0" + s).substr(-2);
};
setInterval(currenttime, 1000);

const currentDate = document.querySelector(".current-date");
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;
currentDate.innerHTML = `${today}`;

// DEPOSİT COİN
depositBtn.addEventListener("click", function () {
  if (depositAmount.value > 0 && depositAmount.value != "") {
    click++;
    if (active === 1) {
      active = 0;
      autoLogoutFunc();
    }
    sortArr = [];
    const dateDeposit = new Date();
    // Create Transictions Feedback
    function createListItem(text) {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    }
    const newUl = document.createElement("ul");
    const newLi = [
      createListItem(`${click}- DEPOSİT`),
      createListItem(`Today`),
      createListItem(
        `${String(dateDeposit.getHours()).padStart(2, "0")} : ${String(
          dateDeposit.getMinutes()
        ).padStart(2, "0")} : ${String(dateDeposit.getSeconds()).padStart(
          2,
          "0"
        )} `
      ),
      createListItem(
        `${new Intl.NumberFormat(navigator.language).format(
          depositAmount.value
        )} ${selectedCurrency}`
      ),
    ];
    newLi.forEach(function (li) {
      transactions.appendChild(newUl).appendChild(li);
    });
    newUl.firstChild.style.backgroundColor = "#5AC278";
    newUl.style.backgroundColor = "rgba(116, 114, 114,0.3)";

    if (click > 1) {
      transactions.children[
        transactions.childElementCount - 2
      ].style.animation = "blanks-transiction 1s ease ";
    }
    // push to deposit values
    allUsersAccountMov[currentUser[0].userID].currencyDeposits.push(
      `Mov ${click}: ${new Intl.NumberFormat(navigator.language).format(
        depositAmount.value
      )} ${selectedCurrency} by currentuser => ${
        currentUser[0].fullname
      }, Date: ${dateDeposit.toLocaleString()}`
    );
    console.log(
      `Own Deposit ${new Intl.NumberFormat(navigator.language).format(
        depositAmount.value
      )} ${selectedCurrency} to => UserID: #${
        currentUser[0].userID
      }, Date: ${dateDeposit.toLocaleString()}`
    );
    // Get Movements feedback
    allUsersAccountMov[currentUser[0].userID].currentUserMovementsFeedback.push(
      transactions.lastElementChild
    );

    if (transactions.childElementCount >= 0 && countSortClick >= 1) {
      allUser[
        currentUser[0].userID
      ].accountMovements.currentUserMovementsFeedback.forEach(function (
        elements
      ) {
        transactions.appendChild(elements);
      });
    }
    countSortClick = 0;
    // Total Balance
    depositBtn.disabled = true;
    transferMoneyBtn.disabled = true;
    totalBalance.classList.remove("total-balance-move2");
    totalBalance.classList.add("total-balance-move1");
    incDecValue.style.color = "#5AC278";
    incDecValue.innerHTML = `${depositAmount.value}`;
    incDecValue.classList.remove("decrease-value");
    incDecValue.classList.add("increase-value");
    setTimeout(function () {
      balance += Number(depositAmount.value);
      totalBalance.textContent = new Intl.NumberFormat(
        navigator.language
      ).format(balance);
      saveBalance(selectedCurrency);
      incDecValue.classList.add("hidden");
      totalBalance.classList.remove("total-balance-move1");
      totalBalance.classList.add("total-balance-move2");
      depositBtn.disabled = false;
      transferMoneyBtn.disabled = false;
      console.log(allUsersAccountMov[currentUser[0].userID]);
      // interest increase balance
      const calculated = calculateInterest(
        allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`],
        1,
        selectedInterest,
        2
      );
      const result =
        calculated -
        allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`];
      moneyInterest.textContent = new Intl.NumberFormat(
        navigator.language
      ).format(result);
      // Money IN
      inBalance += Number(depositAmount.value);
      moneyIn.textContent = new Intl.NumberFormat(navigator.language).format(
        inBalance
      );
      depositAmount.value = 0;
    }, 750); //wait 0.75 seconds
    setTimeout(function () {
      incDecValue.classList.remove("hidden");
    }, 300);
  }
});

// TRANSFER COİN
transferMoneyBtn.addEventListener("click", function () {
  sortArr = [];

  if (transferMoneyAmount.value > 0 && transferMoneyAmount.value !== "") {
    // If transferto input is ""
    if (transferMoneyTo.value === "") {
      alert("Please enter the fullname who you want to transfer");
      return;
    }
    // There Isn't User By This Name
    if (userSignUp.fullname.includes(`${transferMoneyTo.value}`) === false) {
      alert(`"${transferMoneyTo.value}" There Isn't User By This Name!`);
      return;
    }

    // Not Enough Balance
    if (transferMoneyAmount.value > balance) {
      alert("You do not have enough funds to transfer this amount");
      return;
    }
    let uid;
    const dateTransfer = new Date();
    countArr = [];

    // Send Currency Value to Selected User
    // İf Is There Multiple Same Username
    for (let i = 0; i < allUser.length; i++) {
      if (transferMoneyTo.value === allUser[i].fullname) {
        countArr.push(i);
      }
    }
    // If Currentuser Has Unique name and choose send to self
    if (countArr.length === 1 && countArr[0] === currentUser[0].userID) {
      alert(
        `${transferMoneyTo.value} You Can't send to Yourself! Please choose other users fullname`
      );
      return;
    }

    // If Currentuser Has Same UserName - delete from countArr the currentuser uid
    if (countArr.includes(currentUser[0].userID)) {
      const index = countArr.indexOf(currentUser[0].userID);
      countArr.splice(index, 1);
    }
    if (
      countArr.length > 1 &&
      transferMoneyTo.value === allUser[countArr[0]].fullname &&
      transferMoneyAmount.value != 0 &&
      transferMoneyAmount.value != ""
    ) {
      let answer1 = prompt(
        `There are ${countArr.length} users named "${transferMoneyTo.value}"
To send ${
          transferMoneyAmount.value
        } amount "${selectedCurrency}" Select the UserID of the which user you want!
Current IDs => ${[...countArr]}`
      );
      if (answer1 === "" || answer1 === null || answer1 === " ") {
        return;
      }
      answer1 = Number(answer1);

      if (countArr.includes(answer1) === false) {
        alert(
          `There isn't user named "${
            transferMoneyTo.value
          }" with such an ID => #${answer1} Choose one of the "${[
            ...countArr,
          ]}" IDs! to send ${
            transferMoneyAmount.value
          } amount ${selectedCurrency}`
        );
        return;
      } else uid = answer1;

      const resultWithdrawal =
        allUsersAccountMov[answer1][`${selectedCurrency}`] +
        Number(transferMoneyAmount.value);
      allUsersAccountMov[answer1][`${selectedCurrency}`] = resultWithdrawal;
      console.log(
        `Withdrawal ${new Intl.NumberFormat(navigator.language).format(
          transferMoneyAmount.value
        )} ${selectedCurrency} to => UserID: #${answer1}, , Date: ${dateTransfer.toLocaleString()}`
      );

      // Push to deposit information to sended user's currencyDeposit array
      allUsersAccountMov[answer1].currencyDeposits.push(
        `Deposit From '${currentUser[0].fullname}' ID => #${
          currentUser[0].userID
        } ${new Intl.NumberFormat(navigator.language).format(
          transferMoneyAmount.value
        )} ${selectedCurrency}, Date: ${dateTransfer.toLocaleString()}`
      );

      // transfer balance to selected user account. mov.
      allUser[answer1].accountMovements = allUsersAccountMov[answer1];

      function createListItem(text) {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
      }
      const newUl = document.createElement("ul");
      const newLi = [
        createListItem(`DEPOSİT FROM "${currentUser[0].fullname}"`),
        createListItem(`Today`),
        createListItem(`From ID: #${currentUser[0].userID}`),
        createListItem(
          `${String(dateTransfer.getHours()).padStart(2, "0")} : ${String(
            dateTransfer.getMinutes()
          ).padStart(2, "0")} : ${String(dateTransfer.getSeconds()).padStart(
            2,
            "0"
          )} `
        ),
        createListItem(
          `${new Intl.NumberFormat(navigator.language).format(
            transferMoneyAmount.value
          )} ${selectedCurrency}`
        ),
      ];
      newLi.forEach(function (li) {
        transactions.appendChild(newUl).appendChild(li);
      });
      newUl.firstChild.style.backgroundColor = "#5AC278";
      newUl.style.backgroundColor = "rgba(116, 114, 114,0.3)";
      allUsersAccountMov[answer1].currentUserMovementsFeedback.push(
        transactions.children[transactions.childElementCount - 1]
      );
      transactions.children[transactions.childElementCount - 1].remove();
    } else if (
      //If Username Is Unique
      countArr.length === 1 &&
      transferMoneyTo.value === allUser[countArr[0]].fullname &&
      transferMoneyAmount.value > 0
    ) {
      uid = countArr[0];
      allUser[uid].accountMovements = allUsersAccountMov[uid];
      console.log(
        `Withdrawal ${new Intl.NumberFormat(navigator.language).format(
          transferMoneyAmount.value
        )} ${selectedCurrency} to => UserID: #${[...countArr]}`
      );
      const resultWithdrawal =
        allUsersAccountMov[countArr[0]][`${selectedCurrency}`] +
        Number(transferMoneyAmount.value);
      allUsersAccountMov[countArr[0]][`${selectedCurrency}`] = resultWithdrawal;

      // Push to deposit information to sended user's currencyDeposit array
      allUsersAccountMov[uid].currencyDeposits.push(
        `Deposit From '${currentUser[0].fullname}' ID => #${
          currentUser[0].userID
        } ${new Intl.NumberFormat(navigator.language).format(
          transferMoneyAmount.value
        )} ${selectedCurrency}, Date: ${dateTransfer.toLocaleString()}`
      );

      function createListItem(text) {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
      }
      const newUl = document.createElement("ul");
      const newLi = [
        createListItem(`DEPOSİT FROM "${currentUser[0].fullname}"`),
        createListItem(`Today`),
        createListItem(`From ID: #${currentUser[0].userID}`),
        createListItem(
          `${String(dateTransfer.getHours()).padStart(2, "0")} : ${String(
            dateTransfer.getMinutes()
          ).padStart(2, "0")} : ${String(dateTransfer.getSeconds()).padStart(
            2,
            "0"
          )} `
        ),
        createListItem(
          `${new Intl.NumberFormat(navigator.language).format(
            transferMoneyAmount.value
          )} ${selectedCurrency}`
        ),
      ];
      newLi.forEach(function (li) {
        transactions.appendChild(newUl).appendChild(li);
      });
      newUl.firstChild.style.backgroundColor = "#5AC278";
      newUl.style.backgroundColor = "rgba(116, 114, 114,0.3)";
      allUsersAccountMov[countArr[0]].currentUserMovementsFeedback.push(
        transactions.children[transactions.childElementCount - 1]
      );
      transactions.children[transactions.childElementCount - 1].remove();
    }

    if (
      transferMoneyAmount.value > 0 &&
      transferMoneyAmount.value != "" &&
      balance > 0
    ) {
      click++;
      // Create Transictions Feedback
      function createListItem(text) {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
      }
      const newUl = document.createElement("ul");
      const newLi = [
        createListItem(`${click}- WİTHDRAWAL TO "${transferMoneyTo.value}"`),
        createListItem("Today"),
        createListItem(`Target ID: #${uid}`),
        createListItem(
          `${String(dateTransfer.getHours()).padStart(2, "0")} : ${String(
            dateTransfer.getMinutes()
          ).padStart(2, "0")} : ${String(dateTransfer.getSeconds()).padStart(
            2,
            "0"
          )} `
        ),
        createListItem(
          `${new Intl.NumberFormat(navigator.language).format(
            transferMoneyAmount.value
          )} ${selectedCurrency}`
        ),
      ];
      newLi.forEach(function (li) {
        transactions.appendChild(newUl).appendChild(li);
      });
      newUl.firstChild.style.backgroundColor = "#ED385C";
      newUl.style.backgroundColor = "rgba(116, 114, 114,0.3)";

      if (click > 1) {
        transactions.children[
          transactions.childElementCount - 2
        ].style.animation = "blanks-transiction 1s ease ";
      }
      // push to withdrawal values
      allUsersAccountMov[currentUser[0].userID].currencyWithdrawals.push(
        `Mov ${click}: ${new Intl.NumberFormat(navigator.language).format(
          transferMoneyAmount.value
        )} ${selectedCurrency} to ${
          transferMoneyTo.value
        }, Date: ${dateTransfer.toLocaleString()}`
      );
      // Get Movements feedback
      allUsersAccountMov[
        currentUser[0].userID
      ].currentUserMovementsFeedback.push(transactions.lastElementChild);
      if (transactions.childElementCount >= 0 && countSortClick >= 1) {
        allUser[
          currentUser[0].userID
        ].accountMovements.currentUserMovementsFeedback.forEach(function (
          elements
        ) {
          transactions.appendChild(elements);
        });
      }
      countSortClick = 0;

      // Total Balance
      transferMoneyBtn.disabled = true;
      depositBtn.disabled = true;
      totalBalance.classList.remove("total-balance-move2");
      totalBalance.classList.add("total-balance-move1");
      incDecValue.style.color = "#ED385C";
      incDecValue.innerHTML = `${transferMoneyAmount.value}`;
      incDecValue.classList.remove("increase-value");
      incDecValue.classList.add("decrease-value");
      setTimeout(function () {
        balance = balance - Number(transferMoneyAmount.value);
        totalBalance.textContent = new Intl.NumberFormat(
          navigator.language
        ).format(balance);
        saveBalance(selectedCurrency);
        incDecValue.classList.add("hidden");
        totalBalance.classList.remove("total-balance-move1");
        totalBalance.classList.add("total-balance-move2");
        transferMoneyBtn.disabled = false;
        depositBtn.disabled = false;
        console.log(allUsersAccountMov[currentUser[0].userID]);
        transferMoneyAmount.value = 0;
        // interest increase balance
        const calculated = calculateInterest(
          allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`],
          1,
          selectedInterest,
          2
        );
        const result =
          calculated -
          allUsersAccountMov[currentUser[0].userID][`${selectedCurrency}`];
        moneyInterest.textContent = new Intl.NumberFormat(
          navigator.language
        ).format(result);
      }, 750); //wait 0.75 seconds
      setTimeout(function () {
        // Money Out
        outBalance += Number(transferMoneyAmount.value);
        moneyOut.textContent = new Intl.NumberFormat(navigator.language).format(
          outBalance
        );
        incDecValue.classList.remove("hidden");
      }, 300);
    }
  }
});

// LOG OUT Current Account
logOut.addEventListener("click", function () {
  logoutfunc();
});

// Close Account (--DELETE--)
closeAccountBtn.addEventListener("click", function () {
  const deleteUserId = [];
  for (let i = 0; i < userSignUp.fullname.length; i++) {
    if (
      closeAccountInputs[0].value != "" &&
      closeAccountInputs[1].value != "" &&
      closeAccountInputs[0].value === userSignUp.fullname[i] &&
      closeAccountInputs[1].value === userSignUp.pass[i]
    ) {
      deleteUserId.push(i);
    }
  }

  //There aren't any users whit this name
  if (deleteUserId.length === 0) {
    for (let i = 0; i < allUser.length; i++) {
      if (closeAccountUser.value === allUser[i].fullname) {
        deleteUserId.push(i);
      }
    }
    if (deleteUserId.length >= 1) {
      alert(`Password is not match for user "${closeAccountUser.value}" `);
      return;
    }
    alert(
      `There aren't any users with this "${closeAccountInputs[0].value}" name`
    );
    return;
  }

  // Deleting Current Account
  if (deleteUserId[0] === currentUser[0].userID) {
    if (
      confirm(
        `Do you want to delete current account? "${closeAccountInputs[0].value}" `
      ) === true
    ) {
      Object.entries(userSignUp).map(function ([key, value]) {
        userSignUp[key][deleteUserId] = null;
      });
      Object.entries(allUser[deleteUserId]).map(function ([key, value]) {
        const deletedUsersObj = JSON.parse(
          JSON.stringify(allUser[deleteUserId])
        );
        deletedUserInfo.push(deletedUsersObj);
        allUser[deleteUserId][key] = "deleted";
      });
      alert(`"${closeAccountInputs[0].value}" User Account is Deleted!`);
      deletedUserInfo.splice(1);
      allDeletedUsersInfo.push(...deletedUserInfo);
      console.log(
        `User => "${closeAccountInputs[0].value}", UserID: #${deleteUserId} is Deleted!`
      );
      console.log(allDeletedUsersInfo);
      deletedUserInfo = [];
      logoutfunc();
    } else {
      console.log("delete is cancalled");
    }
  } else if (
    confirm(
      `Do you want to delete "${closeAccountInputs[0].value}" this account?`
    ) === true
  ) {
    Object.entries(userSignUp).map(function ([key, value]) {
      userSignUp[key][deleteUserId] = null;
    });
    Object.entries(allUser[deleteUserId]).map(function ([key, value]) {
      const deletedUsersObj = JSON.parse(JSON.stringify(allUser[deleteUserId]));
      deletedUserInfo.push(deletedUsersObj);
      allUser[deleteUserId][key] = "deleted";
    });
    alert(`"${closeAccountInputs[0].value}" User Account is Deleted!`);
    deletedUserInfo.splice(1);
    allDeletedUsersInfo.push(...deletedUserInfo);
    console.log(
      `User => "${closeAccountInputs[0].value}", UserID: #${deleteUserId} is Deleted!`
    );
    console.log(allDeletedUsersInfo);
    deletedUserInfo = [];
  } else {
    console.log("delete is cancalled");
  }
});

// Sort Transictions Feedbacks
sort.addEventListener("click", function () {
  sort.style.animation = "navlog-btn-move 0.1s ease 1";
  setTimeout(() => {
    sort.style.animation = null;
  }, 100);
  if (countSortClick === 0) {
    allUser[
      currentUser[0].userID
    ].accountMovements.currentUserMovementsFeedback.forEach(function (mov) {
      if (mov.firstElementChild.innerText.includes("DEPOSİT")) {
        sortArr.push(mov);
      }
    });
    allUser[
      currentUser[0].userID
    ].accountMovements.currentUserMovementsFeedback.forEach(function (mov) {
      if (mov.firstElementChild.innerText.includes("WİTHDRAWAL")) {
        sortArr.push(mov);
      }
    });
    countSortClick++;
  }
  if (countSortClick === 1) {
    sortArr.reverse().forEach(function (elements) {
      transactions.appendChild(elements);
    });
    countSortClick++;
  } else if (countSortClick === 2) {
    sortArr.reverse().forEach(function (elements) {
      transactions.appendChild(elements);
    });
    countSortClick++;
  } else if (countSortClick === 3) {
    allUser[
      currentUser[0].userID
    ].accountMovements.currentUserMovementsFeedback.forEach(function (
      elements
    ) {
      transactions.appendChild(elements);
    });
    countSortClick = 1;
  }
});

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = "";
});
/* <-- THE END --> */
/* <-- DESİGNED BY YUSUF ÇOBAN -->*/
