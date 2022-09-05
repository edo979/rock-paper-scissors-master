const gameEl = document.getElementById('game-container'),
  bgImgEl = document.getElementById('bg-image'),
  state = {
    picks: ['rock', 'paper', 'scissors'],
    userPick: undefined,
    housePick: undefined,
    score: 0,
    userSelectEl: undefined,
  }

gameEl.addEventListener('click', (e) => {
  /** @type {Element} */
  state.userPick = e.target.closest('[data-btn-icon]').dataset.btnIcon
  state.housePick = getHousePick()
  console.log(state)

  // Add class to user selecet
  gameEl
    .querySelector(`[data-btn-icon="${state.userPick}"]`)
    .classList.add('move-to-user-select')

  // Add class to house selected
  gameEl
    .querySelector(`[data-btn-icon="${state.housePick}"]`)
    .classList.add('move-to-house-select')

  // // Move to step 2
  gameEl.classList.add('step-2')
})

bgImgEl.addEventListener('transitionend', function (e) {
  setTimeout(() => {
    gameEl.classList.add('step-3')
    gameEl
      .querySelector(`[data-btn-icon="${state.userPick}"]`)
      .classList.add('radial-bg')
  }, 1000)
})

function getHousePick() {
  const availablePicks = state.picks.filter((pik) => pik !== state.userPick)
  const randomNum = Math.floor(Math.random() * 2)

  return availablePicks[randomNum]
}
