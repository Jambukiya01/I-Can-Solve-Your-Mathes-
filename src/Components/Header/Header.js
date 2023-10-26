import React from 'react'

import './Header.css'

export const Header = (props) => {
  return (
    <div className="header">
        <div className='header_history'>
         {
         props.history.map((item) => 
         {<p key={item + "" + Math.random() * 44}>{item}</p>})}
        </div>
<br/>
        <div className="header_expresion">
          <p>{props.expresion}</p>
        </div>
        <div className='header_result'>
         {props.result}
        </div>
    </div>
  )
}
