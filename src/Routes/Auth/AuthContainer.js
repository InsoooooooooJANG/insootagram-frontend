import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { CREATE_ACCOUNT, LOG_IN } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  //   const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");

  const [requestSecret, { data }] = useMutation(LOG_IN, {
    update: (_, data) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error("You don't have an account yet, Create one");
        setTimeout(() => setAction("signUp"), 3000);
      }
    },
    variables: { email: email.value },
  });

  const createAccount = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (action == "logIn") {
      if (email.value !== "") {
        requestSecret();
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value != "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
          createAccount(username.value, email.value, firstName.value, lastName.value, "");
      } else if (email.value === "") {
        toast.error("Email is required");
      } else if (username.value === "") {
        toast.error("UserName is required");
      } else if (firstName.value === "") {
        toast.error("First Name is required");
      } else if (lastName.value === "") {
        toast.error("Last Name is required");
      }
    }
  };
  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      //   password={password}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSubmit={onSubmit}
    />
  );
};
