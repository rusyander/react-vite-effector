import {
  Anchor,
  Button,
  Container,
  Group,
  Input,
  Paper,
  PasswordInput,
  PinInput,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {IconAt, IconLock, IconPhone, IconUser} from '@tabler/icons-react';
import {Link} from 'atomic-router-react';
import {useUnit} from 'effector-react';
import {FormEventHandler, useEffect, useId} from 'react';
import {IMaskInput} from 'react-imask';

import {routes} from '~/shared/routing';

import {
  $code,
  $confirmCode,
  $email,
  $emailError,
  $error,
  $fieldsPending,
  $password,
  $passwordError,
  $phone,
  $phoneError,
  $userName,
  $userNameError,
  codeChanged,
  confirmPhoneFormSubmitted,
  submittFormRegistration,
  updateEmail,
  updatePassword,
  updatePhone,
  updateUserName,
} from './model';

export const RegisterPage = () => {
  const [confirmCode] = useUnit([$confirmCode]);

  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    submittFormRegistration();
  };

  if (confirmCode) return <ConfrimPhoneForm />;

  return (
    <>
      <Container size={420} my={40} w="100%" h="100vh">
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component={Link} to={routes.auth.login}>
            Log in
          </Anchor>
        </Text>

        <Paper
          component="form"
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          onSubmit={onFormSubmit}
        >
          <Username />
          <Email />
          <Password />
          <Phone />
          <ErrorView />
          <Button fullWidth mt="xl" type="submit">
            Sign up
          </Button>
        </Paper>
      </Container>
    </>
  );
};

const usernameErrorText = {
  empty: 'Username не может быть пустым',
  invalid: '',
};

function Username() {
  const [username, usernameError, fieldsPending] = useUnit([
    $userName,
    $userNameError,
    $fieldsPending,
  ]);

  return (
    <TextInput
      label="username"
      placeholder="username"
      icon={<IconUser size="0.8rem" />}
      value={username}
      onChange={(event) => updateUserName(event.target.value)}
      disabled={fieldsPending}
      error={usernameError ? usernameErrorText[usernameError] : null}
    />
  );
}

const emailErrorText = {
  empty: 'Email не может быть пустым',
  invalid: 'Неверный формат e-mail',
};

function Email() {
  const [email, emailError, fieldsPending] = useUnit([$email, $emailError, $fieldsPending]);

  return (
    <TextInput
      label="email"
      placeholder="email"
      icon={<IconAt size="0.8rem" />}
      value={email}
      onChange={(event) => updateEmail(event.target.value)}
      disabled={fieldsPending}
      error={emailError ? emailErrorText[emailError] : null}
    />
  );
}

const passwordErrorText = {
  empty: 'Пароль не может быть пустым',
  invalid: 'Пароль слишком короткий',
};

function Password() {
  const [password, passwordError, fieldsPending] = useUnit([
    $password,
    $passwordError,
    $fieldsPending,
  ]);

  return (
    <PasswordInput
      label="password"
      placeholder="your password"
      mt="md"
      icon={<IconLock size="0.8rem" />}
      value={password}
      onChange={(event) => updatePassword(event.target.value)}
      disabled={fieldsPending}
      error={passwordError ? passwordErrorText[passwordError] : null}
    />
  );
}

const phoneErrorText = {
  empty: 'Username не может быть пустым',
  invalid: '',
};

function Phone() {
  const [phone, phoneError, fieldsPending] = useUnit([$phone, $phoneError, $fieldsPending]);

  return (
    <Input.Wrapper
      label="phone"
      required
      mt="md"
      error={phoneError ? phoneErrorText[phoneError] : null}
    >
      <Input
        component={IMaskInput}
        mask="+7 (000) 000-00-00"
        placeholder="Your phone"
        icon={<IconPhone size="0.8rem" />}
        value={phone}
        disabled={fieldsPending}
        error={phoneError ? phoneErrorText[phoneError] : null}
        onChange={(event: any) => updatePhone(event.target.value)}
      />
    </Input.Wrapper>
  );
}

function ErrorView() {
  const error = useUnit($error);

  if (!error) {
    return <Space h="xl" />;
  }

  if (error?.error === 'invalid_credentials') {
    return <Text c="red">Неверный пароль и/или почта</Text>;
  }

  if (error?.error === 'user_exist') {
    return <Text c="red">Username уже занят</Text>;
  }

  return <Text c="red">Что-то пошло не так, попробуйте еще раз, пожалуйста</Text>;
}

function ConfrimPhoneForm() {
  const [code, fieldsPending] = useUnit([$code, $fieldsPending]);

  return (
    <Container size={420} my={40} w="100%" h="100vh">
      <Title align="center">Validate your phone</Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your code from sms
      </Text>

      <Group position="center" mt="lg">
        <PinInput
          value={code}
          length={6}
          disabled={fieldsPending}
          onChange={(value) => {
            codeChanged(value);
            // if (value.length === 6) {
            //   confirmPhoneFormSubmitted();
            // }
          }}
        />
      </Group>
    </Container>
  );
}
