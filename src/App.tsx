import { AiFillHome } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { LuListTodo } from "react-icons/lu";
import { BsGraphUpArrow } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";
import { useState } from "react";
import Background from "./components/Background";
import Dashboard from "./components/Dashboard";
import MobileNavigation from "./components/MobileNavigation";
import News from "./components/News";
import User from "./components/User";
import useMediaQuery from "./hooks/useMediaQuery";
import TodoList from "./components/TodoList";
import Cryptocurrency from "./components/Cryptocurrency";
import Settings from "./components/Settings";
import Content from "./components/Content";
import SettingsDesktopButton from "./components/SettingsDesktopButton";
import { Provider } from "react-redux";
import { store } from "./store/store";
import StartPage from "./components/StartPage";


function App() {
  const tabs = [
  {el: <User key="user" />, icon: <AiFillHome />},
  {el: <Cryptocurrency key="cryptocurrency" />, icon: <BsGraphUpArrow />},
  {el: <TodoList key="todo" />, icon: <LuListTodo />},
  {el: <News key="news" />, icon: <BsNewspaper/>},
  {el: <Settings key="settings" />, icon: <LuSettings />}];
  const [activeTab, setActiveTab] = useState([tabs[0].el]);
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  return (
    <Provider store={store}>
      <Background />
      <StartPage />
      <Content>
        <Dashboard>
          {isDesktop && tabs.map(tab => tab.el)}
          {!isDesktop && [...activeTab]}
        </Dashboard>
      </Content>
      {!isDesktop && <MobileNavigation tabs={tabs} onChangeTab={setActiveTab} />}
      {isDesktop && <SettingsDesktopButton />}
    </Provider>
  );
}

export default App;
