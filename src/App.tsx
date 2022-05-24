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


const App = () => {

  const [pokemon, setPokemon] = useState<pokemon>({} as pokemon)
  const [showName, setShowName] = useState(false)
  const [value, setValue] = useState('')
  const [success, setSuccess] = useState<boolean | null>(null)
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
      setSuccess(true)
      setCounter(prev => ({ ...prev, aciertos: prev.aciertos + 1 }))
    } else {
      setSuccess(false)
      setCounter(prev => ({ ...prev, errores: prev.errores + 1 }))
    }
  }

  const newGame = () => {
    setValue('');
    setSuccess(null);
    setShowName(false);
    api.random().then(setPokemon)
  }

  return <main
    style={{
      minHeight:'100vh'
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        width: '50%'
      }}
    >

      <div
      >
        <b>Aciertos: </b>
        <span>{counter.aciertos}</span>
      </div>
      <div>
        <b>Errores: </b>
        <span>{counter.errores}</span>
      </div>
    </div>
    <h1>Quien es ese pokemon?</h1>

    <img
      width='500px'
      height='500px'
      src={pokemon?.image}
      alt={pokemon?.name}
      className={showName ? '' : 'ocultar'}
    />

    <div> 
      {
        success && 
        <div style={{
          backgroundColor:'#ddff99',
          padding: '1em'
        }}>'Genial, has acertado'</div>
      }
      {
        success !== null && !success &&
        <div style={{
          backgroundColor:'#ff6600',
          padding: '1em'
        }}>
          'Oh, has fallado'
        </div>
      }
      </div>
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
      <div
        style={{
          backgroundColor:'#ffae12',
          padding: '1em'
        }}
      >{pokemon.name}</div>
    }

    {
      success !== null
      &&
      <button
        style={{
          margin: '1em',
          padding: '1em'
        }}
        onClick={newGame}
      >Jugar otra vez 🔁 </button>
    }

  </main>
}

export default App
