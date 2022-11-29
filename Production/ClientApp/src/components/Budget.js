import {DownOutlined} from '@ant-design/icons';
import {Badge, Button, Dropdown, Input, Modal, Space, Table, theme, ConfigProvider} from 'antd';
import {React, useEffect, useState} from 'react';
import {LineWave} from "react-loader-spinner";

const data = [];
let newRow;

const App = () => {
    const [BudgetData, setBudgetData] = useState([]);
    const [newData, setNewData] = useState();
    const [RowData, setRowData] = useState({Budget1: ""});

    const [isLoading, setLoading] = useState(true);
    
    const [openEdit, setOpenEdit] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);

    const [open, setOpen] = useState(false);
    
    const columns = [
        {
            title: 'Бюджет',
            dataIndex: 'budget',
            key: 'budget',
        },
        {
            title: 'Action',
            dataIndex: 'edit',
            render: (_,record) =>
                BudgetData.length >= 1 ? (
                    <>
                        <Button  type="dashed" onClick={() => handleEdit(record)}>
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
            Budget1: record.budget
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

    const handleOkEdit = () => {
        var object = {
            id: RowData.Id,
            Budget1:newData
        }
        setConfirmLoadingEdit(true);
        setTimeout(() => {
            setOpenEdit(false);
            setConfirmLoadingEdit(false);
        }, 2000);
        fetch("https://localhost:7171/Budget/EditBudget",
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(object)
            })
    };
    
    
    useEffect(() => {
        setLoading(true);
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
                    data[i] = {
                        key: responseData[i].id,
                        budget: responseData[i].budget1,
                    }
                }
                setBudgetData(data);
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
                        color="#4fa94d"
                        ariaLabel="line-wave"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        firstLineColor=""
                        middleLineColor=""
                        lastLineColor=""
                    />
                </div>
                :
                <>
                    <Table
                        columns={columns}
                        dataSource={BudgetData}
                    />
                    {/*Модальный для edit*/}

                    <Modal
                        title="Изменение"
                        open={openEdit}
                        onOk={handleOkEdit}
                        confirmLoading={confirmLoadingEdit}
                        onCancel={handleCancelEdit}
                    >
                        <Input
                            placeholder="Ед.измерения" defaultValue={RowData.Budget1}
                            onChange={NewData}
                        />
                    </Modal>
                </>
            }
        </>
    );
};
export default App;