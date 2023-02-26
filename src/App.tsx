import { Component, createResource, createSignal } from 'solid-js';
import './App.scss';
import Counter from './Counter';

type TAdvice = string;
type TAdviceResponse = {
  slip: {
    id: string;
    advice: TAdvice;
  }
}

const fetchAdvice = async () => await fetch("https://api.adviceslip.com/advice", { method: "GET" }).then<TAdviceResponse>(res => res.json());

const App: Component = () => {
  const [counter, setCounter] = createSignal(0);
  setInterval(setCounter, 1000, (c: number) => c + 1);

  const [ data ] = createResource(fetchAdvice);
  console.log(data.loading);
  if (!data.loading) {
    console.log(data());
  }
  return (
    <>
      <div>
        <h1 class="header">{counter()}</h1>
        {JSON.stringify(data())}
      </div>
      <Counter />
    </>
  );
};

export default App;
