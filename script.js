const gameEl = document.getElementById('game-container'),
  bgImgEl = document.getElementById('bg-image'),
  state = {
    userSelectEl: undefined,
  }

gameEl.addEventListener('click', (e) => {
  /** @type {Element} */
  const el = e.target.closest('[data-btn-icon]')
  state.userSelectEl = el

  // Add class to user selecet
  el.classList.add('move-to-user-select')

  // Add class to house selected
  gameEl
    .querySelector('[data-btn-icon="rock"]')
    .classList.add('move-to-house-select')

  // Move to step 2
  gameEl.classList.add('step-2')
})

bgImgEl.addEventListener('transitionend', function (e) {
  setTimeout(() => {
    gameEl.classList.add('step-3')
    state.userSelectEl.classList.add('radial-bg')
  }, 2000)
})
