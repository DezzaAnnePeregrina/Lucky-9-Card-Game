let deckId = ''
fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id

      })
      .catch(err => {
          console.log(`error ${err}`)
      });


document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){

  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        document.querySelector('#player1Card1').src = data.cards[0].image
        document.querySelector('#player1Card2').src = data.cards[1].image

        document.querySelector('#player2Card1').src = data.cards[2].image
        document.querySelector('#player2Card2').src = data.cards[3].image

        let player1val = convertToNum(data.cards[0].value) + convertToNum(data.cards[1].value)
        let player2val = convertToNum(data.cards[2].value) + convertToNum(data.cards[3].value)
        
        player1val > 9 ? player1val -= 10 : player1val
        player2val > 9 ? player2val -= 10 : player2val

        if(player1val > player2val || player1val === 9){
          document.querySelector('h3').innerText = 'Player 1 wins'
          document.querySelector('.score1').innerText = `Player 1 got ${player1val}`
          document.querySelector('.score2').innerText = `Player 2 got ${player2val}`
        } else if(player1val < player2val || player2val === 9){
          document.querySelector('h3').innerText = 'Player 2 wins'
          document.querySelector('.score1').innerText = `Player 1 got ${player1val}`
          document.querySelector('.score2').innerText = `Player 2 got ${player2val}`
        } else{
          document.querySelector('h3').innerText = 'War!!!!!!'
          document.querySelector('.score1').innerText = `Player 1 got ${player1val}`
          document.querySelector('.score2').innerText = `Player 2 got ${player2val}`
        }

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


function convertToNum(val){
  if(val === 'ACE'){
    return 1
  } else if (val === '10'){
    return 0
  }  else if(val === 'KING'){
    return 0
  } else if(val === 'QUEEN'){
    return 0
  } else if (val === 'JACK'){
    return 0
  } else{
    return Number(val)
  }
}
