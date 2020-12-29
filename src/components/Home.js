import React, { Component } from 'react';
import { Spin, Space, Table, Grid, Divider, Row, Col, Button, Radio, Input, DatePicker} from 'antd';
import "./style.css";
import {get_all_boarders, create_boarder, update_boarder, delete_boarder} from '../api/boarders';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Formik, Field, Form} from 'formik';

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
      }
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
  onSubmitForm(data){
    console.log(data);
  }
  componentDidMount(){
    this.setData();
  }
  render() {
    const {dataSource, columns, loading, addDataFlag} = this.state;
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
              
                  {!addDataFlag?
                    <Row align="middle" className="addRow">
                       <Button type="primary" icon={<PlusCircleOutlined/>} align="middle" size={"large"} onClick={()=>this.setState({addDataFlag:true})} className="addDataButton"/>
                    </Row>
                    :
                    <Row align="middle" className="formikContainer">
                        <Formik
                            initialValues={this.state.formData}
                            onSubmit={async (values) => {
                              console.log(values);
                            }}
                          >
                                <Form
                                  id="boarderForm"
                              >
                                    <label htmlFor="rollNo">Roll Number</label>
                                      <Input id="rollNo" name="rollNo" required/>
                                    
                                    <label htmlFor="first_name">First Name</label>
                                      <Input id="first_name" name="first_name" required/>
                                    
                                    <label htmlFor="last_name">Last Name</label>
                                      <Input id="last_name" name="last_name" required/>
                                    
                                    <label htmlFor="phoneNumber">Phone</label>
                                      <Input id="phoneNumber" name="phoneNumber" required/>
                                    
                                    <label htmlFor="department">Department</label>
                                      <Input id="department" name="department" required/>
                                    
                                    <label htmlFor="programme">Programme</label>
                                      <Input id="programme" name="programme" required/>
                                    
                                    <label htmlFor="email">Email</label>
                                      <Input id="email" name="email" required/>
                                    
                                    <label htmlFor="dateOfBirth">DOB</label>
                                      <DatePicker id="dateOfBirth" name="dateOfBirth" required style={{marginTop:20,marginBottom:10}}/>
                                    <br></br>
                                    <label htmlFor="address">Address</label>
                                      <Input id="address" name="address" required/>
                                    
                                    <label htmlFor="roomNo">Room No</label>
                                      <Input id="roomNo" name="roomNo" required/>
                                    
                                    <br></br>
                                      <Button type="submit" htmlType="submit" form="boarderForm" style={{marginTop:30,marginBottom:50}}>Submit</Button>
                                    
                              </Form>
                      </Formik>
                    </Row>
                }
              
          </div>
          }
        </div>
    );
  }
}

export default Boarders;