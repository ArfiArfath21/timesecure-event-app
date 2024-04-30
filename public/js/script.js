document.getElementById('generateQR').addEventListener('click', function() {
    fetch('/generate-qr')
        .then(response => response.json())
        .then(data => {
            if (data.qrCodeImage) {
                document.getElementById('qrCodeContainer').innerHTML = `<img src="${data.qrCodeImage}" alt="QR Code">`;
                document.getElementById('redirectButton').innerHTML = `<button><a href="${data.url}">LINK</a></button>`;
            } else {
                document.getElementById('qrCodeContainer').textContent = 'Failed to load QR code.';
            }
        })
        .catch(error => console.error('Error fetching QR code:', error));
});
