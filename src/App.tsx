import { useState, FormEvent } from "react";
import "./App.css";

import logoImg from "./assets/postologo.png";

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState();
  const [alcoolInput, setAlcoolInput] = useState();
  const [info, setInfo] = useState<InfoProps>();

  function calcular(event: FormEvent) {
    event.preventDefault();

    let calculo = alcoolInput / gasolinaInput;
    console.log(calculo);

    if (calculo <= 0.7) {
      setInfo({
        title: "It pays to use alcohol!",
        gasolina: FormatarMoeda(gasolinaInput),
        alcool: FormatarMoeda(alcoolInput),
      });
    } else {
      setInfo({
        title: "It pays to use gasoline!",
        gasolina: FormatarMoeda(gasolinaInput),
        alcool: FormatarMoeda(alcoolInput),
      });
    }
  }

  function FormatarMoeda(valor: number) {
    let valorFormatado = valor.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    return valorFormatado;
  }

  return (
    <div>
      <main className="container">
        <img className="logo" src={logoImg} alt="logo" />
        <h1 className="title">What is the best option?</h1>

        <form className="form" onSubmit={calcular}>
          <label>Alcohol (Price per liter)</label>
          <input
            className="input"
            type="number"
            placeholder="5,40"
            min="1"
            step="0.01"
            required
            value={alcoolInput}
            onChange={(e) => setAlcoolInput(Number(e.target.value))}
          />
          <br />

          <label>Gasoline (Price per liter)</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={gasolinaInput}
            onChange={(e) => setGasolinaInput(Number(e.target.value))}
          />
          <br />
          <br />

          <input className="button" type="submit" value="Estimate" />
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title">{info.title}</h2>

            <span> Alcohol {info.alcool}</span>
            <span>Gasoline {info.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
