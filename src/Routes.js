//MADE BY:- Ayush Gupta - 1910990212 - st2

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./core/contacts"
import Createcontact from "./core/createContact";
import Updatecontact from "./core/updateContact";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contact />}></Route>
        <Route path="/createcontact" exact element={<Createcontact />} />
        <Route path="/updatecontact/:contactId" exact element={<Updatecontact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;