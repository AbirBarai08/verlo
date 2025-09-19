import { useEffect , useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import userStore from "../../Store/userStore.js";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn } = userStore();
  const [snack , setSnack] = useState({ message: "" , type: "" })

  useEffect(() => {
    const fetchUser = async () => {
      const query = new URLSearchParams(location.search);
      const redirect = query.get("redirect");

      try {
        const res = await axios.get("https://verlo-server.onrender.com/users/me", {
          withCredentials: true,
        });
        setSnack({ message: res.data.message, type: res.data.type });
        setIsLoggedIn(true);
      } catch (err) {
        const { message: errorMessage = "Something went wrong", type: errorType = "error" } = err.response?.data || {};
        setSnack({ message: errorMessage , type: errorType });
        setIsLoggedIn(false);
      } finally {
        navigate(redirect, {
          state: {
            message: snack.message , type: snack.type
          }
        } , { replace: true });
      }
    };

    fetchUser();
  }, [navigate, setIsLoggedIn, snack.message, snack.type, location.search]);

  return null;
}
