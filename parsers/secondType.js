'use strict';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { forEach, trim, first, last, isNull, isEmpty } = require('lodash');

const handleParse = (mails) => {
  let data = mails.map((e) => mailParse(e));
  return data;
};

/**
 * Parse data for emails that match second type
 * @param  {Object} mail contains email data
 * @return {Object}      Parsed data
 */
function mailParse(mail) {
  let data = {};
  // initialize dom reader
  let dom = new JSDOM(mail.data['body-html'], { includeNodeLocations: true });
  let document = dom.window.document;

  let table = first(document.getElementsByTagName('table'));
  let rows = last(table.querySelectorAll('td'));

  let lines = trim(rows.innerHTML).split('\n');
  let regex = /(<([^>]+)>)/ig;
  forEach(lines, (line, i) => {
    var content = line.replace(regex, '');
    if (!isEmpty(content)) {
      var values = trim(content).split(':');
      if (values.length)
        data[first(values)] = last(values);
    }
  });

  return data;
};

module.exports = handleParse;
