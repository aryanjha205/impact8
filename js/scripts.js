// Get elements
const departmentContainer = document.getElementById('department-container');
const loginContainer = document.getElementById('login-container');
const departmentForm = document.getElementById('department-form');
const departmentSelect = document.getElementById('department');
const loginTitle = document.querySelector('.login-title');
const backToDeptBtn = document.getElementById('back-to-dept');

// Handle department form submission
departmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const selectedDept = departmentSelect.value;
    
    if (selectedDept) {
        // Show selected department in login title
        const deptText = departmentSelect.options[departmentSelect.selectedIndex].text;
        loginTitle.textContent = `Login to your account - ${deptText}`;
        
        // Hide department container and show login container
        departmentContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    }
});

// Handle back button
backToDeptBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginContainer.style.display = 'none';
    departmentContainer.style.display = 'block';
});

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

// Handle form submissions
const loginForms = document.querySelectorAll('form');
loginForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.id === 'department-form') return; // Skip for department form
        alert('Login functionality would connect to the university database in a real implementation.');
    });
});