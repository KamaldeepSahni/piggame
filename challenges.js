var scores, roundScore, activePlayer, gamePlaying

init()

var prevRoll1, prevRoll2

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
         //1. Random Number
        var dice1 = Math.floor(Math.random() * 6) + 1
        var dice2 = Math.floor(Math.random() * 6) + 1

        //2. Display Result
        document.querySelector('#dice-1').style.display = 'block'
        document.querySelector('#dice-2').style.display = 'block'
        document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png'
        document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png'
    
        //3. Display Round Score if not rolled 1
        if ((dice1 === 6 && prevRoll1 === 6) || (dice2 === 6 && prevRoll2 === 6)) {
            //Player Looses Score
            scores[activePlayer] = 0
            document.querySelector('#score-' + activePlayer).textContent = '0'
            nextPlayer()
        }else if (dice1 !== 1 && dice2 !== 1) {
            // Add Score
            roundScore += dice1 + dice2
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        }else {
            // Next Player
            nextPlayer()
        }
        prevRoll1 = dice1
        prevRoll2 = dice2
    }
})


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //Add Current Score to Global Score
        scores [activePlayer] += roundScore
    
        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
        
        var input = document.querySelector('.final-score').value
        var winScore

        if(input) {
            winScore = input
        }else {
            winScore = 100
        }

        //Check if Player Won The Game
        if (scores[activePlayer] >= winScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('#dice-1').style.display = 'none'
            document.querySelector('#dice-2').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false
        }else {
            // Next Player
            nextPlayer()
        }
    }
})


function nextPlayer () {
     // Next Player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
     roundScore = 0

     document.getElementById('current-0').textContent = '0'
     document.getElementById('current-1').textContent = '0'

     //document.querySelector('.player-0-panel').classList.remove('active')
     //document.querySelector('.player-0-panel').classList.add('active')
     
     document.querySelector('.player-0-panel').classList.toggle('active')
     document.querySelector('.player-1-panel').classList.toggle('active')

     document.querySelector('#dice-1').style.display = 'none'
     document.querySelector('#dice-2').style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    scores = [0,0]
    activePlayer = 0
    roundScore= 0
    gamePlaying = true

    document.querySelector('#dice-1').style.display = 'none'
    document.querySelector('#dice-2').style.display = 'none'

    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}