import styled from "styled-components";

const Navigation = styled.nav`
  width: 100%;
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

type MobileNavigationProps = {
  tabs: {
    el: JSX.Element;
    icon: JSX.Element;
  }[];
  onChangeTab: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
};

const MobileNavigation = ({ tabs, onChangeTab }: MobileNavigationProps) => {
  return (
    <Navigation>
      <Menu>
        {tabs.map((tab, i) => (
          <MenuItem key={i} onClick={() => onChangeTab([tab.el])}>
            {tab.icon}
          </MenuItem>
        ))}
      </Menu>
    </Navigation>
  );
};

export default MobileNavigation;
