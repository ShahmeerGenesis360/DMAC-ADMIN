import { Table } from "antd";
import styled from "styled-components";

export const StyledTable = styled(Table)`
  background: transparent;
  .ant-table-thead > tr > th {
    background: #1b1b1b;
    font-size: 14px;
    color: #fff;
    font-weight: 600;
    border-bottom: none;
    &::before {
      display: none;
    }
  }
  .ant-table-tbody > tr > td {
    font-size: 14px;
    color: #fff;
    font-weight: 400;
    background: #0f0f0f;
    border-bottom: none;
    padding: 12px;
  }
  .ant-table-tbody > tr > .ant-table-cell-row-hover {
    font-size: 14px;
    color: #0f0f0f;
    font-weight: 400;
    background: #fff;
    border-bottom: none;
  }
  .ant-table {
    border: 1px solid #ffffff1a;
    border-radius: 8px;
    overflow: hidden;
  }
  .ant-table-pagination {
    background: #000;
  }
  .ant-empty-normal {
    margin-block: 150px;
`;
