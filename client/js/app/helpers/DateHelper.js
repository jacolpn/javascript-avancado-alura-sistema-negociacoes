class DateHelper {
    constructor() {
        throw new Error('DateHelper não pode ser instanciada!');
    }

    static textoParaData(texto) {
        // let data = new Date(this._inputData.value.split('-'));
        // console.log(typeof(data));
        // let helper = new DateHelper();

        if (!/\d{4}-\d{2}-\d{2}/.test(texto))
           throw new Error('Deve estar no formato aaaa-mm-dd');
 
        return new Date(...texto.split('-')
           .map((item, indice) => item - indice % 2));
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }
}