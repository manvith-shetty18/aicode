import { useEffect, useState } from "react";
import "../styles/BallCursor.css"; // Import the CSS for the ball cursor

const BallCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // ✅ Run once (no dependencies)

  useEffect(() => {
    let animationFrameId;

    const moveBall = () => {
      setBallPosition((prev) => {
        const distX = position.x - prev.x;
        const distY = position.y - prev.y;
        const speed = 0.05; // Adjust this for smoother/slower movement

        return {
          x: prev.x + distX * speed,
          y: prev.y + distY * speed,
        };
      });

      animationFrameId = requestAnimationFrame(moveBall);
    };

    animationFrameId = requestAnimationFrame(moveBall);

    return () => cancelAnimationFrame(animationFrameId); // ✅ Cleanup animation loop on unmount
  }, [position]); // ✅ Only depends on `position`

  return (
    <div
      className="ball-cursor"
      style={{
        left: `${ballPosition.x}px`,
        top: `${ballPosition.y}px`,
      }}
    />
  );
};

export default BallCursor;
