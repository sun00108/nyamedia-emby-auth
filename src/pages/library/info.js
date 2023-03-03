import React, { Fragment } from 'react';

import {Card, Button, Table} from '@douyinfe/semi-ui';
import { Form } from '@douyinfe/semi-ui';

import axios from 'axios'
import { useParams } from "react-router-dom";

export default function LibraryAppInfo() {

    const [ libraryItemList, setLibraryItemList ] = React.useState([])

    const { libraryId } = useParams();

    const itemsColumn = [
        {
            title: '标题',
            dataIndex: 'Name',
        },
        {
            title: '类型',
            dataIndex: 'Type',
        },
        {
            title: '查看',
            dataIndex: 'Id',
            render: (text, record) => {
                return (
                    <Button type="primary" onClick={() => {
                        window.location.href = '/item/' + text
                    }}>查看</Button>
                )
            }
        }
    ]

    const fetchEmbyLibraryInfo = () => {
        axios.get( process.env.REACT_APP_EMBY_URL + '/Items?ParentId=' + libraryId, {
            headers: {
                "X-Emby-Token": process.env.REACT_APP_EMBY_TOKEN
            }
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                setLibraryItemList(res.data.Items)
            } else {
                alert("获取失败。")
            }
        })
    }

    React.useEffect(() => {
        fetchEmbyLibraryInfo()
    }, [])

    return (
        <Fragment>
            <h1>查看当前<span style={{ color: process.env.REACT_APP_COLOR }}> Nyamedia Emby Service</span> 媒体库</h1>
            <Card style={{ margin: '16 0' }}>
                <Table columns={itemsColumn} dataSource={libraryItemList} pagination={false} />
            </Card>
        </Fragment>
    )

}