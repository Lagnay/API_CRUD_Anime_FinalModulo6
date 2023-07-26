const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("../index.js");

chai.use(chaiHttp);

let testeandoAnime;

describe("Verificación de la ruta /anime, usando método GET", () => {
  it("La ruta sin query params, contesta con un código 200", (done) => {
    chai
      .request(server)
      .get("/anime")
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("La ruta con query param 'id' válido, contesta con un código 200", (done) => {
    chai
      .request(server)
      .get("/anime?id=2")
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("La ruta con query param 'id' inválido, contesta con un código 404", (done) => {
    chai
      .request(server)
      .get("/anime?id=202")
      .end((error, response) => {
        chai.expect(response).to.have.status(404);
        done();
      });
  });

  it("La ruta con query param 'nombre' válido, contesta con un código 200", (done) => {
    chai
      .request(server)
      .get("/anime?nombre=naruto")
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("La ruta con query param 'nombre' inválido, contesta con un código 404", (done) => {
    chai
      .request(server)
      .get("/anime?nombre=animequenoexiste")
      .end((error, response) => {
        chai.expect(response).to.have.status(404);
        done();
      });
  });
});

describe("Verificación de la ruta /anime, usando método POST", () => {
  it("La ruta contesta con un código 201 al enviar un 'body'", (done) => {
    chai
      .request(server)
      .post("/anime")
      .send({
        nombre: "Daiya no Ace",
        genero: "Shōnen",
        año: "2013",
        autor: "Terajima Yuji",
      })
      .end((error, response) => {
        testeandoAnime = response.body.data.id;

        chai.expect(response).to.have.status(201);
        done();
      });
  });

  it("La ruta contesta con un código 400 al ser enviada sin un 'body'", (done) => {
    chai
      .request(server)
      .post("/anime")
      .end((error, response) => {
        chai.expect(response).to.have.status(400);
        done();
      });
  });

  it("La ruta contesta con un código 400 al ser enviada con un 'body' vacío", (done) => {
    chai
      .request(server)
      .post("/anime")
      .end((error, response) => {
        chai.expect(response).to.have.status(400);
        done();
      });
  });
});

describe("Verificación de la ruta /anime, usando el método PUT", () => {
  it("Contesta con un código 200 al actualizar un anime válido", (done) => {
    chai
      .request(server)
      .put("/anime?id=" + testeandoAnime)
      .send({
        nombre: "Daiya no Ace 2nd season",
        año: "2014",
      })
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("Contesta con un código 404 al consultar un anime que no existe", (done) => {
    chai
      .request(server)
      .put("/anime?id=100000")
      .end((error, response) => {
        chai.expect(response).to.have.status(404);
        done();
      });
  });
});

describe("Verificación de la ruta /anime, usando el método DELETE", () => {
  it("Contesta con un código 200 al eliminar un anime válido", (done) => {
    chai
      .request(server)
      .delete("/anime?id=" + testeandoAnime)
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("Contesta con un código 404 al intentar eliminar un anime inexistente", (done) => {
    chai
      .request(server)
      .delete("/anime?id=100000")
      .end((error, response) => {
        chai.expect(response).to.have.status(404);
        done();
      });
  });
});
