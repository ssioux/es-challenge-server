const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload", 
  getToken: (req) => {
    console.log(req.headers)
    // Error if user doesn´t send the Token
    if (req.headers === undefined || req.headers.authorization === undefined) {
      console.log("No hay Token")
      return null;
    }

    // If Token exists, extract from string and return it
    const tokenArr = req.headers.authorization.split(" ")
    const tokenType = tokenArr[0]
    const token = tokenArr[1]

    if (tokenType !== "Bearer") {
      console.log("Tipo de token incorrecto")
      return null;
    }
    // Received Token. Return to validate
    console.log("el token ha sido entregado")
    return token

  }
})


module.exports = isAuthenticated