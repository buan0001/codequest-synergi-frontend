import { toast } from "react-toastify";

const ErrorMessage = (errorString) => {
  toast.error(errorString, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export default ErrorMessage;
