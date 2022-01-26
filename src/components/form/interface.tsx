export interface iFormBaseProps {
  // children?: undefined;
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
}

export interface iInputGroupProp {
  width?: number
}
