import {DownOutlined} from '@ant-design/icons';
import {Badge, Button, Dropdown, Input, Modal, Space, Table} from 'antd';
import {React, useEffect, useState} from 'react';
import {LineWave} from "react-loader-spinner";

const data = [];
let newRow;

const App = () => {
    const [open, setOpen] = useState(false);
    const [MeasureData, setMeasureData] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [newData, setNewData] = useState();

    const [openEdit, setOpenEdit] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
    const [RowData, setRowData] = useState({Measure1: ""});

    const [isLoading, setLoading] = useState(true);

    const columns = [
        {
            title: 'Ед.измерения',
            dataIndex: 'measure',
            key: 'measure',
        },
        {
            title: 'Action',
            dataIndex: 'edit',
            render: (_, record) =>
                MeasureData.length >= 1 ? (
                    <>
                        <Button type="dashed" onClick={() => handleEdit(record)}>
                            <p>Изменить</p>
                        </Button>
                    </>
                ) : null,
        }
    ];
    const NewData = (value) => {
        setNewData(value.target.value);
    }

    const handleEdit = (record) => {
        newRow = {
            Id: record.key,
            Measure1: record.measure
        }
        setRowData(newRow);
        showModalEdit();
    };

    const showModal = () => {
        setOpen(true);
    };

    const showModalEdit = () => {
        setOpenEdit(true);
    };

    const handleOk = () => {
        var object = {
            measure1: newData
        }
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
        fetch("https://localhost:7171/Measure/AddMeasure",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(object)
            }).then(window.location.reload())
    };

    const handleOkEdit = () => {
        var object = {
            id: RowData.Id,
            measure1: newData
        }
        setConfirmLoadingEdit(true);
        setTimeout(() => {
            setOpenEdit(false);
            setConfirmLoadingEdit(false);
        }, 2000);
        fetch("https://localhost:7171/Measure/EditMeasure",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(object)
            }).then(window.location.reload())
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleCancelEdit = () => {
        setOpenEdit(false);
    };

    useEffect(() => {
        setLoading(true);
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
                    data[i] = {
                        key: responseData[i].id,
                        measure: responseData[i].measure1,
                    }
                }
                setMeasureData(data);
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
                        dataSource={MeasureData}
                    />
                    <Button type="primary" id={"before-footer"} onClick={showModal}>
                        <p>Добавить</p>
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
                    placeholder="Ед.измерения"
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
                    placeholder="Ед.измерения" defaultValue={RowData.Measure1}
                    onChange={NewData}
                />
            </Modal>
        </>
    );
};
export default App;