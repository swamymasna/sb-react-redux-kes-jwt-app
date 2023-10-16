import React from "react";
import notfoundImg from "../../../../assets/img/notfound-404.jpg";

const NotFound404: React.FC = () => {
  return (
    <>
      <div className="text-center mt-3">
        <img src={notfoundImg} width={1000} height={550} alt="" />
      </div>
    </>
  );
};

export default NotFound404;
