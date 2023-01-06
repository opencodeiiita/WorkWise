import React from 'react';
import cardsData from '../utils/cards.json';
import Card from './Card.js';

function Cards() {
  return (
    <body className='min-h-screen bg-gray-200'>
      <div className="flex justify-start">
      {cardsData.map((item,index) => (
          <Card key={index} card={item} />
      ))}
    </div>
    </body>
  );
}

export default Cards;