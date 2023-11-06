import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { LuListTodo } from "react-icons/lu";
import { BsNewspaper } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";

const Navigation = styled.nav`
  width: 100vw;
  position: fixed;
  bottom: 0;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  overflow-x: auto;
  background-color: #b5b5b5;
`;

const MenuItem = styled.li`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 0 15px;
  border-right: 1px solid black;
  font-size: 1.5rem;
  cursor: pointer;
  &:nth-last-child(1) {
    border-right: none;
  }
`;

const MobileNavigation = () => {
  return (
    <Navigation>
      &nbsp;
      <Menu>
        <MenuItem>
          <AiFillHome />
        </MenuItem>
        <MenuItem>
          <LuListTodo />
        </MenuItem>
        <MenuItem>
          <BsNewspaper />
        </MenuItem>
        <MenuItem>
          <BsGraphUpArrow />
        </MenuItem>
        <MenuItem>
          <BsCoin />
        </MenuItem>
        <MenuItem>
          <LuSettings />
        </MenuItem>
      </Menu>
    </Navigation>
  );
};

export default MobileNavigation;
