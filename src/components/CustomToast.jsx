import './../assets/css/ToastStyles.css';  // Import the custom CSS for toasts
import { ToastContainer, toast } from "react-toastify";

  export const showErrorToast = (message) => {
    toast.error(
      <div className="toast-content">
        <div className="toast-icon">⚠️</div>
        <div>
          <div className="toast-title">Error</div>
          <div className="toast-message">{message}</div>
        </div>
      </div>,
      {
        className: "custom-toast", // applies your dark style
        progressClassName: "custom-progress",
        icon: false,
        closeOnClick: true,
        autoClose: 4000,
      }
    );
  };

  export const showSuccessToast = (message) => {
    toast.error(
      <div className="toast-content">
        <div className="toast-icon">✅</div>
        <div>
          <div className="toast-title">Éxito</div>
          <div className="toast-message">{message}</div>
        </div>
      </div>,
      {
        className: "custom-toast", // applies your dark style
        progressClassName: "custom-progress",
        icon: false,
        closeOnClick: true,
        autoClose: 4000,
      }
    );
  };


export const CustomToast = () => <ToastContainer />;
