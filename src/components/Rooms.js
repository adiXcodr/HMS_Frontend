import React, { Component } from 'react';
import { Spin, Space, Table, Grid, Divider, Row, Col } from 'antd';
import "./style.css";
import {get_all_rooms, create_room, update_room, delete_room} from '../api/rooms';

class Rooms extends Component {
  state={
    loading:true,
    dataSource:[],
    columns:[]
  }

  setData = async () =>{
    let dataSource=[];
    let x = await get_all_rooms();
    x=x.data;
    console.log("Rooms",x);
    if(x && x instanceof Array && x.length>0){
      x.forEach((item)=>{
        dataSource.push({
          key: String(item.roomNo),
          roomNo: String(item.roomNo),
          floor: String(item.floor)
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

export default Rooms;