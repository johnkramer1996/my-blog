import { onlyDigits } from './only-digits'

export const hrefPhoneFormat = (str: string) => {
  const plus = str[0] === '+' ? '+' : ''
  return `tel:${plus}${onlyDigits(str)}`
}
