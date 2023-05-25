import React, { useState, useEffect, useCallback } from 'react';

const BouncingBall = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0 });

  const handleClick = () => {
    setVelocity({ vx: getRandomVelocity(), vy: 0 });
  };

  const getRandomVelocity = () => {
    return (Math.random() - 0.5) * 10; // Adjust the range and magnitude of the velocity as needed
  };

  const updatePosition = useCallback(() => {
    setPosition((prevPosition) => ({
      x: prevPosition.x + velocity.vx,
      y: prevPosition.y
    }));
  }, [velocity]);

  const handleAnimation = useCallback(() => {
    updatePosition();
    // Simulate friction to gradually slow down the ball's x-axis velocity
    setVelocity((prevVelocity) => ({
      vx: prevVelocity.vx * 0.98,
      vy: prevVelocity.vy
    }));

    // Detect collision with the window edges
    const ballSize = 75; // Adjust the size of the ball as needed
    if (position.x <= 0 || position.x + ballSize >= window.innerWidth) {
      // Ball hits the left or right edge, reverse the horizontal velocity
      setVelocity((prevVelocity) => ({
        vx: -prevVelocity.vx * 0.8, // Adjust the bounce intensity as needed
        vy: prevVelocity.vy
      }));
    }

    // Call the animation function recursively
    requestAnimationFrame(handleAnimation);
  }, [position, updatePosition]);

  useEffect(() => {
    handleAnimation();
  }, [handleAnimation]);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '75px', // Adjust the size of the ball as needed
        height: '75px', // Adjust the size of the ball as needed
        borderRadius: '50%',
        backgroundColor: 'red',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    />
  );
};

export default BouncingBall;
