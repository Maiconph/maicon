export default {
    decodeQRCode() {
        const file = FilePicker1.files[0]; // Obtém o arquivo selecionado no FilePicker1
        const reader = new FileReader();

        reader.onload = function(event) {
            const image = new Image();
            image.src = event.target.result;

            image.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0, image.width, image.height);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);

                if (code) {
                    const resultText = code.data;
                    // Atualize a caixa de texto com o conteúdo do QR Code
                    $setText('TEXT_BOX_WIDGET_ID', resultText);
                } else {
                    $setText('TEXT_BOX_WIDGET_ID', "Não foi possível decodificar o QR Code.");
                }
            }
        };

        reader.readAsDataURL(file);
    }
}
