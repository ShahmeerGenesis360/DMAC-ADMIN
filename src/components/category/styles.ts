import { Select } from "antd";
import styled from "styled-components";

export const StyledSelect = styled(Select)`
  &.ant-select,
  &.ant-select-single,
  &.ant-select-outlined,
  &.ant-select-focused {
    height: 60px;
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
      font-weight: 400;
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
      font-weight: 400;
    }
    .ant-select-selection-item {
      background: transparent;
    //   border-radius: 20px;
      padding-inline-start: 4px;
      padding-inline-end: 7px;
      align-items: center;
      color: #828282;
      font-weight: 500;
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

export const DropdownOptions = styled.div`
  overflow-y: scroll;
//   height: 310px;
  padding: 20px;
  border: 1px solid #ffffff63;
  background: #ffffff0d;
  border-radius: 20px;
  &::-webkit-scrollbar {
    display: none;
}
`;

export const DropdownOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 4px;
  border-bottom: 1px solid #333;
  cursor: pointer;
  &:hover {
    background: #ffffff63;
    border-radius: 100px;
  }
`;

export const Text = styled.span`
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
`;
