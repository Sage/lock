import PropTypes from 'prop-types';
import React from 'react';
import ConfirmPasswordInput from '../../ui/input/confirm_password_input';

import * as c from '../index';
import * as l from '../../core/index';
import { toggleShowPassword } from '../password';
import { changeField } from '../actions';

export default class ConfirmPasswordPane extends React.Component {
  static showConfirmPasswordInvalid = false;

  render() {
    const { i18n, lock, hidden, model } = this.props;
    const hiddenCss = hidden ? ' auth0-lock-hidden' : '';

    // TODO: invalidErrorHint and blankErrorHint are deprecated.
    // They are kept for backwards compatibiliy in the code for the customers overwriting
    // them with languageDictionary. They can be removed in the next major release.
    const invalidHint = c.getFieldValue(lock, 'confirm_password')
      ? i18n.str('invalidErrorHint') || i18n.str('invalidConfirmPasswordErrorHint')
      : i18n.str('blankErrorHint') || i18n.str('blankPasswordErrorHint');

    const validator = value => {
      let password = c.getFieldValue(lock, 'password');
      let result = false;

      if (password && value) {
        result = password === value;
      }

      if (!ConfirmPasswordPane.showConfirmPasswordInvalid) {
        result = true;
      }
      return result;
    };

    return (
      <div className={`auth0-lock-input-block auth0-lock-input-show-password${hiddenCss}`}>
        <ConfirmPasswordInput
          lockId={l.id(model)}
          invalidHint={invalidHint}
          onChange={e => {
            changeField(l.id(model), 'confirm_password', e.target.value, validator);
            ConfirmPasswordPane.showConfirmPasswordInvalid = false;
          }}
          value={c.getFieldValue(lock, 'confirm_password')}
          isValid={validator(c.getFieldValue(lock, 'confirm_password'))}
        />
        {l.ui.allowShowPassword(lock) && (
          <div className="auth0-lock-show-password">
            <input type="checkbox" id="slideOne2" onChange={toggleShowPassword} />
            <label htmlFor="slideOne2" title={i18n.str('showPassword')} />
          </div>
        )}
      </div>
    );
  }
}

ConfirmPasswordPane.propTypes = {
  i18n: PropTypes.object.isRequired,
  lock: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  policy: PropTypes.object,
  model: PropTypes.object,
  strengthMessages: PropTypes.object,
  hidden: PropTypes.bool
};
