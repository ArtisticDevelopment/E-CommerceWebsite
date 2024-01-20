import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
height: 70px;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
    height: 100%;
     width: 70px;
padding: 0 15px; /* Adjusted padding */
`;

export const NavLinks = styled.div`
  width: 50%;
     height: 100%;
     display: flex;
     align-items: center;
     justify-content: flex-end;
    padding-top: 10px;
    padding-right: 10px;
`;

export const NavLink = styled(Link)`
      padding: 10px 15px;
      cursor: pointer;
      font-size: 20px;
      font-family: 'Roobik-Doodle-Shadow', 'Times New Roman', Times, serif; 
`;

