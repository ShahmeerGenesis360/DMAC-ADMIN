import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import { InputField } from './styles'

const TextField = () => {
    return (
        <InputField
            prefix={<SearchOutlined style={{ color: '#fff', fontSize: 20 }} />}
            placeholder="Search Your Wallet"
        />
    )
}

export default TextField