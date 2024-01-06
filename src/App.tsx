import { ThemeProvider } from 'styled-components'
import { Button } from './components/Button'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <h1>Pomodoro</h1>
      <Button text="Enviar" />
      <Button text="Error" variant="error" />
      <Button text="Warning" variant="warning" />
    </ThemeProvider>
  )
}
