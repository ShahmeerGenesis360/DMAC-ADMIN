import { Form, Input } from "antd";
import styled from "styled-components";

export const LoginContainer = styled.div`
  background: #0F0F0F;
  height: 100vh;
  width: 100vw;
`;

export const LoginWrapper = styled(Form)`
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  .ant-btn-default {
    width: 100%;
    padding: 25px 12px;
  }
`;

export const StyledInput = styled(Input)`
  &.ant-input-affix-wrapper-focused,
  &.ant-input-outlined,
  > .ant-input {
    background: #ffffff0d;
    border: 1px solid #ffffff63;
    border-radius: 20px;
    color: #828282;
    padding: 15px 12px;
    font-size: 16px;
    font-weight: 500;
  }

  &::placeholder {
    color: #828282 !important; /* Placeholder color */
  }
  .ant-input-suffix {
    width: 65px;
    background: #ffffff1a;
    border-radius: 36px;
    padding: 0 5px;
    .ant-input-show-count-suffix {
      color: #ffffff66;
      font-size: 14px;
      font-weight: 500;
      width: 100%;
      text-align: center;
    }
  }
  &:focus,
  &:hover,
  &:focus-within {
    border-color: #ffffff63;
    background: #ffffff0d; /* Background color on focus */
    color: #828282; /* Optional: add a border color if you want */
    box-shadow: none;
  }
`;

export const StyledPassword = styled(Input.Password)`
  &.ant-input-affix-wrapper-focused,
  &.ant-input-outlined,
  > .ant-input {
    background: #ffffff0d;
    border: 1px solid #ffffff63;
    border-radius: 20px;
    color: #828282;
    padding: 15px 12px;
    font-size: 16px;
    font-weight: 500;
  }

  ::placeholder {
    color: #828282 !important; /* Placeholder color */
  }
  .ant-input-suffix {
    background: #ffffff1a;
    border-radius: 36px;
    padding: 0 5px;
    .ant-input-show-count-suffix {
      color: #ffffff66;
      font-size: 14px;
      font-weight: 500;
      width: 100%;
      text-align: center;
    }
  }
  &:focus,
  &:hover,
  &:focus-within {
    border-color: #ffffff63;
    background: #ffffff0d; /* Background color on focus */
    color: #828282; /* Optional: add a border color if you want */
    box-shadow: none;
  }
`;
