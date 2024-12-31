import { Menu } from 'antd'
import React from 'react'
import { Logo, LogoutButton, MenuItem, SidebarContainer, SidebarWrapper } from './styles';
import { WalletOutlined, LogoutOutlined } from '@ant-design/icons';
import LogoIcon from '../../assets/logo.svg';
import { DashboardIcon } from '../../assets/dashboard';
import ImageBox from '../image';


const Sidebar = () => {
    return (
        <SidebarWrapper>
            <SidebarContainer>
                <Logo>
                    <ImageBox src={LogoIcon} />
                </Logo>
                <Menu
                    mode="inline"
                    theme="dark"
                    style={{
                        backgroundColor: 'transparent',
                        width: '100%',
                        borderRight: 'none',
                    }}
                    defaultSelectedKeys={['1']}
                >
                    <MenuItem key="1" selected>
                        {/* <ImageBox src={DashboardIcon} style={{ fill: "red" }} /> */}
                        <DashboardIcon fill={"red"} />
                        Dashboard
                    </MenuItem>
                    <MenuItem key="2">
                        <WalletOutlined />
                        Top Wallet
                    </MenuItem>
                </Menu>
                <LogoutButton>
                    <LogoutOutlined />
                    Logout
                </LogoutButton>
            </SidebarContainer>
        </SidebarWrapper>
    )
}

export default Sidebar