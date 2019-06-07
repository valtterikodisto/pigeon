import anime from 'animejs'

export const animateMenuHoverIn = () => {
  console.log('IN')
}

export const animateMenuHoverOut = () => {
  console.log('OUT')
}

export const animateMenuOpening = () => {
  anime({
    targets: '.menu',
    translateY: ['-50vh', '0'],
    translateX: ['50vw', '0'],
    opacity: [0, 1],
    borderRadius: [999, 0],
    easing: 'easeInOutExpo',
    duration: 400
  })
}

export const animateMenuClosing = () => {}
