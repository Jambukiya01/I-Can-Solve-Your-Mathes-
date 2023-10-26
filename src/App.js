import { useState } from 'react';

import './App.css';

import { Header } from './Components/Header/Header';
import { KeyPad } from './Components/KeyPad/KeyPad';

import moon from './assets/moon.jpeg'
import sun from './assets/sun.jpeg'

const useKeyCode = [48,49,50,51,52,53,54,55,56,
                    57,96,97,98,99,100,101,102,
                    103,104,105,8,13,187,189,190,
                    191,56,111,106,107,109,173];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8","9"];
const operators = ["/", "+", "-", "*"];

function App() {
  const[isDarkMode, setIsDarkMode] = useState(false);

  const[expresion, setExpresion] = useState("");
  const[result, setResult] = useState("");
  const[history, setHistory] = useState([])

  const handlekeypress = (keyCode, key) => {
    if(!keyCode)return
    if(!useKeyCode.includes(keyCode))return;

    if(numbers.includes(key)){
      if(key === "0"){
        if(expresion.length === "0")return
      }
      setExpresion(expresion + key)
      calculateResult(expresion)
     
      // console.log("number")
    }
    else if(operators.includes(key)){
      // console.log("operator")
      if(!expresion)return

      const lastChar = expresion.slice(-1);
      if(operators.includes(lastChar))return;
      if(lastChar === ".")return;

      setExpresion(expresion + key)
      
    }
    else if (key === ".") {
      if(!expresion)return
      const lastChar = expresion.slice(-1);
      if(!numbers.includes(lastChar))return

      setExpresion(expresion + key);
    }
    else if(keyCode===8){
      // console.log("Backspace")
      if(!expresion)return
      setExpresion(expresion.slice(0,-1));
      calculateResult(expresion)
    }
    else if(keyCode===13){
      // console.log("enter")
      if(!expresion)return
      calculateResult(expresion);

      const tempHistory = [...history];
      if(tempHistory.length > 5) tempHistory = tempHistory.slice(0,1);
      tempHistory.push(expresion);
      setHistory(tempHistory);

    }
    // console.log(keyCode,key)
  };

  const calculateResult = (exp) => {
    // if(!exp)return
    const lastChar = expresion.slice(-1);
    if(!numbers.includes(lastChar))exp=exp.slice(0,-1);

    const answer = eval(exp).toFixed(2) + "";
    setResult(answer);
  }


  return (
    <div className='main' 
    tabIndex={0}
    onKeyDown={(Event) => handlekeypress(Event.keyCode, Event.key)}
    data-theme={isDarkMode ? "dark" : ""}>
      <div className='main_claculator'>

          <Header expresion={expresion} result={result} history= {history}/>
          <KeyPad handlekeypress={handlekeypress} />

        <div className='main_claculator_navbar'>
          <div className='main_claculator_navbar_toggle' 
          onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <div className={`main_claculator_navbar_toggle_circle 
            ${isDarkMode ? "main_claculator_navbar_toggle_circle_active" : "" }`}>
          </div>
          </div>
          <img src={isDarkMode? moon : sun} alt='mode'/>
        </div>
      </div>
    </div>
  );
}

export default App;
