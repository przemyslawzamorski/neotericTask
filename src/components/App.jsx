import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import PokemnonItem from './PokemnonItem.jsx'
import Header from './Header.jsx'

class App extends Component {
  state = {
    page: 1,
    pageSize: 20,
    loading: false,
    pokemonsArray: []
  }

  componentDidMount () {
    this.getPokemonData()
  }

  getPokemonData = (_) => {
    const { page, pageSize } = this.state
    this.setState({ loading: true })
    // eslint-disable-next-line no-undef
    fetch(`https://api.pokemontcg.io/v1/cards?page=${page}&pageSize=${pageSize}`)
      .then((data) => {
        if (data.ok) {
          data.json().then((resp) => {
            this.setState(prevState => ({
              loading: false,
              pokemonsArray: prevState.pokemonsArray.concat(resp.cards)
            }))
          })
        } else {
          console.warn('Wystapił błąd')
          this.setState({ loading: false })
        }
      })
      .catch((error) => {
        this.setState({ loading: false })
        error && console.warn('Wystapił błąd')
      })
  }

  render () {
    const { loading, pokemonsArray } = this.state
    return (
      <Fragment>
        <Header />
        { loading && <LoadingWrapper>
          <img
            src='https://www.gifmania.fr/Gif-Animes-Manga-Anime/Animations-Pokemon/Images-Poke-Ball/Poke-Ball-17369.gif'
            alt='wczytywanie'
          />
                     </LoadingWrapper>}
        <Wrapper>
          {pokemonsArray.map(singlePokemon => <PokemnonItem key={singlePokemon.id} pokemonData={singlePokemon} />)}
        </Wrapper>
      </Fragment>
    )
  }
}

const LoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #a0a5a57d;
  display: flex;
  justify-content: center;
  align-items: center;


  img {
    width: 200px;
    height: 200px;
  }
`

const Wrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
`

export default App
