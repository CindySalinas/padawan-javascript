'use strict';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { trim } = require('lodash');

const handleParse = (mails) => {
  let data = mails.map((e) => mailParse(e));
  return data;
}

/**
 * Parse data for emails that match first type
 * @param  {Object} mail contains email data
 * @return {Object}      Parsed data
 */
function mailParse(mail) {
  let data = {};
  // initialize dom reader
  let dom = new JSDOM(mail.data['body-html'], { includeNodeLocations: true });
  let document = dom.window.document;
  // get table container of all data
  let container = document.getElementsByTagName("table")[1];
  let containerRow = container.rows[0];
  let containerDimmension = containerRow.cells[0];
  // get table data
  let table = containerDimmension.getElementsByTagName('table')[0];
  let rows = table.querySelectorAll('td');
  // fill data
  for (var i = 0; i <= rows.length - 1; i++) {
    // if index it's a prime number, will be the key
    if (i % 2 === 0) {
      var key = trim(rows[i].textContent.split(':').join(''));
      data[key] = trim(rows[i + 1].textContent); // data will be the next index
    }
  }
  return data;
};

module.exports = handleParse;
