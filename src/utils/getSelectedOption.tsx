import { ChangeEvent } from "react"

const getSelectedOption = (e: ChangeEvent<HTMLSelectElement>) => {
  console.log(e)

  const element = e.target as HTMLSelectElement
  const selectedItem = element.options[element.selectedIndex].text
  console.log(element)
  return selectedItem
}

export default getSelectedOption
