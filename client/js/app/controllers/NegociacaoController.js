class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        /*
        this._listaNegociacoes = new ListaNegociacoes(model =>
            this._negociacoesView.update(model)
        ); */

        // this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes =  new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia'
        );
        // this._listaNegociacoes = ProxyFactory.create(
            // new ListaNegociacoes(),
            // ['adiciona', 'esvazia'], (model) => {
                // this._negociacoesView.update(model);
            // }
        // );
        
       // this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem =  new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );
        // this._mensagem = ProxyFactory.create(
            // new Mensagem(), ['texto'], (model) => {
                // this._mensagemView.update(model)
            // }
        // );
        
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._limpaFormulario();

        console.log(this._listaNegociacoes.negociacoes);
    }

    importaNegociacoes() {
        let service = new NegociacaoService();
        let promise = service.obterNegociacoesDaSemana();

        promise.then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = 'Negociações da semana obtida com sucesso!';
        }).catch(erro => this._mensagem.texto = erro);

        /*
            service.obterNegociacoesDaSemana((err, negociacoes) => {
                if(err) {
                    this._mensagem.texto = err;
                    return
                }

                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociacoes importadas com sucesso!';
            });
        */
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso!';
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value,
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}