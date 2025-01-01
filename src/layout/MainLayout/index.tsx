import { Flex } from 'antd';
import React from 'react'
import { Sidebar } from '../../components'
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <Flex style={{ overflow: 'hidden' }}>
            <Sidebar />
            <Outlet />
        </Flex>
    )
}

export default MainLayout