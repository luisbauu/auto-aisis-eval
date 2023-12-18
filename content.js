chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "autoFillValues") {
    let evaluationForm = document.forms["myForm"];

    let rating = request.values.rating;

    if (evaluationForm) {
      let radioButtons = evaluationForm.querySelectorAll('input[type="radio"]');
      let textareas = evaluationForm.querySelectorAll("textarea");

      let radioButtonsArray = Array.from(radioButtons);
      let textareasArray = Array.from(textareas);

      radioButtonsArray.forEach(function (radioButton) {
        switch (radioButton.value) {
          case rating:
            radioButton.checked = true;
            break;
          default:
            radioButton.checked = false;
        }
      });

      textareasArray.forEach(function (textarea, index) {
        textarea.value = request.values[`q${index + 1}`];
      });

      //make page scroll to bottom
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      console.log("Form not found");
    }
  }
});
