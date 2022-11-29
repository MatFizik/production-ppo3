import { DownOutlined } from '@ant-design/icons';
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
import {React, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {LineWave} from "react-loader-spinner";

const data = [];
const Mdata = [];
let OperationObj = "";
let newRow = "";

const App = () => {
    const location = useLocation();
    const [StaffData, setStaffData] = useState([]);
    const [OperationStock, setOperationStock] = useState([]);
    const [MeasureData, setMeasureData] = useState([]);
    
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [isLoading, setLoading] = useState(true);

    const [openEdit, setOpenEdit] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
    const [RowData, setRowData] = useState({});

    const [form] = Form.useForm();
    
    const columns = [
        {
            title: 'Сырье',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Кол-во',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: '',
            dataIndex: 'measure',
            key: 'measure',
        },
        {
            title: 'Сумма',
            dataIndex: 'sum',
            key: 'sum',
        },
        {
            title: 'Себестоимость',
            dataIndex: 'costPrice',
            key: 'costPrice',
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

    const NewData = (values) => {
        OperationObj = {
            Id: RowData.Id,
            name : values.name,
            measureId : values.measure1,
            count : values.count,
            sum : values.sum,
            CostPrice : values.CostPrice
        }
        setOperationStock(OperationObj)
    }
    
    const handleEdit = (record) => {
        form.setFieldsValue({})
        newRow = {
            Id: record.key,
            name : record.name,
            measure1 : record.measure,
            count : record.count,
            sum : record.sum,
            CostPrice : record.costPrice
        }
        setRowData(newRow);
        showModalEdit();
    };

    const showModalEdit = () => {
        setOpenEdit(true);
    };

    const handleCancelEdit = () => {
        window.location.reload();
        setOpenEdit(false);
    };
    
    const showModal = () => {
        setOpen(true);
    };
    
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
        fetch("https://localhost:7171/FeedStock/AddFeedStock",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(OperationStock)
            }).then(window.location.reload())
    };

    const handleOkEdit = () => {
        
        setConfirmLoadingEdit(true);
        setTimeout(() => {
            setOpenEdit(false);
            setConfirmLoadingEdit(false);
        }, 2000);
        fetch("https://localhost:7171/FeedStock/EditStock",
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(OperationStock)
            }).then(window.location.reload())
    };

    const handleCancel = () => {
        setOpen(false);
    };
    
    useEffect(()=>{
        setLoading(true);
        fetch('https://localhost:7171/FeedStock/GetFeedStock',{
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },})
            .then(function (response)
            {
                return response.json()
            })
            .then(function (responseData)
            {
                for (let i = 0;i < responseData.length;i++)
                {
                    data[i] = {
                        key: responseData[i].id,
                        name: responseData[i].name,
                        measure: responseData[i].measure.measure1,
                        count: responseData[i].count,
                        sum: responseData[i].sum,
                        costPrice: responseData[i].costPrice
                    }
                }
                setStaffData(data);
            });
        
        fetch('https://localhost:7171/Measure/GetMeasure', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (responseData) {
                for (let i = 0; i < responseData.length; i++) {
                    Mdata[i] = {
                        value: responseData[i].id,
                        label: responseData[i].measure1,
                    }
                }
                setMeasureData(Mdata);
            });
        setTimeout(() => {
            setLoading(false)
        }, 500);
    },[])

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
                        Добавить сырье
                    </Button> 
                </>
            }
            {/*Добавление*/}
            <Modal
                title="Добавление сырья"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div>
                    <Form name="add-stock"
                          wrapperCol={{
                              span: 14,
                          }}
                          onValuesChange={(changedValues, values) => NewData(values)}
                    >
                        <Form.Item label={"Название"} name="name">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Ед.измерения"} name="measure1">
                            <Select  options={MeasureData}>
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Кол-во"} name="count">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Общая сумма"} name="sum">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Себестоимость"} name="CostPrice">
                            <Input/>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            
            {/*Изменение*/}
            <Modal
                title="Изменение сырья"
                open={openEdit}
                onOk={handleOkEdit}
                confirmLoading={confirmLoadingEdit}
                onCancel={handleCancelEdit}
            >
            <Form name="edit-stock"
                  wrapperCol={{
                      span: 14,
                  }}
                  initialValues={RowData}
                  onValuesChange={(changedValues, values) => NewData(values)}
            >
                <Form.Item label={"Название"} name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label={"Ед.измерения"} name="measure1">
                    <Select  options={MeasureData}>
                    </Select>
                </Form.Item>
                <Form.Item label={"Кол-во"} name="count">
                    <Input/>
                </Form.Item>
                <Form.Item label={"Общая сумма"} name="sum">
                    <Input/>
                </Form.Item>
                <Form.Item label={"Себестоимость"} name="CostPrice">
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
};
export default App;