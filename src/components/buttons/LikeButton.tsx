import React from 'react';

interface LikeButtonProps {
  isLiked: boolean | undefined;
  handleLike: () => void;
}

const LikeButton = ({ isLiked, handleLike }: LikeButtonProps) => (
  <button onClick={handleLike}>{isLiked ? '❤️' : '♡'}</button>
);

export default LikeButton;
