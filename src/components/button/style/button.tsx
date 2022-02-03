import styled from "styled-components/macro"
import { iButtonProps } from "../interface"

export const Button = styled("button")<iButtonProps>`
  width: ${({ width }) => width};
  max-width: 160px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#1C3C25"};
  border-radius: 10px;
  height: 46px;
  color: ${({ color }) => (color ? color : "#ffffff")};
  font-size: 16px;
  font-weight: bold;
  border: none;
  width: 100%;

  @media (max-width: 619px) {
    width: 100%;
  }
`
