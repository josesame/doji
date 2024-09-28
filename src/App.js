import styled from "styled-components";
import Splash from "./Splash";

function App({ className }) {
  return (
    <section className={className}>
      <Splash />
    </section>
  );
}

export default styled(App)`
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;

  * {
    box-sizing: border-box;
  }
`;
