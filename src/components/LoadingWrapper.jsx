import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const LoadingWrapper = ({ isGlobal, withBackground }) => (
  <Loading isGlobal={isGlobal} withBackground={withBackground}>
    <img
      src='https://www.gifmania.fr/Gif-Animes-Manga-Anime/Animations-Pokemon/Images-Poke-Ball/Poke-Ball-17369.gif'
      alt='wczytywanie'
    />
  </Loading>
)

const Loading = styled.div`
  position: ${props => (props.isGlobal ? 'fixed' : 'unset')};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  ${props => (props.withBackground && `
    background-color: #a0a5a57d;
  `)};
  
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 250px;
    height: 200px;
  }
`

LoadingWrapper.propTypes = {
  isGlobal: PropTypes.bool,
  withBackground: PropTypes.bool
}

LoadingWrapper.defaultProps = {
  isGlobal: false,
  withBackground: false
}

export default LoadingWrapper
