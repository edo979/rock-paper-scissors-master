const gameEl = document.getElementById('game-container'),
  bgImgEl = document.getElementById('bg-image'),
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

gameEl.addEventListener('click', (e) => {
  /** @type {Element} */
  state.userPick = e.target.closest('[data-btn-icon]').dataset.btnIcon
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

  // // Move to step 2
  gameEl.classList.add('step-2')
})

bgImgEl.addEventListener('transitionend', function (e) {
  setTimeout(() => {
    gameEl.classList.add('step-3')

    let winerEl = undefined

    if (state.isUserWiner) {
      winerEl = gameEl.querySelector(`[data-btn-icon="${state.userPick}"]`)
    } else {
      winerEl = gameEl.querySelector(`[data-btn-icon="${state.housePick}"]`)
    }

    winerEl.classList.add('radial-bg')
  }, 1000)
})

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
