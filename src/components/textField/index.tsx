import { SearchOutlined } from '@ant-design/icons'
import { InputProps } from 'antd'
import React from 'react'
import { InputField } from './styles'

const TextField = ({ placeholder, ...rest }: InputProps) => {
    return (
        <InputField
            prefix={<SearchOutlined style={{ color: '#fff', fontSize: 20 }} />}
            placeholder={placeholder}
            {...rest}
        />
    )
}

export default TextField