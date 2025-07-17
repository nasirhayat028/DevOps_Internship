// Todo App JavaScript
class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.editingId = null;
        
        this.initializeElements();
        this.bindEvents();
        this.loadTodos();
    }

    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.addTodoForm = document.getElementById('addTodoForm');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        
        // Stats elements
        this.totalTodosEl = document.getElementById('totalTodos');
        this.completedTodosEl = document.getElementById('completedTodos');
        this.pendingTodosEl = document.getElementById('pendingTodos');
        
        // Filter buttons
        this.filterButtons = document.querySelectorAll('.filter-btn');
    }

    bindEvents() {
        this.addTodoForm.addEventListener('submit', (e) => this.handleAddTodo(e));
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        
        // Filter events
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });

        // Input focus effects
        this.todoInput.addEventListener('focus', () => {
            this.todoInput.parentElement.style.transform = 'scale(1.02)';
        });

        this.todoInput.addEventListener('blur', () => {
            this.todoInput.parentElement.style.transform = 'scale(1)';
        });
    }

    async loadTodos() {
        this.showLoading(true);
        try {
            const response = await fetch('/api/todos');
            this.todos = await response.json();
            this.renderTodos();
            this.updateStats();
        } catch (error) {
            console.error('Error loading todos:', error);
            this.showNotification('Error loading todos', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async handleAddTodo(e) {
        e.preventDefault();
        
        const text = this.todoInput.value.trim();
        const priority = this.prioritySelect.value;
        
        if (!text) {
            this.showNotification('Please enter a todo', 'warning');
            this.todoInput.focus();
            return;
        }

        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text, priority })
            });

            if (response.ok) {
                const newTodo = await response.json();
                this.todos.unshift(newTodo);
                this.renderTodos();
                this.updateStats();
                this.todoInput.value = '';
                this.prioritySelect.value = 'medium';
                this.showNotification('Todo added successfully!', 'success');
                
                // Add animation effect
                this.todoInput.parentElement.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.todoInput.parentElement.style.transform = 'scale(1)';
                }, 200);
            }
        } catch (error) {
            console.error('Error adding todo:', error);
            this.showNotification('Error adding todo', 'error');
        }
    }

    async toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: !todo.completed })
            });

            if (response.ok) {
                todo.completed = !todo.completed;
                this.renderTodos();
                this.updateStats();
                
                // Add completion animation
                const todoElement = document.querySelector(`[data-id="${id}"]`);
                if (todo.completed) {
                    todoElement.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        todoElement.style.transform = 'scale(1)';
                    }, 200);
                }
            }
        } catch (error) {
            console.error('Error toggling todo:', error);
            this.showNotification('Error updating todo', 'error');
        }
    }

    async deleteTodo(id) {
        if (!confirm('Are you sure you want to delete this todo?')) return;

        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.todos = this.todos.filter(t => t.id !== id);
                this.renderTodos();
                this.updateStats();
                this.showNotification('Todo deleted successfully!', 'success');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            this.showNotification('Error deleting todo', 'error');
        }
    }

    async clearCompleted() {
        if (!confirm('Are you sure you want to clear all completed todos?')) return;

        try {
            const response = await fetch('/api/todos', {
                method: 'DELETE'
            });

            if (response.ok) {
                this.todos = this.todos.filter(t => !t.completed);
                this.renderTodos();
                this.updateStats();
                this.showNotification('Completed todos cleared!', 'success');
            }
        } catch (error) {
            console.error('Error clearing completed todos:', error);
            this.showNotification('Error clearing completed todos', 'error');
        }
    }

    handleFilterChange(e) {
        const filter = e.target.dataset.filter;
        
        // Update active filter button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        this.currentFilter = filter;
        this.renderTodos();
    }

    startEdit(id) {
        this.editingId = id;
        this.renderTodos();
        
        // Focus on the edit input
        setTimeout(() => {
            const editInput = document.querySelector(`[data-id="${id}"] .edit-input`);
            if (editInput) {
                editInput.focus();
                editInput.select();
            }
        }, 100);
    }

    async saveEdit(id) {
        const editInput = document.querySelector(`[data-id="${id}"] .edit-input`);
        const newText = editInput.value.trim();
        
        if (!newText) {
            this.showNotification('Todo text cannot be empty', 'warning');
            return;
        }

        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: newText })
            });

            if (response.ok) {
                const todo = this.todos.find(t => t.id === id);
                if (todo) {
                    todo.text = newText;
                }
                this.editingId = null;
                this.renderTodos();
                this.showNotification('Todo updated successfully!', 'success');
            }
        } catch (error) {
            console.error('Error updating todo:', error);
            this.showNotification('Error updating todo', 'error');
        }
    }

    cancelEdit() {
        this.editingId = null;
        this.renderTodos();
    }

    renderTodos() {
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = '';
            this.emptyState.style.display = 'block';
            return;
        }

        this.emptyState.style.display = 'none';
        
        this.todoList.innerHTML = filteredTodos.map(todo => this.createTodoHTML(todo)).join('');
        
        // Bind events to new elements
        this.bindTodoEvents();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            case 'pending':
                return this.todos.filter(todo => !todo.completed);
            default:
                return this.todos;
        }
    }

    createTodoHTML(todo) {
        const isEditing = this.editingId === todo.id;
        const date = new Date(todo.createdAt).toLocaleDateString();
        
        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="todoApp.toggleTodo('${todo.id}')"></div>
                
                <div class="todo-content">
                    ${isEditing ? 
                        `<input type="text" class="edit-input" value="${todo.text}" onkeydown="if(event.key === 'Enter') todoApp.saveEdit('${todo.id}'); if(event.key === 'Escape') todoApp.cancelEdit();">` :
                        `<div class="todo-text">${this.escapeHtml(todo.text)}</div>`
                    }
                    
                    <div class="todo-meta">
                        <span class="todo-date">
                            <i class="fas fa-calendar"></i>
                            ${date}
                        </span>
                        <span class="priority-badge ${todo.priority}">${todo.priority}</span>
                    </div>
                </div>
                
                <div class="todo-actions">
                    ${isEditing ? 
                        `<button class="edit-btn" onclick="todoApp.saveEdit('${todo.id}')" title="Save">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="delete-btn" onclick="todoApp.cancelEdit()" title="Cancel">
                            <i class="fas fa-times"></i>
                        </button>` :
                        `<button class="edit-btn" onclick="todoApp.startEdit('${todo.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" onclick="todoApp.deleteTodo('${todo.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>`
                    }
                </div>
            </li>
        `;
    }

    bindTodoEvents() {
        // Add any additional event bindings if needed
        const editInputs = document.querySelectorAll('.edit-input');
        editInputs.forEach(input => {
            input.addEventListener('blur', () => {
                setTimeout(() => {
                    if (this.editingId) {
                        this.saveEdit(this.editingId);
                    }
                }, 100);
            });
        });
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;

        this.totalTodosEl.textContent = total;
        this.completedTodosEl.textContent = completed;
        this.pendingTodosEl.textContent = pending;

        // Add animation to stats
        [this.totalTodosEl, this.completedTodosEl, this.pendingTodosEl].forEach(el => {
            el.style.transform = 'scale(1.2)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
            }, 200);
        });
    }

    showLoading(show) {
        this.loadingSpinner.style.display = show ? 'flex' : 'none';
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }

    getNotificationColor(type) {
        switch (type) {
            case 'success': return 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
            case 'error': return 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)';
            case 'warning': return 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)';
            default: return 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
let todoApp;
document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();
    
    // Add some nice initial animations
    document.querySelector('.header-content').style.opacity = '0';
    document.querySelector('.main-content').style.opacity = '0';
    
    setTimeout(() => {
        document.querySelector('.header-content').style.transition = 'opacity 0.8s ease';
        document.querySelector('.header-content').style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        document.querySelector('.main-content').style.transition = 'opacity 0.8s ease';
        document.querySelector('.main-content').style.opacity = '1';
    }, 300);
}); 