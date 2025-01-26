/*
AUTHOR:
    MANDURIAGA, EMMAN T. - Backend
    HABLA, FREDRICK L. - Frontend
    BAYNA, CLARENCE L. - Documentation
*/

let currentBalance, round = 1, totalMinutes = 0, gameInProgress = false, gameStopped = false;

// 30 Spins
const spinOutcomes = [
    "WIN", 
    "LOSE", 
    "LOSE", 
    "WIN", 
    "LOSE", 
    "BOTH WIN", 
    "LOSE", 
    "LOSE", 
    "BOTH WIN", 
    "WIN",
    "LOSE", 
    "BOTH WIN", 
    "WIN", 
    "LOSE", 
    "BOTH WIN", 
    "WIN", 
    "BOTH WIN", 
    "LOSE", 
    "WIN", 
    "BOTH WIN",
    "WIN", 
    "WIN", 
    "LOSE", 
    "BOTH WIN", 
    "LOSE", 
    "LOSE", 
    "BOTH WIN", 
    "WIN", 
    "LOSE", 
    "WIN"
];

// Simulate
document.getElementById('simulate-btn').addEventListener('click', function () 
{
    if (gameInProgress || gameStopped) 
    {
        if (gameStopped) 
        {
            alert("You must retry the game before simulating again. Sana nanalo ka :)");
        }
        return;
    }

    // Get inputs and validate
    const initialMoneyInput = document.getElementById('initial-money').value.trim();
    const betBlackInput = document.getElementById('bet-black').value.trim();
    const betGreenInput = document.getElementById('bet-green').value.trim();
    const minutesInput = document.getElementById('minutes-per-round').value.trim();

    currentBalance = parseInt(initialMoneyInput);
    const betBlack = parseInt(betBlackInput);
    const betGreen = parseInt(betGreenInput);
    const minutes = parseInt(minutesInput);

    // Validate inputs
    if (!initialMoneyInput || !betBlackInput || !betGreenInput || !minutesInput || 
        [currentBalance, betBlack, betGreen, minutes].some(value => isNaN(value) || value <= 0)) 
    {
        alert('Please fill in all fields with valid positive numbers.');
        return;
    }

    // Start the game
    gameInProgress = true;
    gameStopped = false;
    totalMinutes = 0;
    round = 1;
    document.querySelector('#resultsTable tbody').innerHTML = '';
    document.getElementById('time-info').textContent = '';
});

// Stop Button
document.getElementById('stop-btn').addEventListener('click', function () 
{
    if (!gameInProgress) 
    {
        alert("There’s no game in progress. How can I stop something that hasn’t even started?");
        return;
    }

    const userConfirmed = confirm("Are you sure you want to stop the game and keep your winnings?");
    if (userConfirmed) 
    {
        gameInProgress = false;
        gameStopped = true;
        alert(`You stopped the game with a balance of ${currentBalance.toFixed(2)} after ${totalMinutes} minutes.`);
        document.getElementById('time-info').textContent = `You stopped with a balance of ${currentBalance.toFixed(2)} after ${totalMinutes} minutes.`;
    }
});

// Retry Button
document.getElementById('retry-btn').addEventListener('click', function () 
{
    if (!gameInProgress) 
    {
        alert("There’s no game in progress.");
        return;
    }

    const userConfirmed = confirm("Are you sure you want to retry? This action will restart the entire game and reset all progress.");
    if (userConfirmed) 
    {
        alert("Game Reset.");
        gameInProgress = false;
        gameStopped = false;
        currentBalance = undefined;
        document.querySelectorAll('input').forEach(input => input.value = '');
        document.querySelector('#resultsTable tbody').innerHTML = '';
        document.getElementById('time-info').textContent = '';
    }
});

// Simulate Rounds
document.getElementById('simulate-btn').addEventListener('click', function () 
{
    if (!gameInProgress || gameStopped) return;

    if (currentBalance <= 0) 
    {
        alert('Game over! You have run out of money.');
        document.getElementById('time-info').textContent = `You lost all your money after ${totalMinutes} minutes.`;
        gameInProgress = false;
        return;
    }

    const betBlack = parseInt(document.getElementById('bet-black').value);
    const betGreen = parseInt(document.getElementById('bet-green').value);
    const minutes = parseInt(document.getElementById('minutes-per-round').value);

    if ([betBlack, betGreen, minutes].some(value => value <= 0 || isNaN(value))) 
    {
        alert('Invalid bet or minutes. Please ensure all fields have valid positive values.');
        return;
    }

    totalMinutes += minutes;

    const spinNumber = Math.floor(Math.random() * 30); 
    const outcome = spinOutcomes[spinNumber];

    let amount = 0;
    if (outcome === "WIN") 
    {
        amount = Math.max(betBlack, betGreen) - Math.min(betBlack, betGreen);
    } 
    else if (outcome === "LOSE") 
    {
        amount = -(betBlack + betGreen);
    } 
    else if (outcome === "BOTH WIN") 
    {
        amount = betBlack + betGreen;
    }

    currentBalance += amount;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${round}</td>
        <td>${spinNumber + 1}</td>
        <td>${betBlack} / ${betGreen}</td>
        <td>${outcome}</td>
        <td>${amount > 0 ? '+' : ''}${amount.toFixed(2)}</td>
        <td>${currentBalance.toFixed(2)}</td>
    `;
    document.querySelector('#resultsTable tbody').appendChild(row);

    if (currentBalance <= 0) 
    {
        alert('Game over! You have run out of money.');
        document.getElementById('time-info').textContent = `You lost all your money after ${totalMinutes} minutes.`;
        gameInProgress = false;
    }
    round++;
});
