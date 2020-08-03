import React from "react";

const DeveloperContext = React.createContext({
  user_id: "",
  email: "",
  token: "",
  role: "",
  setUser: (user) => {

  },
  logout: () => {
      
  }


});

export default DeveloperContext;
