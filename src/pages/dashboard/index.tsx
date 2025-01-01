"use client";
import React, { useState } from "react";
import AddIndexModal from "../../components/modal/addIndex";

const Dashboard = () => {
  const [openmodal, setOpenModal] = useState(false);
  return (
    <>
      <button onClick={() => setOpenModal((prev) => !prev)}>open modal</button>
      <div>Dashboard</div>
      <AddIndexModal isModalOpen={openmodal} setIsModalOpen={setOpenModal} />
    </>
  );
};

export default Dashboard;
