import React, { Component } from 'react';
import { Spin, Space, Table, Grid, Divider, Row, Col } from 'antd';
import "./style.css";
import {get_all_representatives, create_representative, update_representative, delete_representative} from '../api/representatives';

class Reps extends Component {
  state={
    loading:true,
    dataSource:[],
    columns:[],
    addDataFlag:false
  }

  setData = async () =>{
    let dataSource=[];
    let x = await get_all_representatives();
    x=x.data;
    console.log("Reps",x);
    if(x && x instanceof Array && x.length>0){
      x.forEach((item)=>{
        dataSource.push({
          key: String(item.rollNo),
          rollNo: String(item.rollNo),
          role: String(item.role)
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
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
      }
    ];

    this.setState({dataSource:dataSource,columns:columns,loading:false});
  };

  componentDidMount(){
    this.setData();
  }
  render() {
    const {dataSource, columns, loading} = this.state;
    return (
        <div className="boarderContainer" >
          {loading?
            <Spin size="large" style={{width:'100%',marginTop:'20%'}}/>
            :
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

          }
        </div>
    );
  }
}

export default Reps;