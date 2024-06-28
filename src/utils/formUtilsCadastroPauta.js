function formatar(key, valor) {
    if (value.trim() === '') {
        return null
    }

    value= value.trim()

    switch (key) {
        case 'data':
            if (valor.length === 10) {
                if (valor.indexOf("/") === 2 || valor.indexOf("-") === 2) {
                    if (valor.substring(0, 2) > 31 || valor.substring(3, 5) > 12) {
                        return null;
                    } else {
                        return valor.substring(6, 10) + "-" + valor.substring(3,5) + "-" + valor.substring (0, 2) 
                    }
                } else {
                    return null;
                }
            } else {
                return null
            }

        case 'hora':
            let PatternHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            if (PatternHora.test(valor)) {
                return valor
            } else {
                return null
            }

        case 'turno':
            if (valor === "MANHÃ" || valor === 'TARDE'){
                return valor
            } else {
                return null
            }
        
        case 'sala':
            let patternSala = ''
            if (patternSala.test(valor)) {
                return valor;
            } else {
                return null
            }

        default:
         return null
    }
}