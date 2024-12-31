import { PaginationProps } from 'antd';
import React from 'react'
import { StyledPagination } from './styles'

interface IProps {
    currentPage: number
    total: number
    onChange: (page: number) => void
}

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
        return <a>Previous</a>;
    }
    if (type === 'next') {
        return <a>Next</a>;
    }
    return originalElement;
};

const Pagination = ({ currentPage, onChange, total }: IProps) => {
    return (
        <StyledPagination
            current={currentPage}
            total={total}
            pageSize={10}
            align="end"
            onChange={onChange}
            itemRender={itemRender}
        />
    )
}

export default Pagination