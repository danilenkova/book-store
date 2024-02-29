import "./footer.css";

export const Footer = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const pageHeight = document.documentElement.scrollHeight;
  const windowInnerHeight = window.innerHeight;

  return (
    // <>
    //   {
    //     (document.scrollHeight = document.offsetHeight ? (
    //       <footer style={{ position: "fixed" }}>
    //         <p>
    //           Виконано в <a href="https://prometheus.org.ua/">Prometheus</a>
    //           &#169; 2023
    //         </p>
    //       </footer>
    //     ) : (
    <footer>
      <p>
        Виконано в <a href="https://prometheus.org.ua/">Prometheus</a>
        &#169; 2023
      </p>
    </footer>
    //     ))
    //   }
    // </>
  );
};
