/////////////////////////////
// Declares DOM elements
/////////////////////////////

var listDrawPile = document.querySelector('.DrawPile')
var listHumanPlayerPile = document.querySelector('.HumanPlayerPile')
var listComputerPlayerPile = document.querySelector('.ComputerPlayerPile')
var listDiscardPile = document.querySelector('.DiscardPile')
var startButton = document.querySelector('.StartGame')
var restartButton = document.querySelector('.RestartGame')
var HumanPlayerCardsArr = [] // Will be defined at startGame()

/////////////////////////////
// Functions for game action events
/////////////////////////////

function startGame () {
  DrawPile = shuffle(DrawPile)
  while (DrawPile[DrawPile.length-1].value === vWild || //ensures no Wild or Wild DrawFour for starting card
  (DrawPile[DrawPile.length-1].value === DrawFour)) {
    DrawPile = shuffle(DrawPile)
  }
  DrawPile = shuffle(DrawPile)
  HumanPlayerPile = dealCard(7)
  ComputerPlayerPile = dealCard(7)
  DiscardPile = dealCard(1)

  // Presents Human Player's Pile
  HumanPlayerPile.forEach(function (card, index) {
        var listCard = document.createElement('li')
        listCard.innerHTML = '<a id="hp'+index+'" href="#">'+card.label+'</a>'  //let listed card be clickable
        listHumanPlayerPile.appendChild(listCard)
        HumanPlayerCardsArr[index] = document.querySelector('#hp'+index)
        //console.log('x '+index);
        //console.log(HumanPlayerCardsArr);
        HumanPlayerCardsArr[index].onclick = function (e) {
          playCard(Human, parseInt(e.target.id.substring(2,e.target.id.length))) //input: player & card clicked
          return false
        }
      })

  // Presents Computer Player's Pile
  ComputerPlayerPile.forEach(function (card) {
        var listCard = document.createElement('li')
        listCard.textContent = card.label
        listComputerPlayerPile.appendChild(listCard)
      })

  // Presents opening card from Draw Pile
  DiscardPile.forEach(function (card) {
        var listCard = document.createElement('li')
        listCard.textContent = card.label
        listDiscardPile.appendChild(listCard)
      })

  // unlist intial DrawPile
  while (listDrawPile.hasChildNodes()) {
    listDrawPile.removeChild(listDrawPile.firstChild);
  }

  // relist shuffled DrawPile with dealt & opening cards removed
  DrawPile.forEach(function (card) {
        var listCard = document.createElement('li')
        listCard.textContent = card.label
        listDrawPile.appendChild(listCard)
      })
  //console.log(listHumanPlayerPile);

  // add action button/link to each listed card

//console.log(HumanPlayerCardsArr);

} // end of startGame

function restartGame () {
  window.location.reload(true)
}

function clearPileUX (whichPile) {
  if (whichPile === Human) {
    while (listHumanPlayerPile.hasChildNodes()) {
      listHumanPlayerPile.removeChild(listHumanPlayerPile.firstChild)
    }
  } else if (whichPile === Computer) {

  } else if (whichPile === Discard) {
      while (listDiscardPile.hasChildNodes()) {
        listDiscardPile.removeChild(listDiscardPile.firstChild)
      }
  }
}


function displayPileUX (whichPile) {
  if (whichPile === Human) {
    HumanPlayerPile.forEach(function (card, index) {
          var listCard = document.createElement('li')
          listCard.innerHTML = '<a id="hp'+index+'" href="#">'+card.label+'</a>'  //let listed card be clickable
          listHumanPlayerPile.appendChild(listCard)
          HumanPlayerCardsArr[index] = document.querySelector('#hp'+index)
          HumanPlayerCardsArr[index].onclick = function (e) {
            playCard(Human, parseInt(e.target.id.substring(2,e.target.id.length))) //input: player & card clicked
            return false
          }
        })
  } else if (whichPile === Computer) {

  } else if (whichPile === Discard) {
    //console.log('hello');
    DiscardPile.forEach(function (card) {
          var listCard = document.createElement('li')
          listCard.textContent = card.label
          listDiscardPile.appendChild(listCard)
        })
  }
}

function playCard (player, index) { // player: 0=computer, 1=human, index: index of player pile
  if (whichPlayerTurn === Human) {  // ensures human player cannot play when computer still calculating moves
    if (isPlayableCard(player, index)) {
      alert('Can play this')

      //console.log('b4 0: '+DiscardPile[0].label)
      // console.log('b4 1: '+DiscardPile[1].label)
      // console.log('human discarded: ', discardCard(Human, index)[0].label)
      //var k = discardCard(Human, index)
      //console.log('k '+k[0].label)

      DiscardPile.push(discardCard(Human, index)[0])
      console.log('push to DiscardPile: '+DiscardPile[1].label)

      discardCard(Discard,0) // remove first card
      //console.log('after discard old discardpile card: '+ DiscardPile[0].label);

      clearPileUX(Human)
      displayPileUX(Human)
      clearPileUX(Discard)
      displayPileUX(Discard)
      // updatePlayerPileUX(player, index)
      // if special situation (skip, draw two, draw four, wild) {}
    } else alert ('Cannot play this card!') // to revert to no action if card not playable
  }
}


/////////////////////////////
// Generates and lists unshuffled DrawPile and
// await game action events
/////////////////////////////

DrawPile = generateDrawPile()
for (var i = 0; i < DrawPile.length; i++) {
  DrawPile[i].label = labelCard(DrawPile[i])
}
DrawPile.forEach(function (card) {
      var listCard = document.createElement('li')
      listCard.textContent = card.label
      listDrawPile.appendChild(listCard)
    })

startButton.addEventListener('click', startGame)
restartButton.addEventListener('click', restartGame)
