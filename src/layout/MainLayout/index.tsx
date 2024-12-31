import { Flex } from 'antd';
import React from 'react'
import { Sidebar } from '../../components'
// import { Outlet } from 'react-router-dom';
import { TopWallet } from '../../pages';

const MainLayout = () => {
    return (
        <Flex style={{ overflow: 'hidden' }}>
            <Sidebar />
            <TopWallet />
            {/* <Outlet /> */}
        </Flex>
    )
}

export default MainLayout