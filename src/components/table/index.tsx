import React from 'react'
import { StyledTable } from './styles'

interface IProps {
    columns: any[]
    dataSource: any[]
}

const Table = ({ columns, dataSource }: IProps) => {
    return (
        <StyledTable
            columns={columns}
            dataSource={dataSource}
            pagination={false}
        />
    )
}

export default Table