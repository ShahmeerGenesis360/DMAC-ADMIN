import { Menu } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const CustomModalStyle = createGlobalStyle`
  .custom-modal {
    width: 600px !important;
  }
  .custom-modal .ant-modal-content {
    background: #242931;
    color: #fff;
    border-radius: 15px;
    padding: 40px;
  }

  .custom-modal .ant-modal-confirm-content{
    color: #fff;
    text-align:center;
    font-size: 16px;
    font-weight: 500;
  }

  .custom-modal .ant-modal-confirm-btns {
    margin-top: 25px;
  }

  .custom-modal .ant-btn-default,.ant-btn-primary {
    width: calc(50% - 4px);
    padding: 22px 20px;
    font-size: 16px;
    font-weight: 600;
  }

  .custom-modal {
   .ant-btn-default,.ant-btn-default:hover {
    border: 1px solid #FFFFFF !important;
    background-color: transparent !important;
    color: #fff !important;
    }
  }

  .custom-modal {
   .ant-btn-primary, .ant-btn-primary:hover {
    border: 1px solid #E87975 !important;
    background-color: #E87975 !important;
    color: #fff;
    }
  }
`;

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

export const StyledMenu = styled(Menu)`
  &.ant-menu {
    .ant-menu-item {
      background-color: transparent;
      border-radius: 20px;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      min-height: 45px;
      gap: 8px;
      margin: 10px 0;
      .ant-menu-title-content {
        display: contents;
      }

      &.ant-menu-item:not(.ant-menu-item-selected):hover {
        background-color: #78da8980 !important;
      }
      &.ant-menu-item-selected {
        background-color: #78da89;
        color: #242931;
      }
    }
  }
`;

export const Text = styled.div``;

export const LogoutButton = styled.div`
  margin-top: auto;
  width: 100%;
  padding: 10px;
  background-color: rgba(232, 121, 117, 0.05);
  border-radius: 50px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: #e87975;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
`;
