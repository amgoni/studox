import { useState } from "react";
import Hero from "../components/Hero";
import Result from "../components/Result";
import Contact from "../components/Contact";

const Index = () => {
  const [searchCriteria, setSearchCriteria] = useState(null);

  const updateResults = (criteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <div>
      <Hero updateResults={updateResults} />
      <Result searchCriteria={searchCriteria} />
      <Contact />
    </div>
  );
};

export default Index;
