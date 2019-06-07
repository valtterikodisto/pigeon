import React, { useEffect } from 'react'

const Animation = ({ animation, effectDependencies }) => {
  const dependencies = effectDependencies ? [...effectDependencies] : []

  useEffect(() => {
    animation()
  }, [...dependencies, animation])

  return null
}

export default Animation
