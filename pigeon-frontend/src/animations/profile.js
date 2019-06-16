import anime from 'animejs'

export const chatPreviewAnimation = target => {
  return anime({
    targets: target,
    opacity: [0, 1],
    translateX: ['-20vw', '0vw'],
    easing: 'easeInOutCubic',
    delay: function(el, i, l) {
      return i * 150
    },
    endDelay: function(el, i, l) {
      return (l - i) * 150
    }
  })
}
