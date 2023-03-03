import React, { Fragment } from 'react';

import {Card, Button, Row, Col, Space, Modal} from '@douyinfe/semi-ui';
import { Form } from '@douyinfe/semi-ui';

import axios from 'axios'
import {Link} from "react-router-dom";

export default function LibraryAppIndex() {

    const { Option } = Form.Select;

    const [ libraryList, setLibraryList ] = React.useState([])

    const [ addModalVisible, setAddModalVisible ] = React.useState(false)

    const [ addComment, setAddComment ] = React.useState('')
    const [ addNFOID, setAddNFOID ] = React.useState(0)
    const [ addNFOSource, setAddNFOSource ] = React.useState('')
    const [ addLibraryID, setAddLibraryID ] = React.useState(0)

    const fetchEmbyLibrary = () => {
        axios.get( process.env.REACT_APP_EMBY_URL + '/Library/MediaFolders', {
            headers: {
                "X-Emby-Token": process.env.REACT_APP_EMBY_TOKEN
            }
        }).then((res) => {
            if (res.status === 200) {
                setLibraryList(res.data.Items)
            } else {
                alert("获取失败。")
            }
        })
    }

    const submitRequestAdd = () => {
        axios.post( process.env.REACT_APP_CLOUDFLARE_D1_WORKER_URL + '/api/requirements/create', {
            'comment': addComment,
            'nfo_id': addNFOID,
            'nfo_source': addNFOSource,
            'library_id': addLibraryID
        }).then((res) => {
            if (res.code != 500) {
                setAddModalVisible(false)
                setAddNFOSource('')
                setAddNFOID(0)
                setAddComment('')
                setAddLibraryID(0)
            } else {
                alert(res.data)
            }
        })
    }

    React.useEffect(() => {
        fetchEmbyLibrary()
    }, [])

    return (
        <Fragment>
            <h1>查看所有<span style={{ color: process.env.REACT_APP_COLOR }}> Nyamedia Emby Service</span> 媒体库</h1>
            <Row type={'flex'} justify={'center'} gutter={16} style={{ margin: '16 0' }}>
                {
                    libraryList.map((item) => {
                        return (
                            <Col xs={24} lg={6} style={{ margin: "0 0 16px 0"}}>
                                <Card title={item.Name}
                                      headerExtraContent={<Link to={'/library/' + item.Id}>查看全部</Link>}
                                      cover={
                                          <img alt={item.Id}
                                               src={ process.env.REACT_APP_EMBY_URL + "/emby/Items/" + item.Id + "/Images/Primary?tag=" + item.ImageTags.Primary}
                                          />
                                      }
                                      footerLine={ true }
                                      footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
                                      footer={
                                          <Space>
                                              <Button theme='solid' type='primary'
                                                      onClick={() => {
                                                          setAddLibraryID(item.Id)
                                                          setAddModalVisible(true)
                                                      }}>
                                                  增加请求
                                              </Button>
                                          </Space>
                                      }
                                >
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            <Modal title="新媒体内容请求" visible={addModalVisible} style={{ width: "350px" }}
                onOk={() => {
                    submitRequestAdd();
                }}
                onCancel={() => {
                    setAddLibraryID(0)
                    setAddNFOSource('')
                    setAddModalVisible(false)
                }}
                closeOnEsc={true}
            >
                新 媒体内容 请求 - {addLibraryID}
                <br />
                <Form layout="vertical">
                    <Form.Select field="nfo_source" label={'元数据信息站 ' + addNFOSource} onChange={(value) => setAddNFOSource(value)}>
                        <Option value="tmdb">TMDB</Option>
                        <Option value="bgmtv">BGM.TV</Option>
                        <Option value="none">无</Option>
                    </Form.Select>
                    <Form.Input
                        field="nfo_id"
                        label="元数据信息站ID"
                        onChange={(values) => setAddNFOID(values)}
                    />
                    <Form.Input field="comment" label="备注" onChange={(values) => setAddComment(values)} />
                </Form>
            </Modal>
        </Fragment>

    )

}