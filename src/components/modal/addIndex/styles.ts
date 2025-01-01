import { Modal, Input, Upload, Select } from "antd";
import styled from "styled-components";

const { TextArea } = Input;
// Styled components
export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: #242931;
    border-radius: 8px;
  }
  .ant-modal-header {
    background: #242931;
    border-bottom: none;
  }
  .ant-modal-title {
    color: #828282;
  }
  .ant-modal-footer {
    display: none;
  }
`;

export const StyledInput = styled(Input)`
  background: #ffffff0d;
  border: 1px solid #ffffff63;
  border-radius: 8px;
  color: #828282;
  padding: 12px;
  font-size: 14px;

  ::placeholder {
    color: #828282 !important; /* Placeholder color */
  }
  .ant-input-suffix {
    color: #828282;
  }
  &:focus,
  &:hover {
    background: #ffffff0d; /* Background color on focus */
    color: #828282; /* Optional: add a border color if you want */
  }
`;

export const StyledTextArea = styled(TextArea)`
  background: #ffffff0d;
  border: 1px solid #ffffff63;
  border-radius: 8px;
  color: #828282;
  font-size: 14px;

  &::placeholder {
    color: #828282;
  }
`;

export const StyledUpload = styled(Upload.Dragger)`
  .ant-upload {
    background: #ffffff0d !important;
    border: 1px dashed #828282;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    color: #828282;
  }
  &.ant-upload-wrapper .ant-upload-drag {
    background: #ffffff0d !important;
  }
  .ant-upload .ant-upload-drag:hover {
    border-color: #ffffff0d;
  }
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    background: #ffffff0d !important;
    border: none !important;
    border-radius: 8px !important;
    color: #828282 !important;
    height: 40px !important;
    display: flex;
    align-items: center;
  }

  .ant-select-arrow {
    color: #828282;
  }
`;
