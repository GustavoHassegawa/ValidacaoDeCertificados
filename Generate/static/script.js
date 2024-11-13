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
    const coursename = document.getElementById("coursename").value;
    const template = document.getElementById("template").value;

    if (!name) {
        alert("Please enter a name.");
        return;
    }

    if(template == "voluntario") {
        await uploadCertificateInfo();

        const certificateCanvas = document.getElementById("certificateCanvas");
        const certificateContext = certificateCanvas.getContext("2d");

        // Here we load the certificate template as an image
        const templateImage = new Image();
        templateImage.src = "/static/CertificadoVersao2.png"; // Use certificate template image here

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
            const y = 1198; // Posição Y onde o nome será desenhado

            certificateContext.fillText(name,x ,y); // Adjust position here

            //Adicionar as horas ao certificado
            certificateContext.font = " 80px Arial";
            certificateContext.fillStyle = "black";

            const textoTemplate = 'participou do IV WORKSHOP DAS ENGENHARIAS em São Bernardo do Campo/SP,';
            const textWidthTemplate = certificateContext.measureText(textoTemplate).width;
            const xTemplate = (certificateCanvas.width - textWidthTemplate) / 2;

            const texto2 = `durante o período de 05 a 06 de Novembro de 2024, com carga horária de ${horas} horas.`;
            const textWidth2 = certificateContext.measureText(texto2).width;
            const x2 = (certificateCanvas.width - textWidth2) / 2;

            certificateContext.fillText(textoTemplate, xTemplate, 1350)
            certificateContext.fillText(texto2, x2, 1430);

            certificateContext.drawImage(generated_qr_code_img, 2045, 1434, 600, 600);

            // Here we convert canvas to data URL (PNG)
            const certificateDataURL = certificateCanvas.toDataURL("image/png");

            // Here we set the download link href
            const certificateLink = document.getElementById("downloadLink");
            certificateLink.href = certificateDataURL;
            certificateLink.style.display = "block";
        };
    } else if (template == 'entidade') {
        await uploadCertificateInfo();

        const certificateCanvas = document.getElementById("certificateCanvas");
        const certificateContext = certificateCanvas.getContext("2d");

        // Here we load the certificate template as an image
        const templateImage = new Image();
        templateImage.src = "/static/CertificadoVersao2.png"; // Use certificate template image here

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
            const y = 1158; // Posição Y onde o nome será desenhado

            certificateContext.fillText(name,x ,y); // Adjust position here

            //Adicionar as horas ao certificado
            certificateContext.font = " 80px Arial";
            certificateContext.fillStyle = "black";

            const textoTemplate = `participou como representante da ${coursename} como parte do`;
            const textWidthTemplate = certificateContext.measureText(textoTemplate).width;
            const xTemplate = (certificateCanvas.width - textWidthTemplate) / 2;

            const texto1 = "IV WORKSHOP DAS ENGENHARIAS em São Bernardo do Campo/SP, durante";
            const textWidth1 = certificateContext.measureText(texto1).width;
            const x1 = (certificateCanvas.width - textWidth1) / 2;

            const texto2 = `o período de 05 a 06 de Novembro de 2024, com carga horária de ${horas} horas.`;
            const textWidth2 = certificateContext.measureText(texto2).width;
            const x2 = (certificateCanvas.width - textWidth2) / 2;


            certificateContext.fillText(textoTemplate, xTemplate, 1270);
            certificateContext.fillText(texto1, x1, 1350);
            certificateContext.fillText(texto2, x2, 1430);

            certificateContext.drawImage(generated_qr_code_img, 2645, 1434, 600, 600);

            // Here we convert canvas to data URL (PNG)
            const certificateDataURL = certificateCanvas.toDataURL("image/png");

            // Here we set the download link href
            const certificateLink = document.getElementById("downloadLink");
            certificateLink.href = certificateDataURL;
            certificateLink.style.display = "block";
        };
    } else {

        await uploadCertificateInfo();

        const certificateCanvas = document.getElementById("certificateCanvas");
        const certificateContext = certificateCanvas.getContext("2d");

        // Here we load the certificate template as an image
        const templateImage = new Image();
        templateImage.src = "/static/CertificadoVersao2.png"; // Use certificate template image here

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
            const y = 1158; // Posição Y onde o nome será desenhado

            certificateContext.fillText(name,x ,y); // Adjust position here

            //Adicionar as horas ao certificado
            certificateContext.font = " 80px Arial";
            certificateContext.fillStyle = "black";

            const textoTemplate = `participou da ${coursename} como parte do IV WORKSHOP DAS ENGENHARIAS`;
            const textWidthTemplate = certificateContext.measureText(textoTemplate).width;
            const xTemplate = (certificateCanvas.width - textWidthTemplate) / 2;

            const texto1 = "em São Bernardo do Campo/SP, durante o período de 05 a 06 de Novembro de 2024,";
            const textWidth1 = certificateContext.measureText(texto1).width;
            const x1 = (certificateCanvas.width - textWidth1) / 2;

            const texto2 = `com carga horária de ${horas} horas.`;
            const textWidth2 = certificateContext.measureText(texto2).width;
            const x2 = (certificateCanvas.width - textWidth2) / 2;


            certificateContext.fillText(textoTemplate, xTemplate, 1270);
            certificateContext.fillText(texto1, x1, 1350);
            certificateContext.fillText(texto2, x2, 1430);

            certificateContext.drawImage(generated_qr_code_img, 2645, 1434, 600, 600);

            // Here we convert canvas to data URL (PNG)
            const certificateDataURL = certificateCanvas.toDataURL("image/png");

            // Here we set the download link href
            const certificateLink = document.getElementById("downloadLink");
            certificateLink.href = certificateDataURL;
            certificateLink.style.display = "block";
        };
    } 
}
