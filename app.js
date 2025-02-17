/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his Round score gets lost. After that, it's the next player's turn
-If the player rolls two 6 in a row, all his Global Score is lost.After that it's the next player's turn
- The player can choose to 'Hold', which means that his Round score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on Global score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying

init()

document.addEventListener ('DOMContentLoaded', alert('GAME RULES:\n- The game has 2 players, playing in rounds\n- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score\n- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it\'s the next player\'s turn\n- The player can choose to "Hold", which means that his ROUND score gets added to his GLOBAL score. After that, it\'s the next player\'s turn\n- The first player to reach 100 points on GLOBAL score wins the game'))

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
         //1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1

        //2. Display Result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block'
        diceDOM.src = 'dice-' + dice + '.png'

    
        //3. Display Round Score if not rolled 1
        if (dice !== 1) {
            // Add Score
            roundScore += dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        }else {
            // Next Player
            nextPlayer()
        }
    }
})


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //Add Current Score to Global Score
        scores [activePlayer] += roundScore
    
        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        //Check if Player Won The Game
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.dice').style.display = 'none'
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

     document.querySelector('.dice').style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    scores = [0,0]
    activePlayer = 0
    roundScore= 0
    gamePlaying = true

    document.querySelector('.dice').style.display = 'none'

    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}











//document.querySelector('#current-' + activePlayer).textContent = dice
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
//var x = document.querySelector('#score-0').textContent