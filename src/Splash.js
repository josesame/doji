import styled from "styled-components";
import doji from "@/assets/doji.png";

function Splash({ className }) {
  return (
    <main className={className}>
      <h1>DoJi</h1>
      <img src={doji} />
    </main>
  );
}

export default styled(Splash)`
  background: cyan;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 10vw;
    margin-bottom: 15px;
  }

  img {
    width: 100%;
    max-width: 150px;
    transition: transform 0.1s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;
