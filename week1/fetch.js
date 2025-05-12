function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("홍길동");
    }, 2000);
  });
}

async function main() {
  const user = await fetchUser();
  console.log(user);
}

main();
