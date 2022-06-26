const querySelect = (elem) => document.querySelector(elem);
const createElem = (elem) => document.createElement(elem);

const url = "http://api.nbp.pl/api/exchangerates/tables/c/last/";
const amount = querySelect("#amount");
const convertBtn = querySelect("#convert");
const currencyList = querySelect("#currencies");
const main = querySelect("main");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data[0]?.rates.forEach(({ code, bid }) => {
      const option = createElem("option");
      option.textContent = code;
      option.setAttribute("value", bid);
      option.setAttribute("tag", code);
      currencyList.appendChild(option);
    });
  })
  .catch((err) => {
    const h1 = createElem("h1");
    h1.append("Sorry unfortunately some error accured.");
    main.remove();
    h1.setAttribute("style", "font-size: 46px; text-align: center;");
    document.body.appendChild(h1);
    const p = createElem("p");
    p.append(`Error message: ${err}`);
    p.setAttribute("style", "text-align: center;");
    document.body.appendChild(p);
  });

const convert = () => {
  const value = amount.value;
  const multiplier = currencies.value;
  const span = createElem("span");
  let outcome = value * multiplier;
  outcome = Math.round(outcome * 100) / 100;
  if (sessionStorage.clickcount >= 1) {
    sessionStorage.clickcount++;
    querySelect("#outcome").remove();
    span.append(`This amount equals to ${outcome} PLN`);
    span.setAttribute("id", "outcome");
    main.append(span);
  } else {
    sessionStorage.clickcount = 1;
    span.append(`This amount equals to ${outcome} PLN`);
    span.setAttribute("id", "outcome");
    main.append(span);
  }
};
window.onbeforeunload = () => sessionStorage.removeItem("clickcount");

convertBtn.addEventListener("click", convert);

