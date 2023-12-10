import { toast } from "react-toastify";

const SuccessMessage = (messageString) => {
  toast.success(messageString, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export default SuccessMessage;
