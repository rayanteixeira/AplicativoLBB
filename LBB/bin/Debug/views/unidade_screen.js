LBB.unidade_screen = function (params) {
   

    
   

    function viewModel () {
       
        var self = this;

        self.loadPanelVisible = ko.observable(true);

        self.usuario = ko.observable('AGWEEF');
        self.senha = ko.observable('AGWEEF');
        self.descricao = ko.observable('');
        self.url = "http://189.2.252.117:8120/WSLbb.asmx/getUnidade";
        //self.url = "http://10.10.1.4:8120/WSLbb.asmx/getUnidade";
        self.parametros = "{loginUsuario:'" + self.usuario() + "', senhaUsuario:'" + self.senha() + "', descricaoUnidade:'" + self.descricao() + "'}";
        //acessa webservice e valida usuário


        loadOptions = {
            visible: self.loadPanelVisible,
            message: "Aguarde por favor...",
            onShown: function () {
                setTimeout(function () {

                    $.ajax({
                        type: "POST",
                        url: self.url,
                        data: self.parametros,
                        //crossDomain: true,
                        cache: false,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            self.json = msg.d;
                            var jsonresult = msg.d;
                            self.arrayobj = JSON.parse(self.json);
                            for (var i = 0; i < self.arrayobj.length; i++) {
                                listDataSource.store().insert(self.arrayobj[i]);
                                // console.log("laço for: " + self.arrayobj[i])
                            }
                            listDataSource.load();
                            self.loadPanelVisible(false);

                        },
                        error: function (e) {
                            self.loadPanelVisible(false);
                            //alert("erro " + e.responseText);
                            DevExpress.ui.notify(" Ops! Algo deu errado. Verifique sua conexão com a internet", "error", 1500);
                            LBB.app.navigate("home/", { target: 'current' });
                        },
                        failure: function (e) {
                            self.loadPanelVisible(false);
                            // alert(e.responseText)
                            DevExpress.ui.notify(" Ops! Falha ao acessar serviço", "error", 1500);
                            LBB.app.navigate("home/", { target: 'current' });
                        }
                    }
       );



                    
                }, 5000);
            },      
        };


        listDataSource = new DevExpress.data.DataSource({
            store: [],
            group: function (dataItem) {
                // console.log(dataItem);
                return dataItem.Cidade;
            },
        });

        collapseGroups = ko.observable(true)

        clickUnidade = function (e) {
            //sessionStorage.clear();

            var unidadeclicada = JSON.stringify(e.itemData);
            localStorage.setItem('unidade', unidadeclicada);
            console.log(e.itemData.Acessibilidade)
            item1 = e.itemData.SeqUnidade; //para os dados da web, eu mudei de "e.itemData.Unidade" para "e.itemData.SeqUnidade", pois assim recupera todas as unidades a cada click
            //item2 = unidadeclicada; // passar somemente ID da imagem...Unidade barcarena, falta concatenar
            //DevExpress.ui.dialog.alert( item1 );

            //Para passar um parametro de uma view a outra, foi preciso criar uma variavel chamada "item" na rota de navegação
            LBB.app.navigate("unidade_selected/" + item1);


        }

       
    };
   
    return new viewModel;


   
};

