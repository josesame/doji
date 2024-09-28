import styled from "styled-components";
// import Splash from "@/src/Splash";
import ChartOne from "@/src/ChartOne";
import ChartTwo from "@/src/ChartTwo";
import ChartThree from "@/src/ChartThree";
import ChartFour from "@/src/ChartFour";

function App({ className }) {
  return (
    <section className={className}>
      {/* <Splash /> */}
      <ChartOne />
      <ChartTwo />
      <ChartThree />
      <ChartFour />
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
