const gameEl = document.getElementById('game-container'),
  bgImgEl = document.getElementById('bg-image'),
  rulesBtn = document.getElementById('game-rules'),
  modalEl = document.getElementById('modal'),
  closeModalBtn = document.getElementById('modal-close'),
  state = {
    PAPPER: 'paper',
    ROCK: 'rock',
    SCISSORS: 'scissors',
    picks: ['rock', 'paper', 'scissors'],
    userPick: undefined,
    housePick: undefined,
    isUserWiner: false,
    score: 0,
  }

// Check for score in LS
;(function () {
  const score = localStorage.getItem('rpsa_score')

  if (score) {
    state.score = score
    updateScore(score)
  }
})()

// event listeners
gameEl.addEventListener('click', (e) => {
  if (e.target.id === 'play-again') {
    playAgain()
    return
  }

  // Get button element
  const el = e.target.closest('[data-btn-icon]')

  if (el === null) {
    return
  }

  // is game finsh (step-3)
  if (state.userPick !== undefined && state.housePick !== undefined) {
    return
  }

  state.userPick = el.dataset.btnIcon
  state.housePick = getHousePick()

  // Add class to user selecet
  gameEl
    .querySelector(`[data-btn-icon="${state.userPick}"]`)
    .classList.add('move-to-user-select')

  // Add class to house selected
  gameEl
    .querySelector(`[data-btn-icon="${state.housePick}"]`)
    .classList.add('move-to-house-select')

  // Winer is...
  state.isUserWiner = getIsUserWiner()

  // Move to step 2
  gameEl.classList.add('step-2')
})

// wait transition of step-2 to end
// then move to step-3
// save to LS
bgImgEl.addEventListener('transitionend', function (e) {
  setTimeout(() => {
    // move to step-3
    gameEl.classList.add('step-3')

    addClassToWinerElement()
    updateScore()
    setWinnerMsg()
    saveToLS()
  }, 1000)
})

rulesBtn.addEventListener('click', (e) => modalEl.classList.add('show'))

closeModalBtn.addEventListener('click', (e) => modalEl.classList.remove('show'))

// Play new game
function playAgain() {
  gameEl.classList.remove('step-2', 'step-3')
  gameEl
    .querySelectorAll('.button')
    .forEach((el) =>
      el.classList.remove(
        'move-to-user-select',
        'move-to-house-select',
        'radial-bg'
      )
    )

  state.userPick = undefined
  state.housePick = undefined
}

function getHousePick() {
  const availablePicks = state.picks.filter((pik) => pik !== state.userPick)
  const randomNum = Math.floor(Math.random() * 2)

  return availablePicks[randomNum]
}

function getIsUserWiner() {
  const { PAPPER, ROCK, SCISSORS, userPick, housePick } = state

  switch (userPick) {
    case PAPPER:
      if (housePick === ROCK) {
        return true
      }
      return false

    case ROCK:
      if (housePick === SCISSORS) {
        return true
      }
      return false

    case SCISSORS:
      if (housePick === PAPPER) {
        return true
      }
      return false

    default:
      return false
  }
}

function addClassToWinerElement() {
  let winerEl = undefined

  if (state.isUserWiner) {
    winerEl = gameEl.querySelector(`[data-btn-icon="${state.userPick}"]`)
  } else {
    winerEl = gameEl.querySelector(`[data-btn-icon="${state.housePick}"]`)
  }

  winerEl.classList.add('radial-bg')
}

function updateScore(score) {
  const scoreEl = document.getElementById('score')

  // update on first load from LS
  if (score) {
    scoreEl.innerText = score
    return
  }

  if (state.isUserWiner) {
    state.score++
  } else {
    state.score--
  }

  scoreEl.innerText = state.score
}

function setWinnerMsg() {
  const winnerMsgEl = document.getElementById('winMsg')
  let msg = ''

  if (state.isUserWiner) {
    msg = 'You Win'
  } else {
    msg = 'You Lose'
  }

  winnerMsgEl.innerText = msg
}

function saveToLS() {
  localStorage.setItem('rpsa_score', state.score)
}
