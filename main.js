const app = document.getElementById('root')

const htmlTag = `
    <div class="whole-container">
    <div class="container">
        <div class="container-input">
            <h1>Monte Carlo Simulation</h1>
            <p>A dice simulation</p>

            <div class="input-group">
                <label for="initial-money">Initial Money:</label>
                <input type="number" id="initial-money" placeholder="Enter initial amount">
            </div>

            <div class="input-group">
                <label for="bet-black">Bet for Black:</label>
                <input type="number" id="bet-black" placeholder="Bet on Black">
            </div>

            <div class="input-group">
                <label for="bet-green">Bet for Green:</label>
                <input type="number" id="bet-green" placeholder="Bet on Green">
            </div>

            <div class="input-group">
                <label for="minutes-per-round">Minutes per Round:</label>
                <input type="number" id="minutes-per-round" placeholder="Minutes per round">
            </div>

            <div class="buttons-container">
                <button id="simulate-btn">Simulate</button>
                <button id="retry-btn">Retry</button>
                <button id="stop-btn">Stop</button>
            </div>

            <div class="time-info" id="time-info"></div>
        </div>
    </div>

        <div class="table-container">
            <table id="resultsTable">
                <thead>
                    <tr>
                        <th>ROUND</th>
                        <th>SPIN</th>
                        <th>BLACK / GREEN</th>
                        <th>RESULT</th>
                        <th>OUTCOME</th>
                        <th>BALANCE</th>
                    </tr>
                </thead>
                <tbody id="result-body">
                </tbody>
            </table>
        </div>
</div>
`

app.innerHTML = htmlTag;