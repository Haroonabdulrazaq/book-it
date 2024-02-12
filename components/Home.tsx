"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import RoomItem from "./room/RoomItem";
import toast from "react-hot-toast";

const Home = () => {
  useEffect(() => {
    toast.success("Success Occured");
    toast.error("Error Occured");
  }, []);
  return (
    <div>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">All Rooms</h2>
        <a href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
        <div className="row mt-4">
          <RoomItem />
          <RoomItem />
        </div>
      </section>
    </div>
  );
};

export default Home;
