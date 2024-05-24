import React from "react";

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Root({children}) {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />  
    </div>
    );
}