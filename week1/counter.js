function makeCounter() {
  let count = 0;

  const increase = () => {
    count++;
    console.log(count);
  };

  return increase;
}

const counter = makeCounter();
counter();
counter();
