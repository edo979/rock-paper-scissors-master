const btnEls = document.getElementById('buttons'),
  bgImgEl = document.getElementById('bg-image')

btnEls.addEventListener('click', (e) => {
  /** @type {Element} */
  const el = e.target.closest('[data-btn-icon]')

  el.classList.add('move-to-house-select')
  btnEls.classList.add('selected-visible')
})

bgImgEl.addEventListener('transitionend', function (e) {
  btnEls.classList.add('remove-children-after-transition')
})
