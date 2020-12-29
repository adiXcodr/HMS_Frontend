import React, { Component } from 'react';
import { Spin, Space, Table, Grid, Divider, Row, Col, Button, Radio, Input, DatePicker, Form} from 'antd';
import "./style.css";
import {get_all_boarders, create_boarder, update_boarder, delete_boarder} from '../api/boarders';
import { PlusCircleOutlined , EditOutlined, DeleteOutlined} from '@ant-design/icons';
import moment from 'moment';

class Boarders extends Component {
  state={
    loading:true,
    dataSource:[],
    columns:[],
    addDataFlag:false,
    formData:{
        rollNo:"",
        first_name:"",
        last_name:"",
        phoneNumber:"",
        department:"",
        programme:"",
        email:"",
        dateOfBirth:"",
        address:"",
        roomNo:""
      },
    editDataFlag:false,
    deleteDataFlag:false
  }

  setData = async () =>{
    let dataSource=[];
    let x = await get_all_boarders();
    x=x.data;
    console.log("Boarders",x);
    if(x && x instanceof Array && x.length>0){
      x.forEach((item)=>{
        dataSource.push({
          key: String(item.roomNo),
          rollNo: item.rollNo,
          name: item.first_name+" "+item.last_name,
          phoneNumber: item.phoneNumber,
          department:item.department,
          programme:item.programme,
          email:item.email,
          dateOfBirth:item.dateOfBirth,
          address: item.address,
          roomNo: item.roomNo
        });
      });
    }
    
    const columns = [
      {
        title: 'Roll No',
        dataIndex: 'rollNo',
        key: 'rollNo',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Phone',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: 'Programme',
        dataIndex: 'programme',
        key: 'programme',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'DOB',
        dataIndex: 'dateOfBirth',
        key: 'dateOfBirth',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Room No',
        dataIndex: 'roomNo',
        key: 'roomNo',
      }
    ];


    this.setState({dataSource:dataSource,columns:columns,loading:false});
  };

  onFinish = async values => {
    let toSubmit ={
      rollNo:values.rollNo,
      first_name:values.first_name,
      last_name:values.last_name,
      phoneNumber:values.phoneNumber,
      department:values.department,
      programme:values.programme,
      email:values.email,
      dateOfBirth:moment(values.dateOfBirth).format('YYYY-MM-DD'),
      address:values.address,
      roomNo:values.roomNo
    }
    console.log(toSubmit)
    let x='';
    if(this.state.addDataFlag)
       x = await create_boarder(toSubmit);
    else if(this.state.editDataFlag)
       x= await update_boarder(toSubmit);
    window.location.reload();
  };

  onFinishDelete = async values => {
    let toSubmit ={
      rollNo:values.rollNo,
    }
    console.log(toSubmit)
    let x='';
    if(this.state.deleteDataFlag)
       x = await delete_boarder(toSubmit);
    window.location.reload();
  };

  componentDidMount(){
    this.setData();
  }
  render() {
    const {dataSource, columns, loading, addDataFlag, editDataFlag, deleteDataFlag} = this.state;
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return (
        <div className="boarderContainer" >
          {loading?
            <Spin size="large" style={{width:'100%',marginTop:'20%'}}/>
            :<div>
              <Row align="middle" className="boarderRow">
                  <Table 
                      dataSource={dataSource} 
                      columns={columns} 
                      pagination={false}
                      bordered 
                      className="antTable"
                      rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                  />
              </Row>
              
                  {!addDataFlag&&!editDataFlag&&!deleteDataFlag?
                    <Row align="middle" className="addRow">
                      <Col >
                            <Button type="primary" icon={<PlusCircleOutlined/>} align="middle" size={"large"} onClick={()=>this.setState({addDataFlag:true})} className="addDataButton"/>
                       </Col>
                       <Col style={{marginLeft:'5%'}}>
                            <Button type="primary" icon={<EditOutlined/>} align="middle" size={"large"} onClick={()=>this.setState({editDataFlag:true})} className="editDataButton"/>
                       </Col>
                       <Col style={{marginLeft:'5%'}}>
                            <Button type="primary" icon={<DeleteOutlined/>} align="middle" size={"large"} onClick={()=>this.setState({deleteDataFlag:true})} className="editDataButton"/>
                       </Col>
                    </Row>
                    :
                    <Row align="middle" className="formikContainer">
                         {deleteDataFlag?
                              <Form
                                  {...layout}
                                  name="boarderForm"
                                  id="boarderForm"
                                  initialValues={{ remember: true }}
                                  onFinish={this.onFinishDelete}
                                  onFinishFailed={onFinishFailed}
                                >
                                <Form.Item
                                          label="Roll No"
                                          id="rollNo" 
                                          name="rollNo"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.rollNo}
                                      >
                                          <Input />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                      <Button type="primary" htmlType="submit" form="boarderForm" style={{marginTop:30,marginBottom:50}}>Delete</Button>
                                  </Form.Item>
                              </Form>
                              :
                                <Form
                                  {...layout}
                                  name="boarderForm"
                                  id="boarderForm"
                                  initialValues={{ remember: true }}
                                  onFinish={this.onFinish}
                                  onFinishFailed={onFinishFailed}
                                >
                                      <Form.Item
                                          label="Roll No"
                                          id="rollNo" 
                                          name="rollNo"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.rollNo}
                                      >
                                          <Input />
                                      </Form.Item>
                                      <Form.Item
                                          label="First Name"
                                          id="first_name" 
                                          name="first_name"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.first_name}
                                      >
                                          <Input required/>
                                      </Form.Item>
                                      <Form.Item
                                          label="Last Name"
                                          id="last_name" 
                                          name="last_name"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.last_name}
                                      >
                                          <Input required/>
                                      </Form.Item>
                                      <Form.Item
                                          label="Phone"
                                          id="phoneNumber" 
                                          name="phoneNumber"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.phoneNumber}
                                      >
                                          <Input required/>
                                      </Form.Item>
                                      <Form.Item
                                          label="Department"
                                          id="department" 
                                          name="department"
                                          rules={[{ required: true}]}
                                          initialValue={this.state.formData.department}
                                      >
                                          <Input/>
                                      </Form.Item>
                                      <Form.Item
                                          label="Programme"
                                          id="programme" 
                                          name="programme"
                                          rules={[{ required: true}]}
                                          initialValue={this.state.formData.programme}
                                      >
                                          <Input />
                                      </Form.Item>
                                      <Form.Item
                                          label="Email"
                                          id="email" 
                                          name="email"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.email}
                                      >
                                          <Input />
                                      </Form.Item>
                                      <Form.Item
                                          label="DOB"
                                          id="dateOfBirth" 
                                          name="dateOfBirth"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.dateOfBirth}
                                      >
                                          <DatePicker/>
                                      </Form.Item>
                                      <Form.Item
                                          label="Address"
                                          id="address" 
                                          name="address"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.address}
                                      >
                                          <Input />
                                      </Form.Item>
                                      <Form.Item
                                          label="Room No"
                                          id="roomNo" 
                                          name="roomNo"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.roomNo}
                                      >
                                          <Input />
                                      </Form.Item>
                                    
                                    <br></br>
                                    <Form.Item {...tailLayout}>
                                      <Button type="primary" htmlType="submit" form="boarderForm" style={{marginTop:30,marginBottom:50}}>{this.state.editDataFlag?'Edit':'Add'}</Button>
                                    </Form.Item>
                              </Form>
                              }
                    </Row>
                }
              
          </div>
          }
        </div>
    );
  }
}

export default Boarders;