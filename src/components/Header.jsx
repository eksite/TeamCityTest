import React from "react";
import Styled from "styled-components";

const StyledHeader = Styled.header`
    display: flex;
    width: 100%;
    height: 75px;
    background-color: #121839;
`;

const StyledContainer = Styled.div`
    display: flex;
    width: 80%;
    margin: 0 auto;
`;

const StyledParagraph = Styled.p`
line-height: 26px;
color: #FFFFFF;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledContainer>
        <StyledParagraph>SPACE-X LAUNCHES 2021</StyledParagraph>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
