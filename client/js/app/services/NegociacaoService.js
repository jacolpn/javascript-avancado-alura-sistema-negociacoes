class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }).catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana!');
                });
        });
    }

    obterNegociacoesDaAnterior() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }).catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior!');
                });
        });
    }

    obterNegociacoesDaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }).catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada!');
                });
        });

        /*
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', 'negociacoes/retrasada');

                xhr.onreadystatechange = () => {
                    if(xhr.readyState == 4) {
                        if(xhr.status == 200) {
                            resolve(JSON.parse(xhr.responseText)
                                .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        } else {
                            console.log(xhr.responseText);
                            reject('Não foi possível obter as negociações da semana!')
                        }
                    }    
                }

                xhr.send();    
            });
        */
    }
}