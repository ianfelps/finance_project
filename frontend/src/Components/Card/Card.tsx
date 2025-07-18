import React, { JSX } from 'react'
import './Card.css'

interface Props {
  companyName: string;
  ticker: string;
  price: number;
}

const Card: React.FC<Props> = ({ companyName, ticker, price }: Props): JSX.Element => {
  return (
  <div className='card'>
    <img src="https://m.media-amazon.com/images/I/715vwvP5ZEL.png" alt="Logo" />
    <div className='details'>
        <h2>{companyName} ({ticker})</h2>
        <p>${price}</p>
    </div>
    <p className='info'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, minima!
    </p>
  </div>
  );
};

export default Card