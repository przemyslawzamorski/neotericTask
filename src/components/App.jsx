import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import PokemnonItem from './PokemnonItem.jsx'
import Header from './Header.jsx'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      lastPage: false,
      pageSize: 20,
      loading: false,
      pokemonsArray: []
    }

    this.listRef = React.createRef()
  }

  componentDidMount () {
    this.getPokemonData()
    // scroll event
    window.addEventListener('scroll', this.checkIsBottom)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.checkIsBottom)
  }

  checkIsBottom = (_) => {
    const { lastPage } = this.state

    const d = document.documentElement
    const offset = d.scrollTop + window.innerHeight
    const height = d.offsetHeight

    if (height * 0.8 < offset && !lastPage) {
      window.removeEventListener('scroll', this.checkIsBottom)
      this.getPokemonData()
    }
  }

  getPokemonData = (_) => {
    const { page, pageSize } = this.state
    this.setState({ loading: true })
    // eslint-disable-next-line no-undef
    fetch(`https://api.pokemontcg.io/v1/cards?page=${page}&pageSize=${pageSize}&supertype=pokemon`)
      .then((data) => {
        if (data.ok) {
          data.json().then((resp) => {
            this.setState(prevState => ({
              loading: false,
              pokemonsArray: prevState.pokemonsArray.concat(resp.cards),
              lastPage: resp.cards.length < 20,
              page: prevState.page + 1
            }))
            window.addEventListener('scroll', this.checkIsBottom)
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
    const { loading, pokemonsArray, lastPage } = this.state
    return (
      <Fragment>
        <Header />
        { loading &&
          <LoadingWrapper>
            <img
              src='https://www.gifmania.fr/Gif-Animes-Manga-Anime/Animations-Pokemon/Images-Poke-Ball/Poke-Ball-17369.gif'
              alt='wczytywanie'
            />
          </LoadingWrapper>
        }
        <Wrapper>
          {pokemonsArray.map(singlePokemon => <PokemnonItem key={singlePokemon.id} pokemonData={singlePokemon} />)}
          {lastPage && <NoMoreData>To już wszystkie pokemony w bazie danych</NoMoreData>}
        </Wrapper>
      </Fragment>
    )
  }
}

const LoadingWrapper = styled.div`
  position: fixed;
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

const NoMoreData = styled.div`
  display: flex;
  margin: 20px;
  justify-content: center;
  width: 100%;
`

export default App
