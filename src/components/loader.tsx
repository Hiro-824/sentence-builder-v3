"use client"

const Loader = () => {
  return (
    <div style={{
      position: 'fixed',
      // Start below the TopBar
      top: '64px', 
      left: 0,
      right: 0,
      bottom: 0,
      // A high z-index to ensure it's on top of the SVG canvas
      zIndex: 1500, 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // A semi-transparent white background to subtly hide the canvas
      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
      backdropFilter: 'blur(4px)', // Nice modern blur effect
      transition: 'opacity 0.2s ease-in-out'
    }}>
      <div style={{
        fontSize: '24px',
        fontWeight: '500',
        color: '#1a1a1a',
      }}>
        読み込み中...
      </div>
    </div>
  );
};

export default Loader;