import { useState } from "react";

export default (defaultValue) => {
  const [value, SetValue] = useState(defaultValue);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    SetValue(value);
  };

  return { value, onChange};
};
