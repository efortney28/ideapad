import { useHistory } from "react-router-dom";
import {
  GithubOutlined,
  LeftOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import "../../styles/footer.css";

const AppFooter = () => {
  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <footer className="app-footer">
      <LeftOutlined className="back-button" onClick={handleBackClick} />
      <a
        className="social-icon-link"
        href="https://github.com/efortney28"
        target="__blank"
      >
        <GithubOutlined className="social-icon" />
      </a>
      <a
        className="social-icon-link"
        href="https://twitter.com/EFortney"
        target="__blank"
      >
        <TwitterOutlined className="social-icon" />
      </a>
    </footer>
  );
};

export default AppFooter;
