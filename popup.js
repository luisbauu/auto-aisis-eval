document.addEventListener("DOMContentLoaded", function () {
  // Get the stored values from chrome.storage.local
  chrome.storage.local.get(
    ["rating", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"],
    function (result) {
      // Check if a radio button is selected
      var selectedRadioButton = document.querySelector(
        'input[name="rating"][value="' + result.rating + '"]'
      );
      if (selectedRadioButton) {
        selectedRadioButton.checked = true;
      }

      // Set the textarea values
      document.querySelector('textarea[name="q1"]').value = result.q1 || "";
      document.querySelector('textarea[name="q2"]').value = result.q2 || "";
      document.querySelector('textarea[name="q3"]').value = result.q3 || "";
      document.querySelector('textarea[name="q4"]').value = result.q4 || "";
      document.querySelector('textarea[name="q5"]').value = result.q5 || "";
      document.querySelector('textarea[name="q6"]').value = result.q6 || "";
      document.querySelector('textarea[name="q7"]').value = result.q7 || "";
      document.querySelector('textarea[name="q8"]').value = result.q8 || "";
      document.querySelector('textarea[name="q9"]').value = result.q9 || "";
    }
  );

  var autoClickButton = document.getElementById("autoClickButton");
  autoClickButton.addEventListener("click", function () {
    // Check if a radio button is selected
    var selectedRadioButton = document.querySelector(
      'input[name="rating"]:checked'
    );
    var rating = selectedRadioButton ? selectedRadioButton.value : null;

    // Get the input values
    var q1 = document.querySelector('textarea[name="q1"]').value;
    var q2 = document.querySelector('textarea[name="q2"]').value;
    var q3 = document.querySelector('textarea[name="q3"]').value;
    var q4 = document.querySelector('textarea[name="q4"]').value;
    var q5 = document.querySelector('textarea[name="q5"]').value;
    var q6 = document.querySelector('textarea[name="q6"]').value;
    var q7 = document.querySelector('textarea[name="q7"]').value;
    var q8 = document.querySelector('textarea[name="q8"]').value;
    var q9 = document.querySelector('textarea[name="q9"]').value;

    // Store the values in chrome.storage.local
    chrome.storage.local.set(
      {
        rating: rating,
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5,
        q6: q6,
        q7: q7,
        q8: q8,
        q9: q9,
      },
      function () {
        console.log("Values stored in chrome.storage.local");

        // Send a message to content.js with the stored values
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "autoFillValues",
              values: {
                rating: rating,
                q1: q1,
                q2: q2,
                q3: q3,
                q4: q4,
                q5: q5,
                q6: q6,
                q7: q7,
                q8: q8,
                q9: q9,
              },
            });
          }
        );
      }
    );
  });
});
