import { Link } from "react-router-dom";
import "./footer.scss";

export default function Footer() {
  return (
    <>
      <footer>
        <div>
          Виконано в <Link to="https://prometheus.org.ua/" className="footer">Prometheus</Link> © 2024
        </div>
      </footer>
    </>
  );
}
