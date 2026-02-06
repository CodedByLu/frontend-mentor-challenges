const form = document.querySelector(".form");

const firstName = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameError");

const lastName = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameError");

const emailAddress = document.getElementById("emailAddress");
const emailAddressError = document.getElementById("emailAddressError");

const queryTypeEnquiry = document.querySelector(
  ".form-fieldset-option-enquiry",
);
const queryTypeSupport = document.querySelector(
  ".form-fieldset-option-support",
);
const generalEnquiry = document.getElementById("generalEnquiry");
const supportRequest = document.getElementById("supportRequest");
const queryTypeError = document.getElementById("queryTypeError");

const message = document.getElementById("message");
const messageError = document.getElementById("messageError");

const consent = document.getElementById("consent");
const consentError = document.getElementById("consentError");

const submitButton = document.getElementById("submitButton");

const toastMessage = document.querySelector(".form-toast-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = emailAddress.value.trim();
  const messageValue = message.value.trim();

  //---------- validtion ----------
  const firstNameResult = isEmpty(firstNameValue);
  updateField(firstName, firstNameError, firstNameResult);

  const lastNameResult = isEmpty(lastNameValue);
  updateField(lastName, lastNameError, lastNameResult);

  let emailResult = isEmpty(emailValue);
  if (emailResult.valid) {
    emailResult = testEmailValidity(emailValue);
  }
  updateField(emailAddress, emailAddressError, emailResult);

  const queryTypeResult = generalEnquiry.checked || supportRequest.checked;
  updateQueryType(queryTypeResult);

  const messageResult = isEmpty(messageValue);
  updateField(message, messageError, messageResult);

  const consentResult = consent.checked;
  updateField(
    consent,
    consentError,
    consentResult
      ? { valid: true }
      : {
          valid: false,
          error: "To submit this form, please consent to being contacted",
        },
  );

  //---------- final check ----------
  const isFormValid =
    firstNameResult.valid &&
    lastNameResult.valid &&
    emailResult.valid &&
    queryTypeResult &&
    messageResult.valid &&
    consentResult;

  if (!isFormValid) return;

  //---------- success state----------
  submitButton.textContent = "Disabled";
  submitButton.disabled = true;
  toastMessage.classList.add("active");

  setTimeout(() => {
    submitButton.textContent = "Submit";
    submitButton.disabled = false;
    toastMessage.classList.remove("active");
    form.reset();
  }, 3500);
});

function isEmpty(inputValue) {
  if (!inputValue) {
    return {
      valid: false,
      error: "This field is required",
    };
  }

  return { valid: true };
}

function testEmailValidity(email) {
  const basicEmailRegex = /^[^\s@]+@[^\s@]+$/;
  const [local, domain] = email.split("@");

  if (
    !basicEmailRegex.test(email) ||
    !domain.includes(".") ||
    domain.startsWith(".") ||
    domain.endsWith(".") ||
    domain.split(".").some((part) => part.length === 0)
  ) {
    return {
      valid: false,
      error: "Please enter a valid email address",
    };
  }

  if (email.length > 254 || local.length > 64 || domain.length > 255) {
    return {
      valid: false,
      error: "Email address is too long",
    };
  }

  return { valid: true };
}

function updateField(field, errorMessage, result) {
  if (!result.valid) {
    errorMessage.textContent = result.error;
    field.classList.add("invalidInput");
  } else {
    errorMessage.textContent = "";
    field.classList.remove("invalidInput");
  }
}

function updateQueryType(isValid) {
  if (!isValid) {
    queryTypeError.textContent = "Please select a query type";
    queryTypeEnquiry.classList.add("invalidInput");
    queryTypeSupport.classList.add("invalidInput");
    generalEnquiry.classList.add("invalidInput");
    supportRequest.classList.add("invalidInput");
  } else {
    queryTypeError.textContent = "";
    queryTypeEnquiry.classList.remove("invalidInput");
    queryTypeSupport.classList.remove("invalidInput");
    generalEnquiry.classList.remove("invalidInput");
    supportRequest.classList.remove("invalidInput");
  }
}
