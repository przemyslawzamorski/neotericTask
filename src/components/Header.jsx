import React from 'react'
import styled from 'styled-components'

const Header = _ => (
  <Wrapper>
    NeoPOKOEDEX
  </Wrapper>
)

const Wrapper = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #000;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  font-family: Lato;
`

export default Header
