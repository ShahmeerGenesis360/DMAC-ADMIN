import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import { InputField } from './styles'

interface IProps {
    placeholder: string
}

const TextField = ({ placeholder }: IProps) => {
    return (
        <InputField
            prefix={<SearchOutlined style={{ color: '#fff', fontSize: 20 }} />}
            placeholder={placeholder}
        />
    )
}

export default TextField