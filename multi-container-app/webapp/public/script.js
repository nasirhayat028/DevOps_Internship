document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    // Load existing users when page loads
    loadUsers();

    // Handle form submission
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(userForm);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            gender: formData.get('gender'),
            phone: formData.get('phone')
        };

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            if (result.success) {
                displayUsers(result.users);
                userForm.reset();
                showNotification('User added successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error adding user!', true);
        }
    });

    // Function to load existing users
    async function loadUsers() {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    // Function to display users
    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Gender:</strong> ${user.gender}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
            `;
            userList.appendChild(userCard);
        });
    }

    // Function to show notification
    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : 'success'}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${isError ? '#ff4444' : '#00C851'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
            z-index: 1000;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}); 