interface Response {
  token: string;
  user: {
    name: string,
    cpf: string,
    password: string,
    email: string,
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "jk12h3j21h3jk212h3jk12h3jkh12j3kh12k123hh21g3f12f3",
        user: {
          name: "Paulo Henrique",
          cpf: "016",
          password: "202cb962ac59075b964b07152d234b70",
          email: "phsistema@gmail.com",
        },
      });
    }, 2000);
  });
}