import trim from 'trim';
import _isEmail from 'validator/lib/isEmail';

import { setField } from './index';
import { isHRDEmailValid } from '../connection/enterprise';
import * as i18n from '../i18n';

export function validateEmail(str, strictValidation = false) {
  return isEmail(str, strictValidation) && sageIdEmailVerification(str);
}

function sageIdEmailVerification(email) {
  const re = new RegExp(
    '^((([a-z]|\\d|[!#\\$%\u0026\u0027\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+((\\.)+([a-z]|\\d|[!#\\$%\u0026\u0027\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(\\x22)))@(((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+)(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))$',
    'i'
  );
  return re.test(email);
}

export function isEmail(str, strictValidation = false) {
  if (typeof str !== 'string') {
    return false;
  }
  const trimmed = trim(str);
  return strictValidation
    ? _isEmail(str)
    : trimmed.indexOf('@') >= 0 && trimmed.indexOf('.') >= 0 && trimmed.indexOf(' ') === -1;
}

export function setEmail(m, str, strictValidation = false) {
  return setField(m, 'email', str, str => {
    const validHRDEMail = isHRDEmailValid(m, str);

    return {
      valid: validateEmail(str, strictValidation) && validHRDEMail,
      hint: !validHRDEMail ? i18n.html(m, ['error', 'login', 'hrd.not_matching_email']) : undefined
    };
  });
}

export function emailDomain(str) {
  if (!isEmail(str)) {
    return '';
  }
  return str.split('@')[1].toLowerCase();
}

export function emailLocalPart(str) {
  const domain = emailDomain(str);
  return domain ? str.slice(0, -1 - domain.length) : str;
}
