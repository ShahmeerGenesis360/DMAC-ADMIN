import React, { useEffect, useState } from 'react'
import type { MenuInfo } from 'rc-menu/lib/interface';
import { Logo, LogoutButton, SidebarContainer, SidebarWrapper, StyledMenu, Text } from './styles';
import LogoIcon from '../../assets/logo.svg';
import LogoutIcon from '../../assets/logout.svg';
import { DashboardIcon } from '../../assets/dashboard';
import { WalletIcon } from '../../assets/wallet';
import ImageBox from '../image';
import { useLocation, useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const [selected, setSelected] = useState('')
    const { pathname } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        setSelected(pathname.split('/')[1])
    }, [pathname])
    const handleChange = (value: MenuInfo) => {
        setSelected(value.key)
        navigate(value.key)
    }
    const menuItems = [
        {
            key: "",
            icon: <DashboardIcon fill={selected === "" ? "#242931" : "#fff"} />,
            label: <Text>Dashboard</Text>,
        },
        {
            key: "top-wallet",
            icon: <WalletIcon fill={selected === "top-wallet" ? "#242931" : "#fff"} />,
            label: <Text>Top Wallet</Text>,
        },
    ];
    return (
        <SidebarWrapper>
            <SidebarContainer>
                <Logo>
                    <ImageBox src={LogoIcon} />
                </Logo>
                <StyledMenu
                    mode="inline"
                    theme="dark"
                    style={{ background: "transparent" }}
                    selectedKeys={[selected]}
                    onClick={handleChange}
                    items={menuItems} // Use the `items` array to define menu items
                />
                <LogoutButton>
                    <ImageBox src={LogoutIcon} />
                    Logout
                </LogoutButton>
            </SidebarContainer>
        </SidebarWrapper>
    )
}

export default Sidebar