import { Pagination } from "antd";
import styled from "styled-components";

export const StyledPagination = styled(Pagination)`
  &.ant-pagination {
    margin-top: 10px;

    .ant-pagination-item {
      border: none;
      line-height: 32px;
      background: transparent;
      a {
        border-radius: 34px;
        background: #242931;
        color: #fff;
      }
      .pagination-item-link {
        background-color: #242931;
      }
    }
    .ant-pagination-next {
      a {
        border: 1px solid #78da891a;
        border-radius: 34px;
        background: #0f0f0f;
        color: #78da89;
        padding: 4px 10px;
      }
    }
    .ant-pagination-prev {
      display: none;
    }
    .ant-pagination-item-active a {
      background: #78da89;
      color: #242931;
      border: none;
    }
    .ant-pagination-item-ellipsis {
      color: #fff !important;
    }
    .ant-pagination-options{
        display: none;
    }
  }
  &.ant-pagination
    .ant-pagination-jump-next
    .ant-pagination-item-container
    .ant-pagination-item-link-icon,
  &.ant-pagination
    .ant-pagination-jump-prev
    .ant-pagination-item-container
    .ant-pagination-item-link-icon {
    color: #fff;
  }
`;
