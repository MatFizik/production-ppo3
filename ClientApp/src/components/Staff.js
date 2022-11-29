import {DownOutlined} from '@ant-design/icons';
import {
    Badge,
    Dropdown,
    Space,
    Table,
    Button,
    Cascader,
    Form,
    Input,
    Select,
    Modal,
    InputNumber
} from 'antd';
import {React, useEffect, useState, useRef} from 'react';
import {LineWave} from "react-loader-spinner";


const data = [];
const PData = [];
let StaffObj = "";
let newRow = "";

const App = () => {
    const [open, setOpen] = useState(false);
    const [StaffData, setStaffData] = useState([]);
    const [PostsData, setPostsData] = useState([]);
    const [OperationStaff, setOperationStaff] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
    const [RowData, setRowData] = useState({});

    const [isLoading, setLoading] = useState(true);

    const [form] = Form.useForm();


    const columns = [
        {
            title: 'Ф.И.О',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Должность',
            dataIndex: 'postId',
            key: 'postId',
        },
        {
            title: 'Оклад',
            dataIndex: 'salary',
            key: 'salary',
        },
        {
            title: 'Адрес',
            dataIndex: 'adress',
            key: 'adress',
        },
        {
            title: 'Номер телефона',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            dataIndex: 'edit',
            render: (_,record) =>
                StaffData.length >= 1 ? (
                    <>
                        <Button  type="dashed" onClick={() => handleEdit(record)}>
                            <p>Изменить</p>
                        </Button>
                    </>
                ) : null,
        }

    ];

    const handleEdit = (record) => {
        form.setFieldsValue({})
        newRow = {
            Id: record.key,
            fullname: record.fullname,
            post1: record.postId,
            salary: record.salary,
            adress: record.adress,
            phoneNumber:record.phone
        }
        setRowData(newRow);
        showModalEdit();
    };

    const showModalEdit = () => {
        setOpenEdit(true);
    };

    const handleCancelEdit = () => {
        setOpenEdit(false);
    };

    const NewData = (values) => {
        StaffObj = {
            Id: RowData.Id,
            fullName : values.fullname,
            postId : values.post1,
            salary : values.salary,
            adress : values.adress,
            phoneNumber : values.phoneNumber
        }
        setOperationStaff(StaffObj);
    }

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        console.log(OperationStaff)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
        fetch("https://localhost:7171/Staff/AddStaff",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(OperationStaff)
            }).then(window.location.reload())
    };

    const handleOkEdit = () => {
        console.log(OperationStaff)
        setConfirmLoadingEdit(true);
        setTimeout(() => {
            setOpenEdit(false);
            setConfirmLoadingEdit(false);
        }, 2000);
        fetch("https://localhost:7171/Staff/EditStaff",
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(OperationStaff)
            }).then(window.location.reload())
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        fetch('https://localhost:7171/Staff/GetStaff', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (responseData) {
                for (let i = 0; i < responseData.length; i++) {
                    data[i] = {
                        key: responseData[i].id,
                        fullname: responseData[i].fullName,
                        salary: responseData[i].salary,
                        postId: responseData[i].post.post1,
                        adress: responseData[i].adress,
                        phone: responseData[i].phoneNumber,
                    }
                }
                setStaffData(data);
            });

        fetch('https://localhost:7171/Post/GetPosts', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (responseData) {
                for (let i = 0; i < responseData.length; i++) {
                    PData[i] = {
                        value: responseData[i].id,
                        label: responseData[i].post1,
                    }
                }
                setPostsData(PData);
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
                        dataSource={StaffData}
                    />
                    <Button type="primary" id={"before-footer"} onClick={showModal}>
                        <p>Добавить работника</p>
                    </Button>
                </>
            }
            <Modal
                title="Добавление работника"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div>
                    <Form name="add-staff"
                          wrapperCol={{
                              span: 14,
                          }}
                          onValuesChange={(changedValues, values) => NewData(values)}
                          form={form}
                    >
                        <Form.Item label={"Имя"} name="fullname">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Должность"} name="post1">
                            <Select options={PostsData}>
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Оклад"} name="salary">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Адрес"} name="adress">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Телефон"} name="phoneNumber">
                            <Input/>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>


            {/*Модальный для edit*/}
            <Modal
                title="Изменение"
                open={openEdit}
                onOk={handleOkEdit}
                confirmLoading={confirmLoadingEdit}
                onCancel={handleCancelEdit}
            >
                <div>
                    <Form
                        name="edit-staff"
                        wrapperCol={{
                            span: 14,
                        }}
                        initialValues={RowData}
                        onValuesChange={(changedValues, values) => NewData(values)}
                        form={form}
                    >
                        <Form.Item label={"Имя"} name="fullname">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Должность"} name="post1">
                            <Select options={PostsData}
                            >
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Оклад"} name="salary">
                            <Input />
                        </Form.Item>
                        <Form.Item label={"Адрес"} name="adress">
                            <Input />
                        </Form.Item>
                        <Form.Item label={"Телефон"} name="phoneNumber">
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};
export default App;