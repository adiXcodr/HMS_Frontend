import axios from 'axios';
import server_link from '../constants';

export const get_all_rooms = async () => {
    let x;
    await axios.get(`${server_link}/get_all_rooms`).then(
      response => {
        x = response.data;
      },
      error => {
        console.log(error);
      },
    );
    return x;
};

export const create_room = async data => {
  let x;
   
  await axios.post(`${ server_link}/add_rooms`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};

export const update_room = async data => {
  let x;
  await axios.post(`${ server_link}/update_room`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};

export const delete_room = async data => {
  let x;
   
  await axios.post(`${ server_link}/delete_room`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};
