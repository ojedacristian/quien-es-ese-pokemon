import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [pokemon, setPokemon] = useState({})
  const [showName, setShowName] = useState(false)
  
  useEffect(() => {
    api.random().then(setPokemon)
  }, [])
  
  return <main>
      <h1>Quien es ese pokemon?</h1>
      
        <img
        width='500px'
        height='500px'
        src={pokemon?.image} 
        alt={pokemon?.name}
        className={ showName ? '' : 'ocultar'}
        />

        <button
          onClick={ ()=> setShowName(!showName) }
        >Adivinar</button>

        {
          showName 
          &&
          <div>{ pokemon.name }</div>
        }
        
  </main>;
}

export default App;
