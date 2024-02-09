import React, {useState} from 'react';

import './global.css';

import Login from './pages/Login';

export default function App() {

  return (
    <div>
      <Login/>
    </div>
  )

  // Variável + changeValueFunction (setCounter)
  //const [counter, setCounter] = useState(0);

  /*
  function increment(){
    setCounter(counter + 1);
  }
  */

  /* Passar propriedade através de Children
  return (
  <Header>
    Texto qualquer
  </Header>
  );
  */  

  //Passar propriedade através de Props
  //return (<Header title="Teste"/>)
}


