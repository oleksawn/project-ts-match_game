export const form = {
  getDataFromForm() {
    console.log("form.getDataFromForm()");
    const inputsArr = document.querySelectorAll('.logForm input');
    const data = {};
    console.log(inputsArr);
    inputsArr.forEach((el) => {
      data[el.id] = el.value;
    });
    return data;
  },
  validError(field, errorMsg) {
    // hide ok sign  
    const clOk = `.ok_${field}`;
    const okEl = document.querySelector(clOk);
    okEl.style.display = 'none';
    // show err field
    const clErr = `.err_${field}`;
    const errEl = document.querySelector(clErr);
    errEl.style.display = 'block';
    // show error message
    const clErrMsg = `${clErr} .err_message`;
    const errElMsg = document.querySelector(clErrMsg);
    errElMsg.innerHTML = errorMsg;
    // Log in button unactive
    const addBtn = document.getElementById('addButton');
    addBtn.classList.remove('addButton_active');
  },
  validSuccess(field) {
    console.log("success input");
    // show ok sign
    const clOk = `.ok_${field}`;
    const okEl = document.querySelector(clOk);
    okEl.style.display = 'block';
    // hide error
    const clErr = `.err_${field}`;
    const errEl = document.querySelector(clErr);
    errEl.style.display = 'none';
    // check if all inputs vadid
    if (form.validateForm()) {
      const addBtn = document.getElementById('addButton');
      addBtn.classList.add('addButton_active');
    }
  },
  validateInput(e) {
    console.log("generated by addEventListener in controller.js formRoute()");
    const type = e.target.getAttribute('type');
    const val = e.target.value;
    let isError = false;
    if (val === '') {
      console.log("val", val);
      isError = true;
      form.validError(e.target.id, 'Error: at least one simbol required!');
    }
    else if (/^([a-zA-Z0-9]+)$/.test(val) === false && type === 'text') {
      isError = true;
      form.validError(e.target.id, 'Error: just letters and numbers allowed!');
    }
    else if (/[a-zA-Z]+/.test(val) === false && type === 'text') {
      isError = true;
      form.validError(e.target.id, 'Error: field can\'t consist of numbers only!');
    }
    else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val) === false && type === 'email') {
      isError = true;
      form.validError(e.target.id, 'Error: mail should be correct!');
    }

    console.log("isError ", isError);
    if (isError === false) {
      form.validSuccess(e.target.id);
    }
  },
  validateForm() {
    console.log("generated by addEventListener in controller.js formRoute()");
    const okArr = document.querySelectorAll('.ok');
    let isAllInputsValid = true;
    okArr.forEach((el) => {
      if (el.style.display === 'none' || el.style.display === '') {
        console.log("into false", el);
        isAllInputsValid = false;
      }
    });
    if (isAllInputsValid === false) {
      return false;
    }
    return true;
  },
  cleanForm() {
    console.log("generated by addEventListener in controller.js formRoute()");
    const inputsArr = document.querySelectorAll('.logForm .wrapper input');
    inputsArr.forEach((el) => {
      el.value = '';
      // hide ok buttons
      const clOk = `.ok_${el.id}`;
      const okEl = document.querySelector(clOk);
      okEl.style.display = 'none';
      // hide err messages
      const clErr = `.err_${el.id}`;
      const errEl = document.querySelector(clErr);
      errEl.style.display = 'none';
    });
    const addBtn = document.getElementById('addButton');
    addBtn.classList.remove('addButton_active');
  }
}