const gameEl = document.getElementById('game-container'),
  bgImgEl = document.getElementById('bg-image')

gameEl.addEventListener('click', (e) => {
  /** @type {Element} */
  const el = e.target.closest('[data-btn-icon]')

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
  gameEl.classList.add('step-3')
})
