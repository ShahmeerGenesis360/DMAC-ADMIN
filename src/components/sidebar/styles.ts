import { Menu } from "antd";
import styled from "styled-components";

export const SidebarWrapper = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #1b1b1b;
`;

export const SidebarContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 10px;
`;

export const Logo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

export const MenuItem = styled(Menu.Item)<{ selected?: boolean }>`
  && {
    background-color: ${({ selected }) =>
      selected ? "#00ffcc" : "transparent"};
    border-radius: 20px;
    color: ${({ selected }) => (selected ? "#000" : "#fff")};
    font-weight: bold;
    margin: 10px 0;
  }
`;

export const LogoutButton = styled.div`
  margin-top: auto;
  width: 80%;
  padding: 10px 0;
  background-color: #ff4d4f;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
`;
