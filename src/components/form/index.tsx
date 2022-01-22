import React from "react";
import {
   Base,
   InputGroup,
   Input,
   InputContainer,
   ErrorContainer,
   Error,
} from "./style/form";
import { iFormBaseProps, iInputProps } from "./interface";

export const Form: React.FC<iFormBaseProps> = ({ children }) => {
   return <Base>{children}</Base>;
};

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
   ...restProps
}) => {
   return (
      <InputContainer>
         <InputGroup>
            {leftComponent}

            <Input
               {...restProps}
               placeholder={placeholder}
               onChange={onChange}
               width={width}
               textAlign={textAlign}
               type={type}
               value={value}
               name={name}
            />
            {rightComponent}
         </InputGroup>
         <ErrorContainer>
            <Error>{error}</Error>
         </ErrorContainer>
      </InputContainer>
   );
};
