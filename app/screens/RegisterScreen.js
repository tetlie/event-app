import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import React, { useState } from "react";

import Screen from "../components/Screen";
import { StyleSheet } from "react-native";
import firebaseInstance from "../api/firebaseInstance";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const [firebaseError, setFirebaseError] = useState(null);
  const handleSubmit = async ({ name, email, password }) => {
    try {
      const user = await firebaseInstance
        .auth()
        .createUserWithEmailAndPassword(email, password);

      user.user.updateProfile({ displayName: name });
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
