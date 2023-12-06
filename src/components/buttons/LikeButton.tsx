import React, { useState } from 'react';

import '@styles/buttons/LikeButton.css';

interface LikeButtonProps {
  isLiked: boolean | undefined;
  handleLike: () => void;
}

const LikeButton = ({ isLiked, handleLike }: LikeButtonProps) => {
  const [originalIcon, onHoverIcon] = isLiked ? ['❤️', '♡'] : ['♡', '❤️'];
  const [icon, setIcon] = useState(originalIcon);

  return (
    <button
      className={icon === '❤️' ? 'liked' : ''}
      onClick={handleLike}
      onMouseEnter={() => setIcon(onHoverIcon)}
      onMouseLeave={() => setIcon(originalIcon)}
    >
      {icon}
    </button>
  );
};

export default LikeButton;
