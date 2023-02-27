import { Component, createResource, createSignal } from 'solid-js';
import './styles/App.scss';

type TAdvice = string;
type TAdviceResponse = {
  slip: {
    id: string;
    advice: TAdvice;
  }
}

const fetchAdvice = async () => await fetch("https://api.adviceslip.com/advice", { method: "GET" }).then<TAdviceResponse>(res => res.json());

const App: Component = () => {

  const [ data ] = createResource(fetchAdvice);
  console.log(data.loading);
  if (!data.loading) {
    console.log(data());
  }

  return (
    <>
      <main class="container">
        <div class="wrapper">
          <div class="card">
            <div class="text">
              { !data.loading && data().slip.id }
            </div>
            <div class="text advice">
              { !data.loading && data().slip.advice }
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
