import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Navbar,
  Contacts,
  Contact,
  AddContact,
  EditContact,
} from "./components";
import { BACKGROUND } from "./helpers/colors";
import { getAllContacts, getAllGroups } from "./services/contactService";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: BACKGROUND }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />}></Route>
        <Route
          path="/contacts"
          element={<Contacts contacts={getContacts} loading={loading} />}
        ></Route>

        <Route path="/contacts/add" element={AddContact}></Route>
        <Route path="/contacts/:contactId" element={<Contact />}></Route>
        <Route path="/contacts/edit/:contactId" element={EditContact}></Route>
      </Routes>
    </div>
  );
};

export default App;
