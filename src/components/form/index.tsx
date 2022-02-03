import React from "react"
import {
  Base,
  InputGroup,
  Input,
  InputContainer,
  ErrorContainer,
  Error,
} from "./style/form"
import { iFormBaseProps, iInputProps } from "./interface"

export const Form: React.FC<iFormBaseProps> = ({ children, onSubmit }) => {
  return <Base onSubmit={(e) => onSubmit(e)}>{children}</Base>
}

export const FormInput: React.FC<iInputProps> = ({
  rightComponent,
  placeholder,
  label,
  onChange,
  width,
  leftComponent,
  error,
  textAlign,
  type,
  value,
  name,
  step,
  dataTest,
  htmlFor,
  labelText,
  id,
  ...restProps
}) => {
  return (
    <>
      <InputContainer>
        <label htmlFor={htmlFor}>{labelText}</label>
        <InputGroup>
          {leftComponent}
          <Input
            data-test="input-box"
            placeholder={placeholder}
            onChange={(e: any) => onChange(e)}
            width={width}
            textAlign={textAlign}
            type={type}
            value={value}
            name={name}
            id={id}
            step={step}
            {...restProps}
          />
          {rightComponent}
        </InputGroup>
        <ErrorContainer>
          <Error>{error}</Error>
        </ErrorContainer>
      </InputContainer>
    </>
  )
}
