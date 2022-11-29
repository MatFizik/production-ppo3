import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import {React, useEffect, useState} from 'react';
import {LineWave} from "react-loader-spinner";

const data = [];

const App = () => {
    const [SaleProductData, setSaleProductData] = useState([]);
    const [isLoading, setLoading] = useState();
    
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
        setLoading(true);
        fetch('https://localhost:7171/SaleProduct/GetSaleProduct',{
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
                        product: responseData[i].product.name,
                        count: responseData[i].count,
                        sum: responseData[i].sum,
                        date: responseData[i].date,
                        staff: responseData[i].staff.fullName
                    }
                }
                setSaleProductData(data);
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            });
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
                dataSource={SaleProductData}
            />
                </>
            }
        </>
    );
};
export default App;