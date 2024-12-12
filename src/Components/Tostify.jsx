import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tostify() {
    const notify = () => toast.error("Wow so easy !" , {
        position: "top-center"
      });

    return (
      <div>
        <button onClick={notify}>Notify !</button>
        <ToastContainer
        position="bottom-right" // Global position for all toasts
        autoClose={5000} // Optional: Auto close delay in ms
        hideProgressBar={false} // Optional: Hide the progress bar
        newestOnTop={false} // Optional: Display newest toast on top
        closeOnClick // Optional: Close on toast click
        rtl={false} // Optional: Enable right-to-left layout
        pauseOnFocusLoss // Optional: Pause timer on focus loss
        draggable // Optional: Enable dragging the toast
        pauseOnHover // Optional: Pause timer on hover
        />
      </div>
    );
}

export default Tostify