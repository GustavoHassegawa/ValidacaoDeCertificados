let generated_qr_code;
async function uploadCertificateInfo() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const ra = document.getElementById("ra").value;
    const coursename = document.getElementById("coursename").value;
    const horas = document.getElementById("horas").value;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("ra", ra);
    formData.append("coursename", coursename);
    formData.append("horas",horas);

    console.log("uploading certificate data: ", {
        name, email, ra, coursename, horas 
    });
    const res = await fetch('http://127.0.0.1:5000/add_block', {
        method: "POST",
        body: formData
    })
    const { qr_code } = await res.json();
    generated_qr_code = `/static/${qr_code}`
    console.log(generated_qr_code);
}

async function generateCertificate() {
    const name = document.getElementById("name").value;
    const horas = document.getElementById("horas").value;

    if (!name) {
        alert("Please enter a name.");
        return;
    }

    await uploadCertificateInfo();

    const certificateCanvas = document.getElementById("certificateCanvas");
    const certificateContext = certificateCanvas.getContext("2d");

    // Here we load the certificate template as an image
    const templateImage = new Image();
    templateImage.src = "/static/certificadotemplate.png"; // Use certificate template image here

    console.log("downloading certificate: ", generated_qr_code);
    const generated_qr_code_img = new Image()
    generated_qr_code_img.crossOrigin = "anonymous"
    generated_qr_code_img.src = generated_qr_code;

    templateImage.onload = function () {
        // Here we set canvas dimensions to match the template image
        certificateCanvas.width = templateImage.width;
        certificateCanvas.height = templateImage.height;

        // Here we draw the template image on the canvas
        certificateContext.drawImage(templateImage, 0, 0);

        // Here we customize the certificate by adding the user's name
        // Centraliza o nome
        certificateContext.font = "bold 80px Arial";
        certificateContext.fillStyle = "black";
        const textWidth = certificateContext.measureText(name).width;
        const x = (certificateCanvas.width - textWidth) / 2; // Centraliza o texto
        const y = 1238; // Posição Y onde o nome será desenhado

        certificateContext.fillText(name,x ,y); // Adjust position here

        //Adicionar as horas ao certificado
        certificateContext.font = "bold 70px Arial";
        certificateContext.fillStyle = "black";

        certificateContext.fillText(horas, 2720, 1430);

        const additionalText = " horas"; // O texto que você quer adicionar
        const additionalTextWidth = certificateContext.measureText(horas).width; // Largura do texto de horas
        const textX = 2720 + additionalTextWidth; // Posição X para o texto adicional

        certificateContext.fillText(additionalText, textX, 1430); // Desenha o texto adicional
        
        certificateContext.drawImage(generated_qr_code_img, 1445, 1434, 600, 600);

        // Here we convert canvas to data URL (PNG)
        const certificateDataURL = certificateCanvas.toDataURL("image/png");

        // Here we set the download link href
        const certificateLink = document.getElementById("downloadLink");
        certificateLink.href = certificateDataURL;
        certificateLink.style.display = "block";
    };
}
