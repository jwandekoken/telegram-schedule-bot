const axios = require('axios');
const moment = require('moment');

const baseUrl = `http://localhost:3000/tasks`;

exports.getSchedule = date => {
  return axios.get(baseUrl)
    .then(res => {
      console.log(res.data);
      // receive an item and return this item (we are using a implicity return) if its conclusionDate be equal to null (or empty string) AND if dueDate be the same before to the date received as param (this is, we wanna tasks with its due date already passed) 
      const pending = (item) => (item.conclusionDate === null || item.conclusionDate === '') && moment(item.dueDate).isSameOrBefore(date);

      // we gonna return the items of 'res.data' that are pending. See tha the filter func gonna pass to the 'pending' function each iteration item
      return res.data.filter(pending);
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getTask = taskId => {
  return axios.get(`${baseUrl}/${taskId}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};