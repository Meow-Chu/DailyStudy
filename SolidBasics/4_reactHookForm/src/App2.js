import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

export default function App2() {
  return (
    <BrowserRouter>
      <Link to="/"> home </Link>
      <Link to="/one"> one </Link>
      <Link to="/two"> two </Link>
      <Link to="/three"> three </Link>
      <Link to="/blog/1"> four_1 </Link>
      <Link to="/blog/2"> four_2 </Link>
      <Link to="/blog/3"> four_3 </Link>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/one" element={<One name="licat" />} />
        <Route path="/two" element={<Two />} />
        <Route path="/three" element={<Three />} />
        <Route path="/blog/:ID" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

function Index() {
  return <h1>hello world0</h1>;
}
function One({ name }) {
  return <h1>{name} hello world1</h1>;
}
function Two() {
  return <h1>hello world2</h1>;
}
function Three() {
  return <h1>hello world3</h1>;
}

function Blog() {
  const { ID } = useParams();
  const [currentID, setCurrentID] = useState(ID);
  const prevIDRef = useRef();

  useEffect(() => {
    if (prevIDRef.current !== undefined) {
      setCurrentID(prevIDRef.current);
    }
    return () => {
      prevIDRef.current = ID;
    };
  }, [ID]);

  return <h1>hello Blog {currentID} </h1>;
}
