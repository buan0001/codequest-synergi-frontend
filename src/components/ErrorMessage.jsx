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

// how to use:
// 1. import ErrorMessage
// 2. insert when it's to be shown:
// errorMessage("The text you want shown");
