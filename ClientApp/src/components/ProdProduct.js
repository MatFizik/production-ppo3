import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import {React, useEffect, useState} from 'react';

const data = [];

const App = () => {
    const [ProdData, setProdData] = useState([]);
    const columns = [
        {
            title: 'Калибр',
            dataIndex: 'product',
            key: 'product',
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

    useEffect(()=>{
        fetch('https://localhost:7171/ProdProduct/GetProdProduct',{
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },})
            .then(function (response)
            {
                return response.json()
            })
            .then(function (responseData)
            {
                console.log(responseData);
                for (let i = 0;i < responseData.length;i++)
                {
                    data[i] = {
                        key: responseData[i].id,
                        product: responseData[i].product.name,
                        count: responseData[i].count,
                        sum: responseData[i].sum,
                        date: responseData[i].date,
                        staff: responseData[i].staff.fullName
                    }
                }
                setProdData(data);
            });
    },[])

    return (
        <>
            <Table
                columns={columns}
                dataSource={ProdData}
            />
        </>
    );
};
export default App;