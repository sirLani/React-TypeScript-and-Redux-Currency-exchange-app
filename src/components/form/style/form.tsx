import styled from "styled-components/macro";
import { COLORS } from "../../../utils/colors";
import { RegularText } from "../../texts/style/text";
import { iInputProps, iInputGroupProp } from "../interface";

export const Base = styled.form`
   display: flex;
   flex-direction: column;
   width: 100%;
   align-items: center;
`;

export const InputGroup = styled("div")<iInputGroupProp>`
   border-radius: 10px;
   border: 1px solid #d9d9d9;
   color: #000;
   padding: 5px 20px;
   max-width: 500px;
   display: flex;
   background-color: ${COLORS.white};
   margin-bottom: 5px;
   justify-content: space-between;
   width: ${({ width }) => (width ? width : "100%")};
   align-items: center;
   @media (max-width: 478px) {
      width: inherit;
   }
   &:last-of-type {
      margin-bottom: 30px;
   }
   &:focus {
   }
`;

export const Input = styled("input")<iInputProps>`
   border: none;
   height: 40px;
   font-size: 16px;
   width: ${({ width }) => (width ? width : "80%")};
   text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
   &:focus {
      border: none;
      outline: none;
   }
   &::-webkit-outer-spin-button,
   &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
`;

export const Error = styled(RegularText)`
   color: ${COLORS.danger};
   text-align: right;
`;

export const InputContainer = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin-bottom: 12px;
`;

export const ErrorContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: flex-end;
   width: 80%;
`;

export const Selectoption = styled.select`
   border: none;
   height: 40px;
   font-size: 16px;
   background-color: ${COLORS.white};
   display: inline-block;
   box-sizing: border-box;
   padding: 0.5em 2em 0.5em 0.5em;
   font: inherit;
   line-height: inherit;
   -webkit-appearance: none;
   -moz-appearance: none;
   -ms-appearance: none;
   appearance: none;
   background-repeat: no-repeat;
   background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
      linear-gradient(135deg, currentColor 50%, transparent 50%);
   background-position: right 15px top 1em, right 10px top 1em;
   background-size: 5px 5px, 5px 5px;
   &:focus {
      border: none;
      outline: none;
   }
`;

export const Option = styled.option`
   // background-color: ${COLORS.bg};
`;
