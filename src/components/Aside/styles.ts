import styled from "styled-components";

export const Container = styled.div`
  grid-area: AS;

  background-color: ${(props) => props.theme.colors.secundary};
  border-right: 1px solid ${(props) => props.theme.colors.gray};
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
`;
export const Title = styled.h3`
  color: ${(props) => props.theme.colors.white};
  margin-left: 10px;
`;
export const MenuContainer = styled.nav`
  margin-top: 50px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;

`;
export const MenuItemLink = styled.a`
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
`;
