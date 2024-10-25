const uploadButton = document.querySelector(".btn-submit");
const uploadFeedback = document.querySelector("#upload-feedback");

uploadButton.addEventListener("click", function () {
  uploadFeedback.textContent = "Uploading..."; // Display uploading message
  setTimeout(function () {
    uploadFeedback.textContent = "File Uploaded!"; // Display upload success message (you can customize this)
  }, 2000); // Simulate a 2-second upload process (you can adjust this time)
});

document.getElementById("registration-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  // Retrieve and display form values (excluding the file input)
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const ra = document.getElementById("ra").value;
  const courseName = document.getElementById("courseName").value;
  const horas = document.getElementById("horas").value;
  const fileInput = document.getElementById("file");

  // Check if a file is selected
  if (fileInput.files.length === 0) {
    alert("Please select a PDF file for upload.");
    return;
  }

  console.log("certificate uploaded: ", fileInput.files[0]);

  const formData = new FormData();

  formData.append("name", name);
  formData.append("email", email);
  formData.append("ra", ra);
  formData.append("coursename", courseName);
  formData.append("horas", horas);
  formData.append("certificate", fileInput.files[0]);

  const res = await fetch("http://127.0.0.1:5050", {
    method: "POST",
    body: formData,
  });

  if (res.status === 200) {
    const { signature } = await res.json();
    console.log(signature);

    const certificateCanvas = document.getElementById("certificateCanvas");
    const certificateContext = certificateCanvas.getContext("2d");

    const templateImage = new Image();
    templateImage.src = URL.createObjectURL(fileInput.files[0]);
    templateImage.onload = function () {
      certificateCanvas.width = templateImage.width;
      certificateCanvas.height = templateImage.height;

      certificateContext.drawImage(templateImage, 0, 0);
      certificateContext.font = "bold 50px Arial";
      certificateContext.fillStyle = "black";
      const textWidth = certificateContext.measureText(signature).width;
      const x = (certificateCanvas.width - textWidth) / 2; 
      const y = 2300;

      certificateContext.fillText(signature, x, y);

      // Here we convert canvas to data URL (PNG)
      const certificateDataURL = certificateCanvas.toDataURL("image/png");

      // Here we set the download link href
      const certificateLink = document.getElementById("downloadLink");
      certificateLink.href = certificateDataURL;
      certificateLink.style.display = "block";
      certificateLink.click();
    };
  } else if (res.status === 400) {
    // Handle the "not valid" response here
    uploadFeedback.textContent = "Validation failed. Certificate is not valid.";
  } else {
    // Handle other response statuses if needed
    uploadFeedback.textContent = "An error occurred during validation.";
  }
});
