import { ButtonContainer, ButtonVariant } from './Button.styles'

interface ButtonProps {
  text: string
  variant?: ButtonVariant
}

export function Button({ text, variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>{text}</ButtonContainer>
}
