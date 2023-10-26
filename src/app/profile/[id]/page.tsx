import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl">UserProfile</h1>
      <p className="text-xl text-center">
        Profile page
        <p className="text-sm bg-orange-500 p-4 mt-2 text-black"> {params.id}</p>
      </p>
    </div>
  );
}
