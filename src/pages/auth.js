import React from 'react';

import { Card, Button } from '@douyinfe/semi-ui';
import { Form } from '@douyinfe/semi-ui';

import axios from 'axios'

export default function Auth() {

    const [ username, setUsername ] = React.useState('')

    const submitEmbyRegister = () => {
        axios.post( process.env.REACT_APP_EMBY_URL + '/Users/New', {
            "Name": username
        }, {
            headers: {
                "X-Emby-Token": process.env.REACT_APP_EMBY_TOKEN
            }
        }).then((res) => {
            if (res.status === 200) {
                submitEmbyRegisterPolicy(res.data.Id)
            } else {
                alert("注册失败。")
            }
        })
    }

    const submitEmbyRegisterPolicy = (userID) => {
        console.log(userID)
        axios.post( process.env.REACT_APP_EMBY_URL + '/Users/' + userID + '/Policy', {
            "IsHidden": true,
            "IsHiddenRemotely": true,
            "EnableContentDownloading": false,
            "EnableSubtitleDownloading": false,
            "BlockedMediaFolders": process.env.REACT_APP_EMBY_BLOCKED_MEDIA_FOLDERS
        }, {
            headers: {
                "X-Emby-Token": process.env.REACT_APP_EMBY_TOKEN
            }
        }).then((res) => {
            if (res.status === 204) {
                RedirectPage()
            } else {
                alert("更新用户Policy失败。")
            }
        })
    }

    const RedirectPage = () => {
        React.useEffect(() => {
            window.location.replace( process.env.REACT_APP_EMBY_URL )
        }, [])
    }

    const styleCenter = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }

    return (
        <div style={styleCenter}>
            <Card>
                <h1>注册<span style={{ color: process.env.REACT_APP_COLOR }}> Nyamedia Emby Service</span></h1>
                <Form layout='vertical'>
                    <Form.Input field='username' label='用户名' onChange={(e) => setUsername(e)}/>
                    <Button type="primary" htmlType="submit" className="btn-margin-right" style={{margin: '0 auto', width: '100%'}} onClick={() => submitEmbyRegister()}>注册</Button>
                    <br/><br/>
                    <span>请注意：注册完成后会自动跳转，请修改您的账户密码（默认为空密码）。</span>
                </Form>
            </Card>
        </div>
    )

}