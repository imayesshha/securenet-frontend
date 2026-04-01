// components/CustomCursor.jsx — custom shield cursor
import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    };

    const animateFollower = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.08;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.08;
      follower.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`;
      requestAnimationFrame(animateFollower);
    };

    const onMouseDown = () => cursor.style.transform += ' scale(0.8)';
    const onMouseUp = () => {};

    const onMouseEnterLink = () => {
      cursor.style.opacity = '0';
      follower.style.width = '50px';
      follower.style.height = '50px';
      follower.style.borderColor = '#00f5ff';
      follower.style.backgroundColor = 'rgba(0,245,255,0.1)';
    };

    const onMouseLeaveLink = () => {
      cursor.style.opacity = '1';
      follower.style.width = '40px';
      follower.style.height = '40px';
      follower.style.borderColor = 'rgba(0,245,255,0.5)';
      follower.style.backgroundColor = 'transparent';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    animateFollower();

    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      {/* Shield glow cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-5 h-5 rounded-full bg-gradient-to-r from-[#00f5ff]/80 to-[#7c3aed]/80 shadow-[0_0_10px_rgba(0,245,255,0.6)]"
        style={{ transition: 'opacity 0.2s' }}
      />

      {/* Follower circle */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          width: '40px',
          height: '40px',
          border: '1px solid rgba(0,245,255,0.5)',
          backgroundColor: 'transparent',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s',
        }}
      />
    </>
  );
};

export default CustomCursor;