import { useEffect, useState } from "react";
import api from "./api";
import React from 'react'

interface pokemon {
  name: string,
  image: string,
  id: number
}
interface counter {
  aciertos: number,
  errores: number
}


const App = ()=> {

  const [pokemon, setPokemon] = useState<pokemon>({} as pokemon)
  const [showName, setShowName] = useState(false)
  const [value, setValue] = useState('')
  const [message, setMessage] = useState<string>('')
  const [counter, setCounter] = useState<counter>(JSON.parse(localStorage.getItem('counter') || '{ "aciertos": 0, "errores": 0  }'))

  useEffect(() => {
    api.random().then(setPokemon)
    console.log('hola')
  }, [])

  useEffect(() => {
    localStorage.setItem('counter', JSON.stringify(counter))
  }, [counter])


  const handleChange = (event: React.FormEvent) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setShowName(true)
    if (value.trim().toLowerCase() === pokemon.name) {
      setMessage('Has acertado')
      setCounter(prev => ({ ...prev, aciertos: prev.aciertos + 1 }))
    } else {
      setMessage('Oh no, te has equivocado')
      setCounter(prev => ({ ...prev, errores: prev.errores + 1 }))
    }}

    const newGame = () => {
      setValue('');
      setMessage('');
      setShowName(false);
      api.random().then(setPokemon)
    }

    return <main>
      <div>
        <b>Aciertos: </b>
        <span>{counter.aciertos}</span>
      </div>
      <div>
        <b>Errores: </b>
        <span>{counter.errores}</span>
      </div>
      <h1>Quien es ese pokemon?</h1>

      <img
        width='500px'
        height='500px'
        src={pokemon?.image}
        alt={pokemon?.name}
        className={showName ? '' : 'ocultar'}
      />

      <div>{message}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          style={{ margin: '10px' }} />
        <button> Adivinar</button>
      </form>


      {
        showName
        &&
        <div>{pokemon.name}</div>
      }

      {
        message
        &&
        <button
          onClick={newGame}
        >Jugar otra vez 🔁 </button>
      }

    </main>
  }

  export default App
