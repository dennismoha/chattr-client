import React from 'react'

const HeroGradient = ({ message, startColor, midColor, endColor }) => {
  console.log(startColor, midColor, endColor)
  const heroContainerStyles = {
    // Center content inside container
    display: 'flex',
    // Center horizontally
    justifyContent: 'center',
    // Center verticaly
    alignItems: 'center',

    // Make the container taller
    height: '60vh',

    // Gradient generated from cssgradient.io
    background: `linear-gradient(90deg, ${startColor} 0%,` +
                ` ${midColor} 35%, ${endColor} 100%)`,
    fontFamily: '\'Roboto\', sans-serif'
  }

  return (
    <div style={heroContainerStyles}>
      <h1>{message}</h1>
    </div>
  )
}

export default HeroGradient
