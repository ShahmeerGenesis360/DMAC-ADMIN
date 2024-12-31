import { Input } from "antd";
import styled from "styled-components";

export const InputField = styled(Input)`
  &.ant-input-outlined {
    background: #ffffff08;
    border: none;
    border-radius: 30px;
    height: 42px;
    &:focus-within {
      box-shadow: none;
    }
    .ant-input {
      text-indent: 10px;
      &::placeholder {
        color: #ffffff4d;
      }
      color: #fff;
    }
  }
`;
