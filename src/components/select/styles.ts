import { Select } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const StyledSelect = styled(Select)`
  &.ant-select,
  &.ant-select-outlined,
  &.ant-select-focused {
    width: 100%;
    &:hover .ant-select-selector {
      border-color: #ffffff63 !important;
      box-shadow: none !important;
    }
    .ant-select-selector {
      background: #ffffff0d;
      border-color: #ffffff63 !important;
      box-shadow: none !important;
      border: 1px solid #ffffff63 !important;
      padding: 15px 12px;
      border-radius: 20px;
      font-weight: 500;
      color: #828282;
    }
    .ant-select-arrow {
      color: #fff;
      inset-inline-end: 15px;
      font-size: 18px;
    }
    .ant-select-selection-placeholder {
      color: #828282;
      font-size: 16px;
      font-weight: 500;
    }
    .ant-select-selection-item {
      background: #ffffff12;
      border-radius: 20px;
      padding-inline-start: 4px;
      padding-inline-end: 7px;
      height: 36px;
      align-items: center;
      color: #828282;
    }
    .ant-select-selection-item-remove {
      color: #828282;
      font-size: 14px;
      padding-left: 5px;
      &:hover {
        color: #fff;
      }
    }
  }
`;

export const DropdownOptions = createGlobalStyle`
.ant-select-dropdown{
    color: #fff;
}
  .ant-select-dropdown .ant-select-item-option-selected {
    font-weight: 400;
    background-color: #ffffff0d !important;
    border-radius: 20px;
    color: #fff !important;
  }
`;
