// noinspection JSValidateTypes,JSCheckFunctionSignatures
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
    Radio, Tabs, Badge, Button, Dropdown, Form, Input, Modal, Select, Space, Table,
    Card, Col, Row, Statistic, DatePicker, ConfigProvider, theme
} from 'antd';
import {PropagateLoader} from "react-spinners";
import {LineWave} from "react-loader-spinner";

const Fdata = [];
const Pdata = [];
const DData = [];
const SData = [];
let OperationObj = "";
let newRow = "";
const reset = [];

const App = () => {
    const [RowData, setRowData] = useState({});
    const [PostData, setPostData] = useState({value: "", label: ""});
    const [DateData, setDateData] = useState({});
    const [StockData, setStockData] = useState({value: "", label: ""});
    const [budget, setBudget] = useState(false);

    const [open, setOpen] = useState(false);
    const [openSale, setOpenSale] = useState(false);
    const [openProd, setOpenProd] = useState(false);

    const [OperationProduct, setOperationProduct] = useState([]);
    const [SaleProductData, setSaleProductData] = useState([]);
    const [ProdProductData, setProdProductData] = useState([]);

    const [isLoading, setisLoading] = useState(true);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('false');

    const columns = [
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
            title: 'Сумма',
            dataIndex: 'sum',
            key: 'sum',
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Ответственный',
            dataIndex: 'staff',
            key: 'staff',
        }
    ];
    const columnsForSale = [
        {
            title: 'Калибр',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: 'Кол-во',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Сумма',
            dataIndex: 'sum',
            key: 'sum',
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Ответственный',
            dataIndex: 'staff',
            key: 'staff',
        }
    ];


    const handleClose = () => {
        setOpen(false);
        window.location.reload()
    };

    const handleCloseSale = () => {
        setOpenSale(false);
        window.location.reload()
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    const discriptionData = async (dates) => {
        await setDateData(reset);
        newRow = {
            date1: dates.date1.toJSON(),
            date2: dates.date2.toJSON()
        }
        await fetch("https://localhost:7171/PurchaseStock/GetPStockDate",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(newRow)
            }).then(function (response) {
            return response.json()
        })
            .then(function (responseData) {

                for (let i = 0; i < responseData.length; i++) {
                    DData[i] = {
                        key: responseData[i].id,
                        feedstock: StockData[responseData[i].feedstockId].label,
                        count: responseData[i].count,
                        sum: responseData[i].sum,
                        date: responseData[i].date,
                        staff: PostData[responseData[i].staffId].label
                    }
                }
                setDateData(DData);
            })
        setOpen(true);
    };


    const discriptionDataforSale = async (dates) => {
        await setDateData(reset);
        newRow = {
            date1: dates.date1.toJSON(),
            date2: dates.date2.toJSON()
        }
        await fetch("https://localhost:7171/SaleProduct/GetSaleDate",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(newRow)
            }).then(function (response) {
            return response.json()
        })
            .then(function (responseData) {

                for (let i = 0; i < responseData.length; i++) {
                    DData[i] = {
                        key: responseData[i].id,
                        productId: StockData[responseData[i].productId].label,
                        count: responseData[i].count,
                        sum: responseData[i].sum,
                        date: responseData[i].date,
                        staff: PostData[responseData[i].staffId].label
                    }
                }
                setDateData(DData);
            })
        setOpenSale(true);
    };
    
const discriptionDataforProd = async (dates) => {
        await setDateData(reset);
        newRow = {
            date1: dates.date1.toJSON(),
            date2: dates.date2.toJSON()
        }
        await fetch("https://localhost:7171/ProdProduct/GetProdDate",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(newRow)
            }).then(function (response) {
            return response.json()
        })
            .then(function (responseData) {

                for (let i = 0; i < responseData.length; i++) {
                    DData[i] = {
                        key: responseData[i].id,
                        productId: StockData[responseData[i].productId].label,
                        count: responseData[i].count,
                        sum: responseData[i].sum,
                        date: responseData[i].date,
                        staff: PostData[responseData[i].staffId].label
                    }
                }
                setDateData(DData);
            })
        setOpenSale(true);
    };


    const NewData = (values) => {
        OperationObj = {
            feedstockId: values.feedstock,
            count: values.count,
            sum: values.sum,
            date: values.date.toJSON(),
            staffId: values.post1
        }
        fetch("https://localhost:7171/PurchaseStock/AddPurchase",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(OperationObj)
            }).then(window.location.reload())
    }

    const NewDataforSale = (values) => {
        OperationObj = {
            productId: values.productId,
            sum: values.sum,
            date: values.date.toJSON(),
            count: values.count,
            staffId: values.post1,
        }
        fetch("https://localhost:7171/SaleProduct/AddSale",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(OperationObj)
            }).then(window.location.reload())
    }
    
    const NewDataforProd = (values) => {
        OperationObj = {
            productId: values.productId,
            sum: values.sum,
            date: values.date.toJSON(),
            count: values.count,
            staffId: values.post1,
        }
        fetch("https://localhost:7171/ProdProduct/AddProd",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(OperationObj)
            }).then(window.location.reload())
    }

    useEffect(() => {
        setisLoading(true);
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
                    Pdata[i] = {
                        value: responseData[i].id,
                        label: responseData[i].fullName
                    }
                }
                setPostData(Pdata);
            });

        fetch('https://localhost:7171/Budget/GetBudget', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (responseData) {
                for (let i = 0; i < responseData.length; i++) {
                    newRow = {
                        key: responseData[i].id,
                        budget: responseData[i].budget1,
                    }
                }
                setBudget(newRow);
            });

        fetch('https://localhost:7171/FeedStock/GetFeedStock', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (responseData) {
                for (let i = 0; i < responseData.length; i++) {
                    Fdata[i] = {
                        value: responseData[i].id,
                        label: responseData[i].name
                    }
                }
                setStockData(Fdata);
            });
        fetch('https://localhost:7171/SaleProduct/GetSaleProduct', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (responseData) {
                for (let i = 0; i < responseData.length; i++) {
                    SData[i] = {
                        value: responseData[i].id,
                        label: responseData[i].product.name
                    }
                }
                setSaleProductData(SData);

            });
        setTimeout(() => {
            setisLoading(false)
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
                    <div>
                        <Tabs tabPosition={"left"}>
                            <Tabs.TabPane tab="Статистика" key="item-1" className={"for-tables"}>
                                <div className="site-statistic-demo-card">
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Card>
                                                <Statistic
                                                    title="Текущий бюджет"
                                                    value={budget.budget}
                                                    valueStyle={{
                                                        color: '#3f8600',
                                                    }}
                                                />
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card>
                                                <Statistic
                                                    title="Idle"
                                                    value={9.3}
                                                    precision={2}
                                                    valueStyle={{
                                                        color: '#cf1322',
                                                    }}
                                                    prefix={<ArrowDownOutlined/>}
                                                    suffix="%"
                                                />
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Закуп сырья" key="item-2">
                                <h4>Закуп сырья</h4>
                                <div className={"container500"}>
                                    <div className={"container-child-1"}>
                                        <Form
                                            name="purchase-stock"
                                            wrapperCol={{
                                                span: 10,
                                            }}
                                            layout={"vertical"}
                                            onFinish={(values) => NewData(values)}
                                            initialValues={RowData}
                                        >
                                            <Form.Item label={"Сырье"} name="feedstock">
                                                <Select options={StockData}>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item label={"Кол-во"} name="count">
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item label={"Сумма"} name="sum">
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item label={"Дата"} name="date">
                                                <DatePicker/>
                                            </Form.Item>
                                            <Form.Item label={"Ответственный"} name="post1">
                                                <Select options={PostData}>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item>
                                                <Input id={"sumbit-input"} type={"submit"} value={"Подтвердить"}/>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className={"container-child-2"}>
                                        <div>
                                            <h5>Отчет</h5>
                                            <Form
                                                onFinish={(values) => discriptionData(values)}
                                            >
                                                <Form.Item name={"date1"}>
                                                    <DatePicker/>
                                                </Form.Item>
                                                <Form.Item name={"date2"}>
                                                    <DatePicker/>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Input id={"sumbit-input"} type={"submit"}
                                                           value={"Получить отчет"}/>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Продажа патронов" key="item-3">
                                <h4>Продажа патронов</h4>
                                <div className={"container500"}>
                                    <div className={"container-child-1"}>
                                        <Form
                                            name="sale-product"
                                            wrapperCol={{
                                                span: 10,
                                            }}
                                            layout={"vertical"}
                                            onFinish={(values) => NewDataforSale(values)}
                                            initialValues={RowData}
                                        >
                                            <Form.Item label={"Калибр"} name="productId">
                                                <Select options={SaleProductData}>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item label={"Кол-во"} name="count">
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item label={"Сумма"} name="sum">
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item label={"Дата"} name="date">
                                                <DatePicker/>
                                            </Form.Item>
                                            <Form.Item label={"Ответственный"} name="post1">
                                                <Select options={PostData}>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item>
                                                <Input id={"sumbit-input"} type={"submit"} value={"Подтвердить"}/>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className={"container-child-2"}>
                                        <div>
                                            <h5>Отчет</h5>
                                            <Form
                                                onFinish={(values) => discriptionDataforSale(values)}
                                            >
                                                <Form.Item name={"date1"}>
                                                    <DatePicker/>
                                                </Form.Item>
                                                <Form.Item name={"date2"}>
                                                    <DatePicker/>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Input id={"sumbit-input"} type={"submit"}
                                                           value={"Получить отчет"}/>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Производство патронов" key="item-4">
                                <h4>Производство патронов</h4>
                                <div className={"container500"}>
                                    <div className={"container-child-1"}>
                                        <Form
                                            name="sale-product"
                                            wrapperCol={{
                                                span: 10,
                                            }}
                                            layout={"vertical"}
                                            onFinish={(values) => NewDataforProd(values)}
                                            initialValues={RowData}
                                        >
                                            <Form.Item label={"Калибр"} name="productId">
                                                <Select options={ProdProductData}>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item label={"Кол-во"} name="count">
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item label={"Сумма"} name="sum">
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item label={"Дата"} name="date">
                                                <DatePicker/>
                                            </Form.Item>
                                            <Form.Item label={"Ответственный"} name="post1">
                                                <Select options={PostData}>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item>
                                                <Input id={"sumbit-input"} type={"submit"} value={"Подтвердить"}/>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className={"container-child-2"}>
                                        <div>
                                            <h5>Отчет</h5>
                                            <Form
                                                onFinish={(values) => discriptionDataforProd(values)}
                                            >
                                                <Form.Item name={"date1"}>
                                                    <DatePicker/>
                                                </Form.Item>
                                                <Form.Item name={"date2"}>
                                                    <DatePicker/>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Input id={"sumbit-input"} type={"submit"}
                                                           value={"Получить отчет"}/>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </>
            }


            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Отчет по закупкам сырья</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Table
                            columns={columns}
                            dataSource={DateData}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openSale}
                onClose={handleClose}
            >
                <DialogTitle>Отчет по продажам</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Table
                            columns={columnsForSale}
                            dataSource={DateData}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openProd}
                onClose={handleClose}
            >
                <DialogTitle>Отчет по продажам</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Table
                            columns={columnsForSale}
                            dataSource={DateData}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default App;