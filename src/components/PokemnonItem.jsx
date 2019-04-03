import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Modal from './Modal.jsx'

class PokemnonItem extends Component {
  state = {
    isModalVisible: false
  }

  closeModal = (event) => {
    event.stopPropagation()
    this.setState({ isModalVisible: false })
  }

  openModal = (_) => {
    this.setState({ isModalVisible: true })
  }

  render () {
    const { isModalVisible } = this.state
    const { pokemonData } = this.props

    return (
      <Wrapper onClick={e => this.openModal()}>
        <img src={pokemonData.imageUrlHiRes} alt='fotka' />
        <Name>{pokemonData.name}</Name>
        <Supertype>{pokemonData.supertype}</Supertype>

        { isModalVisible &&
          <Modal pokemonData={pokemonData} closeModalFunc={this.closeModal} />
        }
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  @media (min-width: 425px) {
    flex: 1 10 30%;
  }

  @media (max-width: 424px) {
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
  font-weight: 100;
`

PokemnonItem.propTypes = {
  pokemonData: PropTypes.shape({
    imageUrlHiRes: PropTypes.string,
    name: PropTypes.string,
    supertype: PropTypes.string
  }).isRequired
}

export default PokemnonItem
