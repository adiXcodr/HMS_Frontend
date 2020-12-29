import axios from 'axios';
import server_link from '../constants';

export const get_all_representatives = async data => {
    let x;
    await axios.get(`${server_link}/get_all_representatives`, data).then(
      response => {
        x = response.data;
      },
      error => {
        console.log(error);
      },
    );
    return x;
};

export const get_representative = async data => {
  let x;
   
  await axios.post(`${ server_link}/get_representative`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};

export const create_representative = async data => {
  let x;
   
  await axios.post(`${ server_link}/add_representatives`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};

export const update_representative = async data => {
  let x;
   
  await axios.post(`${ server_link}/update_representative`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};

export const delete_representative = async data => {
  let x;
   
  await axios.post(`${ server_link}/delete_representative`, data).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
    },
  );
  return x;
};
