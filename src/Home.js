import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Simple Web3 Practice</h1>
      <p>this project is made by react</p>
      <p>You can Test down here,</p>
      <Link to="/main">main page</Link>
    </div>
  );
};

export default Home;
