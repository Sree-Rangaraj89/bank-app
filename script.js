document.addEventListener('DOMContentLoaded', function () {
    const balanceEl = document.getElementById('balance');
    const transactionsList = document.getElementById('transactions-list');
    const transactionForm = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');

    let balance = 0;
    let transactions = [];

    transactionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);

        if (description.trim() === '' || isNaN(amount)) {
            alert('Please enter a valid description and amount');
            return;
        }

        const transaction = {
            id: generateID(),
            description: description,
            amount: amount
        };

        transactions.push(transaction);
        updateBalance();
        updateTransactionsList();

        descriptionInput.value = '';
        amountInput.value = '';
    });

    function generateID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function updateBalance() {
        balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        balanceEl.textContent = balance.toFixed(2);
    }

    function updateTransactionsList() {
        transactionsList.innerHTML = '';

        transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
            transactionsList.appendChild(li);
        });
    }
});
