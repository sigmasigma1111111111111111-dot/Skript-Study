const http = require("http");

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(
      {
        hostname: "localhost",
        port: 3001,
        path: path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        let result = "";
        res.on("data", (chunk) => (result += chunk));
        res.on("end", () => {
          console.log(`POST ${path} => ${res.statusCode}: ${result}`);
          resolve(JSON.parse(result));
        });
      },
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log("--- Test 1: Register admin with code 7859 ---");
  await post("/api/auth/register", {
    username: "admin1",
    password: "pass123",
    secretKey: "7859",
  });

  console.log("--- Test 2: Register guest without code ---");
  await post("/api/auth/register", { username: "guest1", password: "pass123" });

  console.log("--- Test 3: Register guest with wrong code ---");
  await post("/api/auth/register", {
    username: "guest2",
    password: "pass123",
    secretKey: "1234",
  });

  console.log("--- Test 4: Login admin ---");
  await post("/api/auth/login", { username: "admin1", password: "pass123" });

  console.log("--- Test 5: Login guest ---");
  await post("/api/auth/login", { username: "guest1", password: "pass123" });

  console.log("--- Test 6: Duplicate username ---");
  await post("/api/auth/register", { username: "admin1", password: "other" });

  console.log("--- All tests complete ---");
}

main().catch(console.error);
