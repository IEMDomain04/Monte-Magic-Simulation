/*
AUTHOR:
    MANDURIAGA, EMMAN T.
    HABLA, FREDRICK L.
    BAYNA, CLARENCE L.
*/

let currentBalance, round = 1, totalMinutes = 0, gameInProgress = false;

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
    if (gameInProgress) return;


    currentBalance = parseInt(document.getElementById('initial-money').value);
    const betBlack = parseInt(document.getElementById('bet-black').value);
    const betGreen = parseInt(document.getElementById('bet-green').value);
    const minutes = parseInt(document.getElementById('minutes-per-round').value);

    // Validation
    if ([currentBalance, betBlack, betGreen, minutes].some(isNaN) || currentBalance <= 0 || betBlack <= 0 || betGreen <= 0 || minutes <= 0) 
    {
        alert('Please fill in all fields with valid positive numbers.');
        return;
    }

    gameInProgress = true;
    totalMinutes = 0;
    round = 1;
    document.querySelector('#resultsTable tbody').innerHTML = '';
    document.getElementById('time-info').textContent = '';
});

// Stop - Yaw q na panalo na me eh
document.getElementById('stop-btn').addEventListener('click', function () 
{
    if (!gameInProgress) return;
    gameInProgress = false;
    alert(`You stopped the game with a balance of ${currentBalance.toFixed(2)} after ${totalMinutes} minutes.`);
    document.getElementById('time-info').textContent = `You stopped with a balance of ${currentBalance.toFixed(2)} after ${totalMinutes} minutes.`;
});

// Retry button - Ulet
document.getElementById('retry-btn').addEventListener('click', function () 
{
    gameInProgress = false;
    currentBalance = undefined;
    document.querySelector('input').value = '';
    document.querySelector('#resultsTable tbody').innerHTML = '';
    document.getElementById('time-info').textContent = '';
});

// Simulate rounds - Sige Go
document.getElementById('simulate-btn').addEventListener('click', function () 
{
    if (currentBalance <= 0) 
    {
        alert('Game over! You have run out of money.');
        document.getElementById('time-info').textContent = `You lost all your money after ${totalMinutes} minutes.`;
        gameInProgress = false;
        return;
    }

    // Bets and minutes
    const betBlack = parseInt(document.getElementById('bet-black').value);
    const betGreen = parseInt(document.getElementById('bet-green').value);
    const minutes = parseInt(document.getElementById('minutes-per-round').value);

    totalMinutes += minutes;

    // Spin Outcome
    const spinNumber = Math.floor(Math.random() * 30); 
    const outcome = spinOutcomes[spinNumber];

    // BOTH WIN, WIN, LOSE
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
        <td>${spinNumber + 1}</td> <!-- Display spin number as 1-30 -->
        <td>${betBlack} / ${betGreen}</td>
        <td>${outcome}</td>
        <td>${amount > 0 ? '+' : ''}${amount.toFixed(2)}</td>
        <td>${currentBalance.toFixed(2)}</td>
    `;
    document.querySelector('#resultsTable tbody').appendChild(row);

    if (currentBalance <= 0) {
        alert('Game over! You have run out of money.');
        document.getElementById('time-info').textContent = `You lost all your money after ${totalMinutes} minutes.`;
        gameInProgress = false;
    }
    round++;
});
