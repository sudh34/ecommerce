const LoginPage = {
    init: function() {
        this.loginForm = document.getElementById('loginForm');
        this.bindEvents();
    },

    bindEvents: function() {
        this.loginForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    },          
    handleFormSubmit: function(event) {
        event.preventDefault(); // Prevent the default form submission
        const formData = new FormData(this.loginForm);
        const data = {};    
        formData.forEach((value, key) => {
            data[key] = value;
        }
        );  
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'      
            },
            body: JSON.stringify(data)          
        }).then(response => response.json())    
            .then(result => {   
                if (result.code === 9999) {       
                    alert(result.message);
                    window.location.href = '/'; // Redirect to home page on successful login
                } else {
                    alert(result.message);
                }       
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    }      
};
