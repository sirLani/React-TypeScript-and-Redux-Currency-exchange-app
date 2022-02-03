export interface iFormBaseProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  method?: string
}

export interface iInputProps {
  rightComponent?: React.ReactElement
  leftComponent?: React.ReactElement
  placeholder?: string
  label?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  width?: number
  error?: string
  textAlign?: string
  type?: string
  value?: string
  name?: string
  step?: string
  dataTest?: string
  htmlFor?: string
  labelText?: string
  id?: string
}

export interface iInputGroupProp {
  width?: number
}
