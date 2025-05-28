import typescriptLogo from "./typescript.svg";

import "./style.css";

import "./array/pop/pop";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="main">
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="ts-logo" alt="TypeScript logo" />
    </a>
    <h1>Custom methods of arrays and objects in Typescript</h1>
  </div>
`;
