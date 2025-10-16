// Select elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addBtn = document.getElementById('addBtn');
const transactionsList = document.getElementById('transactions-list');
const balanceDisplay = document.getElementById('balance');

// Array to store transactions
let transactions = [];

// Add transaction
addBtn.addEventListener('click', () => {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if(description === '' || isNaN(amount)) {
        alert('Please enter valid description and amount.');
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);
    updateUI();

    // Clear inputs
    descriptionInput.value = '';
    amountInput.value = '';
});

// Update the UI
function updateUI() {
    // Clear list
    transactionsList.innerHTML = '';

    // Add transactions to list
    transactions.forEach(tx => {
        const li = document.createElement('li');
        li.classList.add('transaction-item');
        li.classList.add(tx.type);
        li.innerHTML = `
            <span>${tx.description}: $${tx.amount}</span>
            <button class="delete-btn" onclick="deleteTransaction(${tx.id})">Delete</button>
        `;
        transactionsList.appendChild(li);
    });

    // Update balance
    const balance = transactions.reduce((acc, tx) => {
        return tx.type === 'income' ? acc + tx.amount : acc - tx.amount;
    }, 0);

    balanceDisplay.textContent = balance.toFixed(2);
}

// Delete transaction
function deleteTransaction(id) {
    transactions = transactions.filter(tx => tx.id !== id);
    updateUI();
}
