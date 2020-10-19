import PasswordPolicy from 'password-sheriff/lib/policy';
import { setField } from './index';

export function validatePassword(password, policy) {
  if (!password) {
    return false;
  }
  if (!policy) {
    return true;
  }
  return new PasswordPolicy(policy.toJS()).check(password);
}

export function setPassword(m, password, policy) {
  return setField(m, 'password', password, validatePassword, policy);
}

export function setShowPassword(m, checked) {
  return setField(m, 'showPassword', checked, () => true);
}

export function toggleShowPassword(event) {
  const grandparent = event.target.parentElement.parentElement;
  const passwordField = grandparent.getElementsByClassName('auth0-lock-input')[0];

  if (passwordField.type === 'password') {
    passwordField.type = 'text';
  } else {
    passwordField.type = 'password';
  }
}
