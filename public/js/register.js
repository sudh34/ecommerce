const registerpage = {
    init: function() {
        this.registerForm = document.getElementById('registerForm');
        this.bindEvents();
    },

    bindEvents: function() {
        this.registerForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    },

    handleFormSubmit: function(event) {
        event.preventDefault(); // Prevent the default form submission 
        const formData = new FormData(this.registerForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });                         
        fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)          
        }).then(response => response.json())
          .then(result => {
              if (result.code === 9999) {       
                    alert(result.message);
                    window.location.href = '/auth/login';
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
 