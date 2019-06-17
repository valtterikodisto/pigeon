import anime from 'animejs'

export const searchButtonOpen = target => {
  target.style.display = 'grid'

  anime({
    targets: target,
    opacity: [0, 1],
    translateX: ['10em', 0],
    width: ['50%', '100%'],
    easing: 'easeOutCirc'
  })
}

export const searchButtonClose = target => {
  anime({
    targets: target,
    opacity: [1, 0],
    translateX: [0, '10em'],
    width: ['100%', '50%'],
    easing: 'easeOutExpo',
    complete: () => (target.display = 'none')
  })
}
