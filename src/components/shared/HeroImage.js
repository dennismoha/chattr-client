import React from 'react'

const HeroImage = ({ backgroundImage, message }) => {
  console.log('backgroundImage is', backgroundImage)
  const heroContainerStyles = {
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    width: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return (
    <div style={heroContainerStyles}>
      <h1>{message}</h1>
    </div>
  )
}

export default HeroImage
