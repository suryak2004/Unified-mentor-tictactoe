import React from 'react';

export default function Cell({ mark, onClick }) {
  return (
    <div
      className={`cell ${mark ? 'marked' : ''}`}
      data-mark={mark}
      onClick={onClick}
    >
      {mark}
    </div>
  );
}
