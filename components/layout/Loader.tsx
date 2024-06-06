import React from "react";
 
const Loader = () => {
    return (
        <div className="d-flex justify-content-center center-loading">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
            </div>

        </div>
    )
}

export default Loader;