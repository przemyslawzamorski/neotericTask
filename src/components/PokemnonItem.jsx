import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PokemnonItem = ({ pokemonData, small, onSelect }) => (
  <Wrapper small={small} onClick={onSelect}>
    <img src={pokemonData.imageUrlHiRes} alt='fotka' />
    <Name small={small}>{pokemonData.name}</Name>
    <Supertype small={small}>{pokemonData.supertype}</Supertype>
  </Wrapper>
)

const Wrapper = styled.div`
  @media (min-width: 550px) {
    ${props => (props.small
    ? `width: auto;`
    : `flex: 1 10 30%;`)};
  }

  @media (max-width: 550px) {
    width: 100%;
  }

  max-width: 400px;
  margin: 10px;
  border: 1px solid rgba(173,173,173,1);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  > img {
    width: ${props => (props.small ? '200px' : '100%')};

    ${props => (props.small && `
      @media (max-width: 550px) {
        width: 100%;
      }
    `)};
  }
`
const Name = styled.h1`
  display: flex;
  font-family: Lato;
  font-size: ${props => (props.small ? '20px' : '26px')};
  justify-content: center;
  margin: ${props => (props.small ? '5px 0px 0px' : '5px')};
`
const Supertype = styled.h2`
  font-family: Lato;
  font-size: ${props => (props.small ? '12px' : '15px')};
  display: flex;
  justify-content: center;
  margin: 5px;
  margin: ${props => (props.small ? '0px 0px 5px' : '5px')};
  font-weight: 100;
`

PokemnonItem.propTypes = {
  pokemonData: PropTypes.shape({
    imageUrlHiRes: PropTypes.string,
    name: PropTypes.string,
    supertype: PropTypes.string
  }).isRequired,
  small: PropTypes.bool,
  onSelect: PropTypes.func
}

PokemnonItem.defaultProps = {
  small: false,
  onSelect: (_) => {}
}

export default PokemnonItem
