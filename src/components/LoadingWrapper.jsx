import React from 'react'
import styled from 'styled-components'

const LoadingWrapper = () => (
  <Loading>
    <img
      src='https://www.gifmania.fr/Gif-Animes-Manga-Anime/Animations-Pokemon/Images-Poke-Ball/Poke-Ball-17369.gif'
      alt='wczytywanie'
    />
  </Loading>
)

const Loading = styled.div`
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
    width: 250px;
    height: 200px;
  }
`

export default LoadingWrapper
