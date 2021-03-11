import PropTypes from 'prop-types';
import React from 'react';
import PasswordInput from '../../ui/input/password_input';
import * as c from '../index';
import { swap, updateEntity } from '../../store/index';
import * as l from '../../core/index';
import { setPassword, toggleShowPassword } from '../password';

export default class PasswordPane extends React.Component {
  handleChange = e => {
    const { lock, policy } = this.props;
    swap(updateEntity, 'lock', l.id(lock), setPassword, e.target.value, policy);
  };

  render() {
    const { i18n, lock, placeholder, policy, strengthMessages, hidden } = this.props;
    const hiddenCss = hidden ? ' auth0-lock-hidden' : '';

    // TODO: invalidErrorHint and blankErrorHint are deprecated.
    // They are kept for backwards compatibiliy in the code for the customers overwriting
    // them with languageDictionary. They can be removed in the next major release.
    const invalidHint = c.getFieldValue(lock, 'password')
      ? i18n.str('invalidErrorHint') || i18n.str('invalidPasswordErrorHint')
      : i18n.str('blankErrorHint') || i18n.str('blankPasswordErrorHint');
    return (
      <div className={`auth0-lock-input-block auth0-lock-input-show-password${hiddenCss}`}>
        <PasswordInput
          value={c.getFieldValue(lock, 'password')}
          invalidHint={invalidHint}
          showPasswordStrengthMessage={!c.isFieldValid(lock, 'password')}
          isValid={!c.isFieldVisiblyInvalid(lock, 'password')}
          onChange={this.handleChange}
          placeholder={placeholder}
          strengthMessages={strengthMessages}
          disabled={l.submitting(lock)}
          policy={policy}
          showPassword={c.getFieldValue(lock, 'showPassword', false)}
          lock={lock}
          i18n={i18n}
          lockId={l.id(lock)}
        />
        {l.ui.allowShowPassword(lock) && (
          <div className="auth0-lock-show-password">
            <input type="checkbox" id="slideOne" onChange={toggleShowPassword} />
            <label htmlFor="slideOne" title={i18n.str('showPassword')} />
          </div>
        )}
      </div>
    );
  }
}

PasswordPane.propTypes = {
  i18n: PropTypes.object.isRequired,
  lock: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  policy: PropTypes.object,
  strengthMessages: PropTypes.object,
  hidden: PropTypes.bool
};
