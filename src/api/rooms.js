import axios from 'axios';
import server_link from '../constants';

export const get_all_rooms = async data => {
    let x;
    await axios.get(`${server_link}/get_all_rooms`, data).then(
      response => {
        x = response.data;
      },
      error => {
        console.log(error);
      },
    );
    return x;
};

export const get_room = async data => {
  let x;
  data.api_key=api_key;
  await axios.post(`${serverLink}/get_room`, data).then(
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
  data.api_key=api_key;
  await axios.post(`${serverLink}/add_rooms`, data).then(
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
  data.api_key=api_key;
  await axios.post(`${serverLink}/update_room`, data).then(
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
  data.api_key=api_key;
  await axios.post(`${serverLink}/delete_room`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};
