'use strict';
const logger = require('winston');
const mailData = require('./static/mails');
const firstType = require('./parsers/firstType');
const secondType = require('./parsers/secondType');
const thirdType = require('./parsers/thirdType');

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

// init to parse all emails
const init = () => {
  createMailGroup(mailData);
  logger.info(`Data for mails that math first type`);
  firstType(mailGroups.type1).forEach((e, i) => console.log(`Mail #${i+1}:`, e));
  console.log('--------------------------------------');
  logger.info(`Data for mails that math second type`);
  secondType(mailGroups.type2).forEach((e, i) => console.log(`Mail #${i+1}:`, e));
  console.log('--------------------------------------');
  logger.info(`Data for mails that math third type`);
  thirdType(mailGroups.type3).forEach((e, i) => console.log(`Mail #${i+1}:`, e));
};

init();