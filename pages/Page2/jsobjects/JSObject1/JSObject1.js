export default {
    async decodeQRCode() {
        const fileInput = FilePicker1.files[0]; // Obtém o arquivo selecionado no FilePicker1

        // Verifica se um arquivo foi selecionado
        if (!fileInput) {
            console.error("Nenhum arquivo selecionado.");
            return;
        }

        try {
            // Carrega o arquivo como um Blob usando fetch
            const response = await fetch(fileInput.url);
            const blob = await response.blob();

            // Cria um objeto FileReader para ler o Blob
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
                        textBox.setText(resultText); // Substitua 'textBox' pelo nome do widget de caixa de texto
                    } else {
                        textBox.setText("Não foi possível decodificar o QR Code."); // Substitua 'textBox' pelo nome do widget de caixa de texto
                    }
                }
            };

            reader.readAsDataURL(blob); // Lê o Blob como Data URL
        } catch (error) {
            console.error("Erro ao carregar e decodificar o arquivo:", error);
        }
    }
}
