import React from 'react';

import { Card, Button, Layout, Form, Row, Col } from '@douyinfe/semi-ui';

import { Link, Outlet } from "react-router-dom";

import AppHeader from "../../components/header";

export default function LibraryApp() {

    const { Header, Footer, Content, Sider } = Layout;

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Layout>
                <Content>
                    <div className={'grid'}>
                        <Row type={'flex'} justify={'center'}>
                            <Col span={20}>
                                <Outlet />
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )

}