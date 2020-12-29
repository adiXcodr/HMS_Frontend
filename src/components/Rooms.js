import React, { Component } from 'react';
import { Spin, Space, Table, Grid, Divider, Row, Col, Button, Radio, Input, DatePicker, Form} from 'antd';
import "./style.css";
import {get_all_rooms, create_room, update_room, delete_room} from '../api/rooms';
import { PlusCircleOutlined , EditOutlined, DeleteOutlined} from '@ant-design/icons';
import moment from 'moment';

class Rooms extends Component {
  state={
    loading:true,
    dataSource:[],
    columns:[],
    addDataFlag:false,
    formData:{
        roomNo:"",
        floor:""
      },
    editDataFlag:false,
    deleteDataFlag:false
  }

  setData = async () =>{
    let dataSource=[];
    let x = await get_all_rooms();
    x=x.data;
    console.log("Boarders",x);
    if(x && x instanceof Array && x.length>0){
      x.forEach((item)=>{
        dataSource.push({
          key: String(item.roomNo),
          roomNo: item.roomNo,
          floor: item.floor
        });
      });
    }
    
    const columns = [
      {
        title: 'Room No',
        dataIndex: 'roomNo',
        key: 'roomNo',
      },
      {
        title: 'Floor',
        dataIndex: 'floor',
        key: 'floor',
      }
    ];


    this.setState({dataSource:dataSource,columns:columns,loading:false});
  };

  onFinish = async values => {
    let toSubmit ={
      roomNo:values.roomNo,
      floor:values.floor
    }
    console.log(toSubmit)
    let x='';
    if(this.state.addDataFlag)
       x = await create_room(toSubmit);
    else if(this.state.editDataFlag)
       x= await update_room(toSubmit);
    window.location.reload();
  };

  onFinishDelete = async values => {
    let toSubmit ={
      roomNo:values.roomNo
    }
    console.log(toSubmit)
    let x='';
    if(this.state.deleteDataFlag)
       x = await delete_room(toSubmit);
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
                                          label="Room No"
                                          id="roomNo" 
                                          name="roomNo"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.roomNo}
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
                                          label="Room No"
                                          id="roomNo" 
                                          name="roomNo"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.roomNo}
                                      >
                                          <Input />
                                      </Form.Item>
                                      <Form.Item
                                          label="Floor"
                                          id="floor" 
                                          name="floor"
                                          rules={[{ required: true }]}
                                          initialValue={this.state.formData.floor}
                                      >
                                        <Input/>
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

export default Rooms;