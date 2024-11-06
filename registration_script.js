function generateRegistrationNumber() {
    return 'REG' + Math.floor(100000 + Math.random() * 900000); 
}

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const registrationNumber = generateRegistrationNumber();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;

    const emailParams = {
        name: name,
        email: email,
        mobile: mobile,
        registration_number: registrationNumber
    };
    
    emailjs.send("service_nyn0c62", "template_ofh0smq", emailParams)
        .then((response) => {
            document.getElementById("successMessage").textContent = `Registration successful! Your registration number is ${registrationNumber}. Please save your registration number for the test.`;
            document.getElementById("successMessage").classList.remove("hidden");

 
            document.getElementById("registrationForm").reset();
            localStorage.setItem("userName", name);
            localStorage.setItem("registrationNumber", registrationNumber);
        }, (error) => {
            document.getElementById("successMessage").textContent = `Registration failed. Please try again later.`;
            document.getElementById("successMessage").classList.remove("hidden");
            console.error("Failed to send email:", error);
        });
});
