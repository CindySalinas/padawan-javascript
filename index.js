'use strict';
const logger = require('winston');
const { forEach, find, trim } = require('lodash');
const mailData = require('./static/mails');
const firstType = require('./parsers/firstType');

// subject regexs
const type1 = new RegExp("^\\(?\\w[A-Z0-9]{1,}\\)? ?-? ?#? \\(?[0-9]{1,}\\)?");
const type2 = new RegExp("[\\(\\)]");
const type3 = new RegExp("^\\(?\\w[a-z0-9\\-]{1,}\\)? ?-?");

let mailGroups = {
  type1: [],
  type2: [],
  type3: []
};

// separate mails by type
const createMailGroup = (mails) => {
  mails.forEach(val => {
    if (type1.test(val.data['Subject'])) mailGroups.type1.push(val);
    if (type2.test(val.data['Subject'])) mailGroups.type2.push(val);
    if (type3.test(val.data['Subject'])) mailGroups.type3.push(val);
  });
};



createMailGroup(mailData);
console.log(firstType(mailGroups.type1))
