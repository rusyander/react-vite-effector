// import {attach, createEvent, createStore, sample} from 'effector';
// import {and, empty, every, not, reset} from 'patronum';
// import * as api from '~/shared/api';
// import {routes} from '~/shared/routing';
// import {chainAnonymous, sessionRequestFx} from '~/shared/session';
// export const currentRoute = routes.auth.register;
// export const anonymousRoute = chainAnonymous(currentRoute, {
//   otherwise: routes.search.open,
// });
// const signUpFx = attach({effect: api.signUpFx});
// const confirmPhoneFx = attach({effect: api.confirmPhone});
// export const createField = <Value, Error>(defaultValue: Value) => {
//   const $value = createStore(defaultValue);
//   const $error = createStore<Error | null>(null);
//   const $set = createEvent<string>();
//   return [$value, $set, $error] as const;
// };
// export const [$email, emailChanged, $emailError] = createField<string, null | 'empty' | 'invalid'>(
//   '',
// );
// export const [$username, usernameChanged, $usernameError] = createField<string, null | 'empty'>('');
// export const [$password, passwordChanged, $passwordError] = createField<
//   string,
//   null | 'empty' | 'invalid'
// >('');
// export const [$phone, phoneChanged, $phoneError] = createField<string, null | 'empty'>('');
// export const $code = createStore('');
// export const codeChanged = createEvent<string>();
// export const $signUpError = createStore<api.SignUpError | null>(null);
// export const $confirmPhone = createStore(false);
// export const pageMounted = createEvent();
// reset({
//   clock: pageMounted,
//   target: [
//     $email,
//     $emailError,
//     $password,
//     $passwordError,
//     $username,
//     $usernameError,
//     $phone,
//     $phoneError,
//     $code,
//     $signUpError,
//     $confirmPhone,
//   ],
// });
// export const $registretionFormDisabled = signUpFx.pending;
// const $registretionFormValid = every({
//   // @ts-ignore
//   stores: [$emailError, $passwordError, $usernameError, $phoneError],
//   predicate: null,
// });
// export const registretionFormSubmitted = createEvent();
// export const confirmPhoneFormSubmitted = createEvent();
// export const $confirmPhoneFormDisabled = confirmPhoneFx.pending;
// $email.on(emailChanged, (_, email) => email);
// $username.on(usernameChanged, (_, username) => username);
// $password.on(passwordChanged, (_, password) => password);
// $phone.on(phoneChanged, (_, phone) => phone);
// $code.on(codeChanged, (_, code) => code);
// $signUpError.reset(registretionFormSubmitted);
// sample({
//   clock: registretionFormSubmitted,
//   source: $email,
//   fn: (email) => {
//     if (isEmpty(email)) return 'empty';
//     if (!isEmailValid(email)) return 'invalid';
//     return null;
//   },
//   target: $emailError,
// });
// sample({
//   clock: registretionFormSubmitted,
//   source: $username,
//   fn: (username) => {
//     if (isEmpty(username)) return 'empty';
//     return null;
//   },
//   target: $usernameError,
// });
// sample({
//   clock: registretionFormSubmitted,
//   source: $password,
//   fn: (password) => {
//     if (isEmpty(password)) return 'empty';
//     if (!isPasswordValid(password)) return 'invalid';
//     return null;
//   },
//   target: $passwordError,
// });
// sample({
//   clock: registretionFormSubmitted,
//   source: $phone,
//   fn: (phone) => {
//     if (isEmpty(phone)) return 'empty';
//     return null;
//   },
//   target: $phoneError,
// });
// sample({
//   clock: registretionFormSubmitted,
//   source: {email: $email, password: $password, phone: $phone, username: $username},
//   filter: and(not($registretionFormDisabled), $registretionFormValid),
//   target: signUpFx,
// });
// $signUpError.on(signUpFx.failData, (_, error) => error);
// $confirmPhone.on(signUpFx.done, () => true);
// sample({
//   clock: confirmPhoneFormSubmitted,
//   source: {code: $code},
//   filter: not($registretionFormDisabled),
//   target: confirmPhoneFx,
// });
// sample({
//   clock: confirmPhoneFx.done,
//   target: sessionRequestFx,
// });
// function isEmailValid(email: string) {
//   return email.includes('@') && email.length > 5;
// }
// function isPasswordValid(password: string) {
//   return password.length > 5;
// }
// function isEmpty(input: string) {
//   return input.trim().length === 0;
// }
import {attach, createEvent, createStore, sample} from 'effector';
import {every, reset} from 'patronum';

import * as api from '~/shared/api';
import {routes} from '~/shared/routing';
import {chainAnonymous, sessionRequestFx} from '~/shared/session';

export const currentRoute = routes.auth.register;

export const ananimusRoute = chainAnonymous(currentRoute, {
  otherwise: routes.search.open,
});

currentRoute.opened.watch(() => {
  // console.log('Register page is open');
});

ananimusRoute.opened.watch(() => {
  // console.log('Register page is open with authorized user');
});
const signUpFx = attach({effect: api.signUpFx});
const confirmPhoneFx = attach({effect: api.confirmPhone});

export const updateUserName = createEvent<string>();
export const updateEmail = createEvent<string>();
export const updatePassword = createEvent<string>();
export const updatePhone = createEvent<string>();
export const codeChanged = createEvent<string>();
export const confirmCodeChanged = createEvent<string>();

export const submittFormRegistration = createEvent();
export const confirmPhoneFormSubmitted = createEvent();

export const $userName = createStore('');
export const $userNameError = createStore<null | 'empty' | 'invalid'>(null);

export const $email = createStore('');
export const $emailError = createStore<null | 'empty' | 'invalid'>(null);

export const $password = createStore('');
export const $passwordError = createStore<null | 'empty' | 'invalid'>(null);

export const $phone = createStore('');
export const $phoneError = createStore<null | 'empty' | 'invalid'>(null);

export const $code = createStore('');
export const $confirmCode = createStore<boolean>(false);

export const $error = createStore<api.SignUpError | null>(null);
export const $fieldsPending = api.signUpFx.pending;

export const $formValid = every({
  stores: [$userNameError, $emailError, $passwordError, $phoneError],
  predicate: null,
});

$userName.on(updateUserName, (_, userName) => userName);
$email.on(updateEmail, (_, email) => email);
$password.on(updatePassword, (_, password) => password);
$phone.on(updatePhone, (_, phone) => phone);
$code.on(codeChanged, (_, code) => code);

reset({
  clock: ananimusRoute.closed,
  target: [
    $userName,
    $userNameError,
    $email,
    $emailError,
    $password,
    $passwordError,
    $phone,
    $phoneError,
    $error,
    $confirmCode,
    $code,
  ],
});

sample({
  clock: submittFormRegistration,
  source: $userName,
  fn: (userName) => {
    if (!currentUserName(userName)) return 'invalid';
    if (isEmpty(userName)) return 'empty';
    return null;
  },
  target: $userNameError,
});

sample({
  clock: submittFormRegistration,
  source: $email,
  fn: (email) => {
    if (!currentEmail(email)) return 'invalid';
    if (isEmpty(email)) return 'empty';
    return null;
  },
  target: $emailError,
});

sample({
  clock: submittFormRegistration,
  source: $password,
  fn: (password) => {
    if (!currenttPassword(password)) return 'invalid';
    if (isEmpty(password)) return 'empty';
    return null;
  },
  target: $passwordError,
});

sample({
  clock: submittFormRegistration,
  source: $phone,
  fn: (phone) => {
    if (!currentPhone(phone)) return 'invalid';
    if (isEmpty(phone)) return 'empty';
    return null;
  },
  target: $phoneError,
});

sample({
  clock: submittFormRegistration,
  source: {username: $userName, email: $email, password: $password, phone: $phone},
  filter: $formValid,
  target: signUpFx,
});

sample({
  clock: signUpFx.done,
  fn: () => true,
  target: $confirmCode,
});

$error.reset(submittFormRegistration);
$error.on(signUpFx.failData, (_, error) => error);

sample({
  clock: confirmPhoneFormSubmitted,
  source: {code: $code},
  filter: (value) => codeOk(value.code),
  target: [confirmPhoneFormSubmitted, confirmPhoneFx],
});

sample({
  clock: confirmPhoneFx.done,
  target: sessionRequestFx,
});

function currentUserName(value: string) {
  return value.length > 3;
}

function currentEmail(value: string) {
  return value.includes('@') && value.length > 5;
}

function currenttPassword(value: string) {
  return value.length > 3;
}

function currentPhone(value: string) {
  return value.length > 6;
}

function isEmpty(value: string) {
  return value.trim().length === 0;
}

function codeOk(value: string) {
  return value.trim().length === 6;
}
