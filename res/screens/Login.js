import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Text,
  TextInput,
} from 'react-native';
import Joi from 'react-native-joi';
// import {OutlinedTextField} from 'react-native-material-textfield';
import authHttp from '../services/authService';
import loginPic from '../assets/login.png';
import {colors} from '../commons/Colors';

const Login = props => {
  const [login, setlogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const schema = {
    login: Joi.string()
      //   .email()
      .required()
      .label('User name'),
    password: Joi.string().required(),
  };

  const validateForm = () => {
    const result = Joi.validate({login, password}, schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    result.error.details.forEach(item => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  };

  const validateProperty = (key, value) => {
    const obj = {[key]: value};
    const schema2 = {[key]: schema[key]};
    const {error} = Joi.validate(obj, schema2);
    return error ? error.details[0].message : null;
  };

  const handelLoginChange = text => {
    const errorMessage = validateProperty('login', text);
    if (errorMessage) {
      errors['login'] = errorMessage;
    } else delete errors['login'];
    setErrors({...(errors || {})});
    setlogin(text);
  };

  const handelPasswordChange = text => {
    const errorMessage = validateProperty('password', text);
    if (errorMessage) {
      errors['password'] = errorMessage;
    } else delete errors['password'];

    setErrors({...(errors || {})});
    setPassword(text);
    // console.log(login);
  };

  const navigateIn = jwt => {
    props.navigation.navigate('UploadData', {jwt});
  };

  const doSubmit = async () => {
    try {
      const jwt = await authHttp.auth.login(login, password);

      console.log(jwt);
      navigateIn(jwt);
      return;
    } catch (ex) {
      if (ex.response) {
        setErrors({login: ex.response.data});
      } else if (ex.message === 'forbidden') {
        setErrors({login: 'login or password are incorrect'});
      }
      console.log(ex.message);
    }
  };
  const handelSubmit = () => {
    const errors = validateForm();
    setErrors({...(errors || {})});
    if (errors) return;

    doSubmit();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image style={styles.img} source={loginPic} />
        <Text style={styles.textTitle}>Welcome</Text>
        <View style={styles.input}>
          <TextInput
            value={login}
            onChangeText={handelLoginChange}
            type="text"
            name="name"
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            textAlign="center"
            placeholder="User Name"
          />
          <Text style={{color: 'red'}}>{errors.login}</Text>
        </View>
        <View style={styles.input}>
          <TextInput
            value={password}
            onChangeText={handelPasswordChange}
            secureTextEntry={true}
            textAlign="center"
            placeholder="Password"
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            type="text"
            name="name"
          />
          <Text style={{color: 'red'}}>{errors.password}</Text>
        </View>
        <Button
          disabled={validateForm() ? true : false}
          title="Login"
          onPress={handelSubmit}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fffef7',
    alignItems: 'center',
  },
  input: {
    width: '60%',
    marginVertical: 4,
  },
  img: {
    height: 100,
    width: 100,
  },
  textTitle: {
    marginLeft: 20,
    width: '100%',
    color: '#64818f',
    textAlign: 'center',
    fontSize: 30,
    marginLeft: -20,
    fontWeight: '700',
    marginBottom: 30,
  },
});

export default Login;
