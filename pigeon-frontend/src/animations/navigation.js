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
    translateY: ['-100vh', '0'],
    translateX: ['100vw', '0'],
    opacity: [0, 1],
    borderRadius: [999, 0],
    easing: 'easeInOutQuint',
    duration: 600
  })
}

export const animateMenuClosing = () => {}
