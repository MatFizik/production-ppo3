import { DownOutlined } from '@ant-design/icons';
import {Badge, Button, Dropdown, Form, Input, Modal, Select, Space, Table} from 'antd';
import {React, useEffect, useState} from 'react';
import {LineWave} from "react-loader-spinner";

const data = [];
const Sdata = [];
const Pdata = [];
let OperationObj = "";
let newRow = "";

const App = () => {
    const [IngridientData, setIngridientData] = useState([]);
    const [StockData, setStockData] = useState([]);
    const [ProductData, setProductData] = useState([]);
    
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    
    const [OperationIng, setOperationIng] = useState([]);

    const [openEdit, setOpenEdit] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
    const [RowData, setRowData] = useState({});

    const [isLoading, setLoading] = useState(true);
    
    const [form] = Form.useForm();
    
    const columns = [
        {
            title: 'Калибр',
            dataIndex: 'readyProduct',
            key: 'readyProduct',
        },
        {
            title: 'Сырье',
            dataIndex: 'feedstock',
            key: 'feedstock',
        },
        {
            title: 'Кол-во',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Action',
            dataIndex: 'edit',
            render: (_,record) =>
                IngridientData.length >= 1? (
                    <>
                        <Button type={"dashed"} onClick={() => handleEdit(record)}>
                            <p>Изменить</p>
                        </Button>
                    </>
                ): null,
        }
    ];

    const handleEdit = (record) => {
        form.setFieldsValue({})
        newRow = {
            Id: record.key,
            product : record.readyProduct,
            feedstock : record.feedstock,
            count : record.count,
        }
        console.log(record);
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
        console.log(values);
        OperationObj = {
            Id: RowData.Id,
            readyProductId : values.product,
            feedstockId : values.feedstock,
            count : values.count,
        }
        setOperationIng(OperationObj);
    }
    const NewDataEdit = (values) => {
        console.log(values);
        OperationObj = {
            Id: RowData.Id,
            readyProductId : values.product,
            feedstockId : values.feedstock,
            count : values.count,
        }
        console.log(RowData.product);
        setOperationIng(OperationObj);
    }
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
        await fetch("https://localhost:7171/Ingridient/AddIngridient",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(OperationIng)
            })
        window.location.reload()
    };

    const handleOkEdit = async () => {
        setConfirmLoadingEdit(true);
        setTimeout(() => {
            setOpenEdit(false);
            setConfirmLoadingEdit(false);
        }, 2000);
        await fetch("https://localhost:7171/Ingridient/EditIng",
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(OperationIng)
            })
            window.location.reload();
    };
    
    const handleCancel = () => {
        setOpen(false);
    };
    

    useEffect(()=>{
        setLoading(true);
        fetch('https://localhost:7171/Ingridient/GetIngridients',{
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
                        readyProduct: responseData[i].readyProduct.name,
                        feedstock: responseData[i].feedstock.name,
                        count: responseData[i].count
                    }
                }
                setIngridientData(data);
            });

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
                    Sdata[i] = {
                        value: responseData[i].id,
                        label: responseData[i].name,
                    }
                }
                setStockData(Sdata);
            });

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
                    Pdata[i] = {
                        value: responseData[i].id,
                        label: responseData[i].name,
                    }
                }
                setProductData(Pdata);
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
                dataSource={IngridientData}
            />
            <Button type="primary" id={"before-footer"} onClick={showModal}>
                Добавить составную часть
            </Button>
                </>
            }
            
            <Modal
                title="Добавление составных частей"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
            <div>
                <Form name="add-ing"
                      wrapperCol={{
                          span: 14,
                      }}
                      onValuesChange={(changedValues, values) => NewData(values)}
                      
                >
                    <Form.Item label={"Продукт"} name="product">
                        <Select  options={ProductData}>
                        </Select>
                    </Form.Item>
                    <Form.Item label={"Сырье"} name="feedstock">
                        <Select  options={StockData}>
                        </Select>
                    </Form.Item>
                    <Form.Item label={"Кол-во"}  name="count">
                        <Input/>
                    </Form.Item>
                </Form>
            </div>
        </Modal>

            <Modal
                title="Изменение составных частей"
                open={openEdit}
                onOk={handleOkEdit}
                confirmLoading={confirmLoadingEdit}
                onCancel={handleCancelEdit}
            >
                <div>
                    <Form name="edit-ing"
                          wrapperCol={{
                              span: 14,
                          }}
                          initialValues={RowData}
                          onValuesChange={(changedValues, values) => NewDataEdit(values)}
                    >
                        <Form.Item label={"Продукт"} name="product">
                            <Select  options={ProductData}>
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Сырье"} name="feedstock">
                            <Select  options={StockData}>
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Кол-во"}  name="count">
                            <Input/>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};
export default App;