import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useLocationSnackbar(setSnack, setOpen) {
  const location = useLocation();

  useEffect(() => {
    const { message, type } = location.state || {};

    if (message && type) {
      setSnack({ message, type });
      setOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setSnack, setOpen]);
}