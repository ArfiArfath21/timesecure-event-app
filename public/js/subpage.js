document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.getElementById('timer');
    const expirationTime = parseInt(countdownElement.getAttribute('data-expires'), 10) * 1000; // Convert to milliseconds

    function updateCountdown() {
        const currentTime = Date.now();
        const timeLeft = expirationTime - currentTime;
        if (timeLeft >= 0) {
            const minutes = Math.floor(timeLeft / 60000);
            const seconds = Math.floor((timeLeft % 60000) / 1000);
            countdownElement.textContent = `${minutes} minute(s) and ${seconds} second(s)`;
        } else {
            countdownElement.textContent = 'Token has expired.';
            clearInterval(interval);
        }
    }

    updateCountdown(); // Run immediately on load
    const interval = setInterval(updateCountdown, 1000); // Update every second
});


document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const newsletter = document.querySelector('input[name="newsletter"]:checked').value;  // Get checked value
    const phone = document.getElementById('phone').value;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Newsletter:', newsletter);
    console.log('Phone:', phone);
});
