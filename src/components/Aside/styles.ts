import styled, { css } from "styled-components";

interface IContainerProps {
  menuIsOpen: boolean;
}

interface IThemeToggleFooterProps {
  menuIsOpen: boolean;
}

export const Container = styled.div<IContainerProps>`
  grid-area: AS;

  background-color: ${(props) => props.theme.colors.secundary};
  border-right: 1px solid ${(props) => props.theme.colors.gray};
  padding-left: 20px;

  position: relative;

  @media (max-width: 600px) {
    padding-left: 5px;
    position: fixed;
    z-index: 2;

    width: 150px;

    height: ${(props) => (props.menuIsOpen ? "100vh" : "70px")};
    overflow: hidden;

    ${(props) =>
      !props.menuIsOpen &&
      css`
        border: none;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray};
      `}
  }

  a {
    color: ${(props) => props.theme.colors.info};
    text-decoration: none;
    margin: 7px 0;
    transition: 0.5s;
    display: flex;
    align-items: center;

    &:hover {
      opacity: 0.7;
    }

    > svg {
      font-size: 18px;
      margin-right: 5px;
    }
  }
`;

export const LinkButton = styled.button`
  font-size: 16px;
  color: ${(props) => props.theme.colors.info};
  border: none;
  background: none;
  margin: 7px 0;
  transition: 0.5s;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

export const Header = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

export const LogImg = styled.img`
  height: 40px;
  width: 40px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.colors.white};
  margin-left: 10px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const MenuContainer = styled.nav`
  margin-top: 50px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

export const ToggleMenu = styled.button`

  display:none;
  
  @media(max-width: 600px){
  width: 40px;
  height: 40px;

  border-radius: 5px;
  font-size: 22px;
  background-color: ${(props) => props.theme.colors.warning};

  transition: opacity .3s;

  &:hover{
    opacity: 0.7;
  }

    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const ThemeToggleFooter = styled.footer<IThemeToggleFooterProps>`
  display: none;
  position: absolute;
  bottom: 30px;

  @media(max-width: 470px){
    display:  ${props => props.menuIsOpen ? 'flex' : 'none'};
  }

`
