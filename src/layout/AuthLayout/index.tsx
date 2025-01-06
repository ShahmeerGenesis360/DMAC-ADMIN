import { Flex } from 'antd';
import React from 'react'
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <Flex style={{ overflow: 'hidden' }}>
            <Outlet />
        </Flex>
    )
}

export default AuthLayout