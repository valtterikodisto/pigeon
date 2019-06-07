import anime from 'animejs'

export const animateLoginRegister = () => {
  const timeline = anime.timeline({})

  timeline
    .add({
      targets: '.login-register-section-wrapper > div',
      opacity: [0, 1],
      scale: [0, 1],
      easing: 'easeInOutBack',
      duration: 800
    })
    .add(
      {
        targets: '.form-group',
        translateY: [-50, 0],
        opacity: [0, 1],
        easing: 'easeInOutQuart',
        delay: (el, i, l) => i * 50
      },
      200
    )
    .add(
      {
        targets: '.form-header',
        opacity: [0, 1],
        easing: 'easeInOutQuart'
      },
      200
    )
}

export const animateHeader = () => {
  const timeline = anime.timeline({})

  timeline
    .add(
      {
        targets: '.navigation',
        translateY: ['-15vh', '0vh'],
        opacity: [0, 1],
        duration: 700,
        easing: 'easeInOutBack'
      },
      300
    )
    .add(
      {
        targets: '.logo-text',
        translateX: [-100, 0],
        opacity: [0, 1]
      },
      900
    )
}
