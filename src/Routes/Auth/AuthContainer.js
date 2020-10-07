import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import {
  CREATE_ACCOUNT,
  LOG_IN,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  //   const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");

  const [requestSecretMutation, { requestSecret }] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });

  const [createAccountMutation, { createAccount }] = useMutation(
    CREATE_ACCOUNT,
    {
      variables: {
        email: email.value,
        username: username.value,
        firstName: firstName.value,
        lastName: lastName.value,
      },
    }
  );

  const [confirmSecretMutation, { confirmSecret }] = useMutation(
    CONFIRM_SECRET,
    {
      variables: {
        email: email.value,
        secret: secret.value,
      },
    }
  );

  const [localLogInMutation, { logUserIn }] = useMutation(LOCAL_LOG_IN, {
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("You don't have an account yet, Create one");
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            toast.success(
              "We send secret code to your email. Check your inbox"
            );
            setAction("confirm");
          }
        } catch (err) {
          toast.error(err.message);
        }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation(
            username.value,
            email.value,
            firstName.value,
            lastName.value,
            "" // bio is empty when create account
          );
          if (!createAccount) {
            toast.error("Can't create account. try again");
          } else {
            toast.success("Success Create account. Try Log in");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (err) {
          toast.error(err.message);
        }
      } else if (email.value === "") {
        toast.error("Email is required");
      } else if (username.value === "") {
        toast.error("UserName is required");
      } else if (firstName.value === "") {
        toast.error("First Name is required");
      } else if (lastName.value === "") {
        toast.error("Last Name is required");
      }
    } else if (action === "confirm") {
      try {
        const {
          data: { confirmSecret : token },
        } = await confirmSecretMutation();
        
        if(token!=="" || token!==undefined){
            localLogInMutation({variables:{token}});
        }else{
            throw Error();
        }
      } catch (err) {
        toast.error("Can't Confirm secret");
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
      secret={secret}
    />
  );
};
