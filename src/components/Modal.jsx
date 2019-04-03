import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import PokemnonItem from './PokemnonItem.jsx'

class Modal extends Component {
  stat ={
    loading: false,
    similar: []
  }

  componentDidMount () {
    const { pokemonData } = this.props
    this.getSimilarPokemons(pokemonData.hp, pokemonData.rarity, pokemonData.rarity)
  }

  renderProperty = (propertyArray, field) => {
    if (!Array.isArray(propertyArray)) {
      return '-'
    }

    return propertyArray.map(prop => (field ? prop[field] : prop)).join(', ')
  }

  getSimilarPokemons = (hp, type, rarity) => {
    this.setState({ loading: true })
    // eslint-disable-next-line no-undef
    fetch(`https://api.pokemontcg.io/v1/cards?&type=${type}&rarity=${rarity}&hp=${hp}`)
      .then((data) => {
        if (data.ok) {
          data.json().then((resp) => {
            this.setState(prevState => ({
              loading: false,
              similar: resp.cards
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
    const { pokemonData, closeModalFunc } = this.props

    return (
      <BackgroundWrapper>
        <Content>
          <div className='close' onClick={e => closeModalFunc(e)} />

          <PokemonContent>
            <img src={pokemonData.imageUrlHiRes} alt='details-foto' />
            <PokemonDetails>
              <Label>Name:</Label>
              <Value>{pokemonData.name}</Value>
              <Label>Super Type:</Label>
              <Value>{pokemonData.supertype}</Value>
              <Label>Id:</Label>
              <Value>{pokemonData.id}</Value>
              <Label>Series:</Label>
              <Value>{pokemonData.series}</Value>

              <Label>DETAILS</Label>
              <SmallItem>
                <Label small>Resistances: </Label>
                <Value small>{this.renderProperty(pokemonData.resistances, 'type')}</Value>
              </SmallItem>
              <SmallItem>
                <Label small>Weaknesses: </Label>
                <Value small>{this.renderProperty(pokemonData.weaknesses, 'type')}</Value>
              </SmallItem>

              <SmallItem>
                <Label small>Types </Label>
                <Value small>{this.renderProperty(pokemonData.types)}</Value>
              </SmallItem>
              <SmallItem>
                <Label small>Attacks: </Label>
                <Value small>{this.renderProperty(pokemonData.attacks, 'name')}</Value>
              </SmallItem>
              <SmallItem>
                <Label small>Rarity: </Label>
                <Value small>{pokemonData.rarity}</Value>
              </SmallItem>
              <SmallItem>
                <Label small>National Pokedex Number: </Label>
                <Value small>{pokemonData.nationalPokedexNumber}</Value>
              </SmallItem>
              <SmallItem>
                <Label small>Hit points: </Label>
                <Value small>{pokemonData.hp}</Value>
              </SmallItem>
              <SmallItem>
                <Label small>Set: </Label>
                <Value small>{pokemonData.set}</Value>
              </SmallItem>
              <SmallItem>
                <Label small>Evolves from: </Label>
                <Value small>{pokemonData.evolvesFrom || '-'}</Value>
              </SmallItem>
            </PokemonDetails>
          </PokemonContent>
          <SimilarPokemons>
            <PokemnonItem pokemonData={pokemonData} small />
          </SimilarPokemons>
        </Content>
      </BackgroundWrapper>
    )
  }
}
const SimilarPokemons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const BackgroundWrapper = styled.div`
  position: fixed;
  display: flex;
  background-color: #b5b5b5ab;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: auto;
`
const Content = styled.div`
  background-color: #fff;
  padding: 15px;
  position: fixed;

  .close {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 32px;
    height: 32px;
    opacity: 0.3;
  }
  .close:hover {
    opacity: 1;
  }
  .close:before, .close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #333;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
`
const PokemonContent = styled.div`
  display: flex;

  img {
    width: 40%;
    height: 40%;
  }
`
const PokemonDetails = styled.div`
  margin-left: 10px;
  padding: 10px;
`
const Label = styled.p`
  font-size: 18px;
  margin: 0px 0px 5px;
  font-family: Lato;
  font-weight: bold;

  ${props => props.small && `
    font-size: 14px;
    display: inline-block;
    padding-right: 5px;
  `};
`
const Value = styled.p`
  font-size: 14px;
  margin: 0px 0px 10px;
  font-family: Lato;

  ${props => props.small && `
    font-size: 14px;
    display: inline-block;
  `};
`
const SmallItem = styled.div``

Modal.propTypes = {
  pokemonData: PropTypes.shape({
    imageUrlHiRes: PropTypes.string,
    name: PropTypes.string,
    supertype: PropTypes.string
  }).isRequired,
  closeModalFunc: PropTypes.func.isRequired
}

export default Modal
