import { toast } from "react-toastify";

const SuccessMessage = (messageString) => {
  toast.success(messageString, {
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

export default SuccessMessage;

// how to use:
// 1. import SuccessMessage
// 2. insert when it's to be shown:
// SuccessMessage("The text you want shown");
