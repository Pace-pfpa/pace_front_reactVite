export function formatar(key, valor) {
    if (valor.trim() === '') {
      console.log(`Campo ${key} vazio`);
      return null;
    }
  
    valor = valor.trim();
    switch (key) {
      case 'data':
        if (valor.length === 10) {
          if (valor.indexOf("/") === 2 || valor.indexOf("-") === 2) {
            const dia = parseInt(valor.substring(0, 2), 10);
            const mes = parseInt(valor.substring(3, 5), 10);
            if (dia > 31 || mes > 12) {
              console.log(`Data inválida: ${valor}`);
              return null;
            } else {
              return valor.substring(6, 10) + "-" + valor.substring(3, 5) + "-" + valor.substring(0, 2);
            }
          } else {
            console.log(`Data inválida (formato): ${valor}`);
            return null;
          }
        } else {
          console.log(`Data inválida (tamanho): ${valor}`);
          return null;
        }
  
      case 'hora':
        const patternHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (patternHora.test(valor)) {
          return valor;
        } else {
          console.log(`Hora inválida: ${valor}`);
          return null;
        }
  
      case 'turno':
        if (valor.toUpperCase() === "MANHÃ" || valor.toUpperCase() === 'TARDE') {
          return valor.toUpperCase();
        } else {
          console.log(`Turno inválido: ${valor}`);
          return null;
        }
  
      case 'sala':
        const patternSala = /^[0-9]{1,2}$/;
        if (patternSala.test(valor)) {
          return valor;
        } else {
          console.log(`Sala inválida: ${valor}`);
          return null;
        }
  
      default:
        return null;
    }
  }
  