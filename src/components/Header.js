import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { ShopOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';


class Header extends Component {

  state = {
    current: 'home',
  };

  componentDidMount(){
    let path = this.props.history.location.pathname
    console.log("Path is",path);
    path=path.slice(1);
    if(path=="")
    {
      path="home"
    }
    this.setState({current:path});
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
        <div>
          <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" theme="light" style={{borderWidth:2,borderColor:'#eee'}}>
              <Menu.Item key="home" icon={<TeamOutlined />}>
                <Link to="/">Boarders</Link>
              </Menu.Item>
              <Menu.Item key="rooms" icon={<ShopOutlined />}>
                <Link to="/rooms">Rooms</Link>
              </Menu.Item>
              <Menu.Item key="reps" icon={<TrophyOutlined />}>
                <Link to="/reps">Representatives</Link>
              </Menu.Item>
        </Menu>
        </div>
    );
  }
}

export default Header;