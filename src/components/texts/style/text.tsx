import styled from "styled-components/macro";
import { iTextTypeprop } from "../interface";

export const RegularText = styled("p")<iTextTypeprop>`
   color: ${({ color }) => (color ? color : "#000000")};
   font-weight: ${({ fontWeight }) => fontWeight};
   text-align: ${({ textAlign }) => textAlign};
   margin-bottom: ${({ marginBottom }) => marginBottom};
`;

export const BoldText = styled(RegularText)<iTextTypeprop>`
   color: ${({ color }) => (color ? color : "#000000")};
   font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "bold")};
   text-align: ${({ textAlign }) => textAlign};
   margin-bottom: ${({ marginBottom }) => marginBottom};
`;
