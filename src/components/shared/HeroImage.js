import React from 'react'

const HeroImage = ({ backgroundImage, message }) => {
  console.log('backgroundImage is', backgroundImage)
  const heroContainerStyles = {
    // Center content inside container
    display: 'flex',
    // Center horizontally
    justifyContent: 'center',
    // Center verticaly
    alignItems: 'center',

    // Background image
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    // Make the container taller
    height: '100vh'
  }
  // <div style={{ backgroundColor: 'red' }}>
  return (
    <div style={heroContainerStyles}>
      <h1>{message}</h1>
    </div>
  )
}

export default HeroImage
