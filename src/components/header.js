import {Layout, Nav, Dropdown, Avatar, Button} from "@douyinfe/semi-ui";
import {IconHome, IconLive, IconSemiLogo, IconSetting} from "@douyinfe/semi-icons";
import React from "react";

export default function AppHeader() {

    const { Header } = Layout;

    return (
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
            <div>
                <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
                    <Nav.Header>
                        <IconSemiLogo style={{ fontSize: 36 }} />
                    </Nav.Header>
                    <Nav.Item link={"/"} itemKey="Auth" text="注册" icon={<IconHome size="large" />} />
                    <Nav.Item link={"/library"} itemKey="Library" text="媒体库" icon={<IconSetting size="large" />} />
                </Nav>
            </div>
        </Header>
    )

}
