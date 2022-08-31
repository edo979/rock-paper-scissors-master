const btnEls = document.getElementById('buttons')

btnEls.addEventListener('click', (e) => {
  /** @type {Element} */
  const el = e.target.closest('[data-btn-icon]')

  el.classList.add('move-to-house-select')
})
