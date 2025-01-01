import { Button } from "antd";
import styled from "styled-components";

export const StyledBtn = styled(Button)`
  &.ant-btn {
    text-align: left;
    border-radius: 0;
    min-width: 150px;
  }
  @media screen and (min-width: 1366px) and (max-width: 1600px) {
    min-width: 135px !important;
  }
  &.ant-btn-default {
    background-color: #78da89;
    border: 1px solid #78da89;
    color: #242931;
    font-weight: 500;
    padding: 0 12px;
    border-radius: 12px;
    &:hover {
      background-color: #8fe69e !important;
      color: #3b434f !important;
      border-color: #8fe69e !important;
    }
  }
  &.ant-btn-default {
    padding: 0 12px;
    &:disabled {
      background-color: #ffffff1a;
      border-color: transparent;
      > span {
        background-color: transparent;
        color: #828282;
      }
      &:hover {
        background-color: #ffffff1a !important;
        border-color: transparent !important;
        > span {
          background-color: transparent !important;
          color: #828282 !important;
        }
      }
    }
  }
`;
