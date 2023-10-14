import { useState } from 'react';

const useFocusedId = (initialState = null) => {
  const [focusedId, setFocusedId] = useState(initialState);

  const isFocused = (id) => {
    return id === focusedId;
  };

  const toggleFocus = (id) => {
    if (isFocused(id)) {
      setFocusedId(null);
    } else {
      setFocusedId(id);
    }
  };

  return {
    focusedId: focusedId,
    setFocusedId: setFocusedId,
    isFocused,
    toggleFocus
  };
};

export default useFocusedId;
