import axios from 'axios';
import server_link from '../constants';

export const get_all_boarders = async data => {
    let x;
    await axios.get(`${server_link}/get_all_boarders`, data).then(
      response => {
        x = response.data;
      },
      error => {
        console.log(error);
      },
    );
    return x;
};

export const get_boarder = async data => {
  let x;
  data.api_key=api_key;
  await axios.post(`${serverLink}/get_boarder`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};

export const create_boarder = async data => {
  let x;
  data.api_key=api_key;
  await axios.post(`${serverLink}/add_boarders`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};

export const update_boarder = async data => {
  let x;
  data.api_key=api_key;
  await axios.post(`${serverLink}/update_boarder`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};

export const delete_boarder = async data => {
  let x;
  data.api_key=api_key;
  await axios.post(`${serverLink}/delete_boarder`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};
