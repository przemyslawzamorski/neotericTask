import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PokemnonItem = ({ pokemonData }) => {
  const onClick = (_) => {}

  return (
    <Wrapper>
      <img src={pokemonData.imageUrlHiRes} alt='fotka' />
      <Name>{pokemonData.name}</Name>
      <Supertype>{pokemonData.supertype}</Supertype>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1 10 30%;
  max-width: 400px;
  margin: 10px;
  border: 1px solid rgba(173,173,173,1);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  > img {
    width: 100%;
  }
`

const Name = styled.h1`
  display: flex;
  font-family: Lato;
  font-size: 26px;
  justify-content: center;
  margin: 5px;
`

const Supertype = styled.h2`
  font-family: Lato;
  font-size: 15px;
  display: flex;
  justify-content: center;
  margin: 5px;
`

PokemnonItem.propTypes = {
  pokemonData: PropTypes.shape({
    imageUrlHiRes: PropTypes.string,
    name: PropTypes.string,
    supertype: PropTypes.string
  }).isRequired
}

export default PokemnonItem
