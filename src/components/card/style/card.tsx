import styled from "styled-components/macro";
import { COLORS } from "../../../utils/colors";
import { ICard } from "../interface";

export const Card = styled("div")<ICard>`
   background-color: ${COLORS.bg};
   margin: 0 auto;
   max-width: 700px;
   width: ${({ width }) => width};
   border-radius: 10px;
   padding: 1rem;
   padding-top: 3rem;
   padding-bottom: 2rem;
   display: flex;
   box-sizing: border-box;
   justify-content: ${({ justifyContent }) => justifyContent};
   margin-top: 3rem;
   flex-direction: column;
`;
