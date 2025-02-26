"use client";

import React, { useEffect, useState } from "react";

interface HomeUserFilterType {
  name: string;
}

const HomeUserForm = () => {
  const [filter, setFilter] = useState<HomeUserFilterType>({ name: "" });
  useEffect(() => {}, [filter]);

  async function onSubmit() {}

  return (
    <div className="w-full h-full border-slate-100 border-2 rounded p-2">
      UserForm
    </div>
  );
};

export default HomeUserForm;
