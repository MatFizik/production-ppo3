import {DownOutlined, ExclamationCircleFilled} from '@ant-design/icons';
import {Badge, Dropdown, Space, Table, Button, Modal, Form, Input, InputNumber, Popconfirm, Typography} from 'antd';
import {React, useEffect, useState} from 'react';
import {LineWave} from "react-loader-spinner";

const data = [];
let newRow;

const App = () => {
        const [open, setOpen] = useState(false);
        const [confirmLoading, setConfirmLoading] = useState(false);

        const [PostData, setPostData] = useState([]);
        const [newData, setNewData] = useState();

        const [openEdit, setOpenEdit] = useState(false);
        const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
        const [RowData, setRowData] = useState({Post1: ""});

        const [isLoading, setLoading] = useState(true);
    
        const columns = [
            {
                title: 'Должность',
                dataIndex: 'post',
                key: 'post',
            },
            {
                title: 'Action',
                dataIndex: 'edit',
                render: (_, record) =>
                    PostData.length >= 1 ? (
                        <>
                            <Button type={"dashed"} onClick={() => handleEdit(record)}>
                                <p>
                                    Изменить
                                </p>
                            </Button>
                        </>
                    ) : null,
            }
        ];
        const NewData = (value) => {
            console.log(value.target.value);
            setNewData(value.target.value);
        }

        const handleEdit = (record) => {
            console.log(record)
            newRow = {
                Id: record.key,
                Post1: record.post
            }
            setRowData(newRow);
            showModalEdit();
        };

        const showModalEdit = () => {
            setOpenEdit(true);
        };

        const showModal = () => {
            setOpen(true);
        };
        const handleOk = () => {
            var object = {
                post1: newData
            }
            setConfirmLoading(true);
            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
            }, 2000);
            fetch("https://localhost:7171/Post/AddPost",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(object)
                })
            window.location.reload();
        };

        const handleOkEdit = () => {
            var object = {
                id: RowData.Id,
                post1: newData
            }
            setConfirmLoadingEdit(true);
            setTimeout(() => {
                setOpenEdit(false);
                setConfirmLoadingEdit(false);
            }, 2000);
            fetch("https://localhost:7171/Post/EditPost",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(object)
                }).then(window.location.reload())
        };

        const handleCancelEdit = () => {
            setOpenEdit(false);
        };

        const handleCancel = () => {
            console.log('Clicked cancel button');
            setOpen(false);
        };

        useEffect(() => {
            setLoading(true);
            fetch('https://localhost:7171/Post/GetPosts', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                }
            })
                .then(function (response) {
                    return response.json()
                })
                .then(function (responseData) {
                    for (let i = 0; i < responseData.length; i++) {
                        data[i] = {
                            key: responseData[i].id,
                            post: responseData[i].post1,
                        }
                    }
                    setPostData(data);
                });
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }, [])

        return (
            <>
                {isLoading ?
                    <div className={"loader__wrapp"}>
                        <LineWave
                            height="200"
                            width="200"
                            ariaLabel="line-wave"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            firstLineColor="#728D5E"
                            middleLineColor="#96A365"
                            lastLineColor="#728D5E"
                        />
                    </div>
                    :
                    <>
                        <Table
                            columns={columns}
                            dataSource={PostData}
                        />
                        <Button type="primary" id={"before-footer"} onClick={showModal}>
                            Добавить
                        </Button>
                    </>
                }
                <Modal
                    title="Добавление"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <Input
                        placeholder="Должность"
                        onChange={NewData}
                    />
                </Modal>

                {/*Модальный для edit*/}
                <Modal
                    title="Изменение"
                    open={openEdit}
                    onOk={handleOkEdit}
                    confirmLoading={confirmLoadingEdit}
                    onCancel={handleCancelEdit}
                >
                    <Input
                        placeholder="Должность" defaultValue={RowData.Post1}
                        onChange={NewData}
                    />
                </Modal>
            </>
        );
    }
;
export default App;