import { ChangeEvent } from 'react'

const getSelectedOption = (e: ChangeEvent<HTMLSelectElement>) => {
  const element = e.target as HTMLSelectElement
  const selectedItem = element.options[element.selectedIndex].text
  return selectedItem
}

export default getSelectedOption
