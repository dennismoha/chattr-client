import React from 'react'

const HeroImage = ({ backgroundImage, message }) => {
  const heroContainerStyles = {
    // Center content inside container
    display: 'flex',
    // Center horizontally
    justifyContent: 'center',
    // Center verticaly

    // Background image
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    // Make the container taller
    height: '100vh',
    position: 'sticky'
  }
  // <div style={{ backgroundColor: 'red' }}>
  return (
    <div style={heroContainerStyles}>
      <div>{message}</div>
    </div>
  )
}

export default HeroImage
