import { HeaderContainer } from './header.styles'

import logoIMG from '../../assets/logo.svg'
import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIMG} alt="logo" />
      <nav>
        <NavLink title="Home" to="/">
          <Timer size={32} />
        </NavLink>
        <NavLink title="Histórico" to="/history">
          <Scroll size={32} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
