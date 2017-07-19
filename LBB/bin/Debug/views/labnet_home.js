LBB.labnet_home = function (params) {



    var self = this;

    //recupera os usuários de localstorage e sessionstorage
    self.BDusuario = [];
    self.BDusuario = localStorage.getItem("BDusuario");
    if (self.BDusuario != null) {
        objetoCliente = JSON.parse(self.BDusuario);
        console.log(objetoCliente);
        self.nomeCliente = objetoCliente.nome;
        self.senhaCliente = objetoCliente.senha;
    } else {
        self.BDusuario = sessionStorage.getItem("BDusuarioSession");
        objetoCliente = JSON.parse(self.BDusuario);
        console.log(objetoCliente);
        self.nomeCliente = objetoCliente.nome;
        self.senhaCliente = objetoCliente.senha;
    }

    //desconectar usuário, tanto localstorage quanto sessionstorage
    desconectar = function () {


        var sairSim = function () {

               if (self.BDusuario !== null) {
                    localStorage.removeItem("BDusuario");
                    sessionStorage.removeItem("BDusuarioSession");
                   //self.tbSaveUser.splice("rayan", 1);
                    //localStorage.setItem("tbUsuarios", JSON.stringify(self.tbSaveUser));
                    //DevExpress.ui.dialog.alert("Usuário Excluido" + self.BDusuario);                 
                    LBB.app.navigate("home/", { root: true });
                }

            
        };
        var sairNao = function () {
           
        };

        var customDialog = DevExpress.ui.dialog.custom({
            title: ":(",
            message: "Você realmente deseja sair?",
            buttons: [
                { text: "Sim", onClick: sairSim },
                { text: "Não", onClick: sairNao }
            ]
        });
        customDialog.show();
  }



    //var url = "http://10.10.1.4:8120/WSLbb.asmx/getRequisicaoCliente";
    var url = "http://189.2.252.117:8120/WSLbb.asmx/getRequisicaoCliente";
    var parametros = "{loginCliente:'" + self.nomeCliente + "', senhaCliente:'" + self.senhaCliente + "'}";
    //self.loadingVisible(true);
    //acessa webservice e valida usuário
    $.ajax({
        type: "POST",
        url: url,
        data: parametros,
        //crossDomain: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            self.json = msg.d;
            self.arrayobj = JSON.parse(self.json);
            console.log("objeto sevidor " + self.arrayobj);
            console.log(msg.d);
            for (var i = 0; i < self.arrayobj.length; i++) {
                viewModel.listDataSource.store().insert(self.arrayobj[i]);
                console.log("for: " + self.arrayobj[i])
            }
            viewModel.listDataSource.load();
            //listOptions(self.json);

            //Preciso colocar uma validação para a resposta do servidor...caso positivo faça tal coisa, senao...
        },
        error: function (e) {
            console.log("erro " + e.responseText);
            DevExpress.ui.notify(" Ops! Erro ao buscar exames.", "error", 1000);
        },
        failure: function (e) {
            console.log(e.responseText)
            DevExpress.ui.notify(" Ops! Falha ao acessar serviço", "error", 1000);
        }
    });

   
    self.loadingVisible = ko.observable(false);



    var viewModel = {
        //  Put the binding properties here


        listDataSource: new DevExpress.data.DataSource({
            store: [],
            pageSize: 7,
            //searchOperation: "contains",
            searchExpr: ["NumeroRequisicao"]

        }),
        pullRefresh : ko.observable(true),
        clickRequisicao: function (e) {
            console.log("Requisição " + e.itemData.NumeroRequisicao)
            //Animação LOADING...
            self.loadingVisible(true);
            //var url = "http://10.10.1.4:8120/WSLbb.asmx/getResultadoRequisicaoCliente";
            var url = "http://189.2.252.117:8120/WSLbb.asmx/getResultadoRequisicaoCliente";
            var seqReq = e.itemData.NumeroRequisicao;
            var parametros = "{loginCliente:'" + self.nomeCliente + "', senhaCliente:'" + self.senhaCliente + "', seqReq:'" + seqReq + "' }";
            $.ajax({
                type: "POST",
                url: url,
                data: parametros,
                //crossDomain: true,
                cache: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    self.loadingVisible(false);
                    self.json = msg.d;
                    self.arrayobj = JSON.parse(self.json);
                    console.log("url imagem requisição " + self.arrayobj[0].UrlImagem);
                    console.log("json url imagem" + msg.d);
                    var urlexames = "http://189.2.252.117:8120" + self.arrayobj[0].UrlImagem;
                    //var urlexames = "http://10.10.1.4:8120" + self.arrayobj[0].UrlImagem;
                    console.log("url exames " + urlexames);
                    if (typeof self.arrayobj[0] != null) {
                        window.open(encodeURI(urlexames), '_blank', 'location=no');
                        console.log("abriu")
                    }
                },
                error: function (e) {
                    self.loadingVisible(false);        
                    DevExpress.ui.notify(" Ops! Algo deu errado." + self.usuario(), "error", 1000);
                },
                failure: function (e) {
                    self.loadingVisible(false);                
                    DevExpress.ui.notify(" Ops! Falha ao acessar serviço" + self.usuario(), "error", 1000);
                }
            });

        },

        //Loading...
        loadOptions: {
            visible: self.loadingVisible,
            message: "Aguarde por favor...",
            onShown: function () {
                setTimeout(function () {
                  
                }, 3000);
            },
        },




        searchOptions: {
            valueChangeEvent: "keyup",
            placeholder: "Buscar por requisição",
            mode: "search",
            onValueChanged: function (args) {
                this.listDataSource.searchValue(args.value);
                this.listDataSource.load();
            }
        },










    };








    // ko.applyBindings(viewModel, document.getElementById("map-demo"));



    return viewModel;
};