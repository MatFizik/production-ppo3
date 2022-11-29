import { DownOutlined,ExclamationCircleFilled  } from '@ant-design/icons';
import {Badge, Button, Dropdown, Form, Input, Modal, Select, Space, Table} from 'antd';
import {React, useEffect, useState} from 'react';
import {LineWave} from "react-loader-spinner";

const data = [];
const Mdata = [];
let OperationObj = "";
let newRow = "";

const App = () => {
    const [ProductData, setProductData] = useState([]);
    const [MeasureData, setMeasureData] = useState([]);

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [OperationProduct, setOperationProduct] = useState([]);

    const [openEdit, setOpenEdit] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
    const [RowData, setRowData] = useState({});

    const [isLoading, setLoading] = useState(true)

    const [form] = Form.useForm();
    
    const columns = [
        {
            title: 'Калибр',
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
            title: 'Action',
            dataIndex: 'action',
            render:(_,record) =>
                ProductData.length >= 1? (
                    <Button onClick={() => handleEdit(record)} type="dashed">
                        <p>
                            Изменить
                        </p>
                    </Button>
                ) : null,
        }
    ];

    const handleEdit = (record) => {
        form.setFieldsValue({})
        newRow = {
            Id: record.key,
            name : record.name,
            count : record.count,
            measure1 : record.measure,
            sum : record.sum
        }
        setRowData(newRow);
        showModalEdit();
    };

    const showModalEdit = () => {
        setOpenEdit(true);
    };

    const handleCancelEdit = () => {
        setOpenEdit(false);
        window.location.reload()
    };


    const NewData = (values) => {
        OperationObj = {
            Id: RowData.Id,
            name : values.name,
            measureId : values.measure1,
            count : values.count,
            sum : values.sum
        }
        setOperationProduct(OperationObj);
    }
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        console.log(OperationProduct)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
        fetch("https://localhost:7171/ReadyProduct/AddProduct",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(OperationProduct)
            }).then(window.location.reload())
    };

    const handleOkEdit = () => {
        console.log(OperationProduct)
        setConfirmLoadingEdit(true);
        setTimeout(() => {
            setOpenEdit(false);
            setConfirmLoadingEdit(false);
        }, 2000);
        fetch("https://localhost:7171/ReadyProduct/EditProduct",
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(OperationProduct)
            }).then(window.location.reload())
    };

    const handleCancel = () => {
        setOpen(false);
        window.location.reload()
    };
    
    useEffect(()=>{
        setLoading(true);
        fetch('https://localhost:7171/ReadyProduct/GetReadyProduct',{
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
                        count: responseData[i].count,
                        measure: responseData[i].measure.measure1,
                        sum: responseData[i].sum,
                        ingr:[]
                    }
                }
                setProductData(data);
            });
        fetch('https://localhost:7171/ReadyProduct/GetIngrProduct',{
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },})
            .then(function (response)
            {
                return response.json()
            })
            .then(function (responseData)
            {
                for (let k = 0;k < data.length;k++) {
                    for (let i = 0; i < responseData.length; i++) {
                        if(data[k].key == responseData[i].readyProductId)
                        {
                            data[k].ingr[i] = {
                                key: responseData[i].id,
                                readyProductId: responseData[i].readyProductId,
                                feedstock: responseData[i].feedstock.name,
                                count: responseData[i].count,
                            }   
                        }
                    }
                }
                setProductData(data);
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
    
    
    
    const expandedRowRender = (ProductData) => {
        const columns = [
            {
                title: 'Материал',
                dataIndex: 'feedstock',
                key: 'feedstock',
            },
            {
                title: 'Кол-во',
                dataIndex: 'count',
                key: 'count',
            },
        ];
        return <Table columns={columns} dataSource={ProductData.ingr} pagination={false} />;
    };
    
    
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
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ['0'],
                }}
                dataSource={ProductData}
            />

            <Button type="primary" id={"before-footer"} onClick={showModal}>
               <p> 
                   Добавить калибр
               </p>
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
                    <Form
                        name="add-product"
                        wrapperCol={{
                            span: 14,
                        }}
                        onValuesChange={(changedValues, values) => NewData(values)}
                    >
                        <Form.Item label={"Калибр"} name="name">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Ед.измерения"} name="measure1">
                            <Select  options={MeasureData}>
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Кол-во"} name="count">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Сумма"} name="sum">
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
                <Form 
                    name="edit-product"
                      wrapperCol={{
                          span: 14,
                      }}
                      initialValues={RowData}
                      onValuesChange={(changedValues, values) => NewData(values)}
                >
                    <Form.Item label={"Калибр"} name="name">
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"Ед.измерения"} name="measure1">
                        <Select  options={MeasureData}>
                        </Select>
                    </Form.Item>
                    <Form.Item label={"Кол-во"} name="count">
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"Сумма"} name="sum">
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default App;

