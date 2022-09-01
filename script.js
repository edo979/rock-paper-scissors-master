const btnEls = document.getElementById('buttons'),
  bgImgEl = document.getElementById('bg-image')

btnEls.addEventListener('click', (e) => {
  /** @type {Element} */
  const el = e.target.closest('[data-btn-icon]')

  // Add class to user selecet
  el.classList.add('move-to-user-select')

  // Add class to house selected
  btnEls
    .querySelector('[data-btn-icon="rock"]')
    .classList.add('move-to-house-select')

  // Hide elements
  btnEls.classList.add('hide-elements')

  // Move to step 2
  btnEls.classList.add('step-2')
})

bgImgEl.addEventListener('transitionend', function (e) {
  btnEls.classList.add('remove-children-after-transition')
})
