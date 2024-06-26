
import { useState } from 'react';

import './style/history.css';

//Componets form MUI
import Grid from '@mui/material/Unstable_Grid2';

//Componets form antd
import {
    Collapse, DatePicker, Space, Button, List,
    Checkbox,
    Form,
    Input,
    Select,
    Tag,
    Radio,
} from 'antd';
import {
    EyeOutlined,
    FolderOpenOutlined,
    DeleteOutlined,
    EditOutlined,
    FileAddOutlined,
    RollbackOutlined
} from '@ant-design/icons';
import 'antd/dist/antd';


const History = () =>{
    return(
        <div className='charge'>

        <span className='span-case1'> History:</span>
        <div style={{ minWidth: '95rem' }}>
        <Grid container spacing={{ xs: 1 }} >
            
   
                                <Grid xs={3}>
                                        <Form.Item label="Full Name" name={"full_name"}>
                                            <Input />
                                        </Form.Item>
                                    </Grid>
                                    <Grid xs={2}>
                                        <Form.Item label="Departmen" name={"dep"}>
                                            <Input />
                                        </Form.Item>
                                    </Grid>
                                    <Grid xs={2}>
                                        <Form.Item label="Section" name={"section"}>
                                            <Input />
                                        </Form.Item>
                                    </Grid>
                                    <Grid xs={2}>
                                        <Form.Item label="Position" name={"position"}>
                                            <Input />
                                        </Form.Item>
                                    </Grid>
                                    <Grid xs={2}>
                                        <Form.Item label="Phone" name={"phone"}>
                                            <Input />
                                        </Form.Item>
                                    </Grid>
                                    <Grid xs={2}>
                                        <Form.Item label="Email" name={"email"}>
                                            <Input />
                                        </Form.Item>
                                    </Grid>
                                    <Grid xs={2}>
                                        <Form.Item label="Start work" name={"start_work"}>
                                            <Input />
                                        </Form.Item>
                                    </Grid>
                                    <Grid xs={2}>
                                        <Form.Item label="End work" name={"end_work"}>
                                            <Input />
                                        </Form.Item>
                                    </Grid>
            
            
        </Grid>
        







        </div>
        </div>


        

    )
}

export default History;