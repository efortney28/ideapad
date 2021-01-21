import { GithubOutlined, TwitterOutlined } from "@ant-design/icons";
import "../../styles/footer.css";

const AppFooter = () => {
  return (
    <footer className="app-footer">
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
