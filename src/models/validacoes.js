const bcrypt = require('bcrypt');


function validarCampos(...params) {
    //Verifica se todos os campos estão preenchidos e não são espaços vazios
    return params.every((campo) => campo && campo.trim() !== "");
}



function validarFormatoEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
}


validarSenha = async (usuario, senhaDigitada) => {
    return await bcrypt.compare(senhaDigitada, usuario[0].senha)
}



module.exports = {
    validarCampos,
    validarFormatoEmail,
    validarSenha
}
