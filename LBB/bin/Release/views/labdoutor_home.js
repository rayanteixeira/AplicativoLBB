LBB.labdoutor_home = function (params) {

   
   



    loadingVisible = ko.observable(false);
    loadOptions = {
        visible: loadingVisible,
        message: "Por favor, aguarde...",   
        onShown: function () {
            setTimeout(function () {
                loadingVisible(false);
            }, 3000);
        },
       
    };


    function viewModel() {
        //  Put the binding properties here
        
        var self = this;
        pullRefresh = ko.observable(true);
        self.BDmedico = [];
        self.BDmedico = localStorage.getItem("BDdoctorLocal");
        if (self.BDmedico !== null) {

            objetoMedico = JSON.parse(self.BDmedico);
            console.log("Local HOME " + objetoMedico);
            self.loginMedico = objetoMedico.login;
            self.senhaMedico = objetoMedico.senha;
        } else {

            self.BDmedico = sessionStorage.getItem("BDdoctorSession");
            objetoMedico = JSON.parse(self.BDmedico);
            console.log("Session HOME " + objetoMedico);
            self.loginMedico = objetoMedico.login;
            self.senhaMedico = objetoMedico.senha;
        };

        desconectardoctor = function () {


            var sairSim = function () {

                if (self.BDmedico !== null) {
                    localStorage.removeItem("BDdoctorLocal");
                    sessionStorage.removeItem("BDdoctorSession");
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
                    { text: "Sim", clickAction: sairSim },
                    { text: "Não", clickAction: sairNao }
                ]
            });
            customDialog.show();

            // customDialog.show().done(function (dialogResult) {
            //    DevExpress.ui.notify(dialogResult, "info", 1000);
            // });

            //    if (self.BDusuario !== null) {
            //        localStorage.removeItem("BDusuario");
            //        sessionStorage.removeItem("BDusuarioSession");
            //        //self.tbSaveUser.splice("rayan", 1);
            //        //localStorage.setItem("tbUsuarios", JSON.stringify(self.tbSaveUser));
            //        //DevExpress.ui.dialog.alert("Usuário Excluido" + self.BDusuario);
            //        DevExpress.ui.dialog.custom("Usuário Excluido" + self.BDusuario);
            //        appLBB_knockout.app.navigate("home/", { root: true });
            //    }

            //};

        }






        var url = "http://189.2.252.117:8120/WSLbb.asmx/getRequisicaoMedico";
        //var url = "http://10.10.1.4:8120/WSLbb.asmx/getRequisicaoMedico";
        var parametros = "{crmMedico:'" + self.loginMedico + "', senhaMedico:'" + self.senhaMedico + "'}";
        //Animação LOADING...
       
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
                for (var i = 0; i < self.arrayobj.length; i++) {
                    self.listDataSource.store().insert(self.arrayobj[i]);
                    
                    console.log("for: " + self.arrayobj[i].NomePaciente)
                }
                self.listDataSource.pageIndex(0);
                self.listDataSource.load();
                //listOptions(self.json);
                
                //Preciso colocar uma validação para a resposta do servidor...caso positivo faça tal coisa, senao...
            },
            error: function (e) {
                //alert("erro " + e.responseText);
                DevExpress.ui.notify(" Ops! Algo deu errado." , "error", 1000);
            },
            failure: function (e) {
                //alert(e.responseText)
                DevExpress.ui.notify(" Ops! Falha ao acessar serviço", "error", 1000);
            }
        });




        self.listDataSource = new DevExpress.data.DataSource({
            store: [],
            pageSize: 7,
            searchOperation: "contains",
            searchExpr: ["NomePaciente"]

        });

        clickRequisicao = function (e) {
            console.log("Requisição " + e.itemData.NumeroRequisicao)
            //Animação LOADING...
            loadingVisible(true);

            var url = "http://189.2.252.117:8120/WSLbb.asmx/getResultadoRequisicaoMedico";
            //var url = "http://10.10.1.4:8120/WSLbb.asmx/getResultadoRequisicaoMedico";
            var seqReq = e.itemData.NumeroRequisicao;
            var parametros = "{crmMedico:'" + self.loginMedico + "', senhaMedico:'" + self.senhaMedico + "', seqReq:'" + seqReq + "' }";
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
                    console.log("url imagem requisição " + self.arrayobj[0].UrlImagem);
                    console.log("json url imagem" + msg.d);
                    var urlexames = "http://189.2.252.117:8120" + self.arrayobj[0].UrlImagem;
                    //var urlexames = "http://10.10.1.4:8120" + self.arrayobj[0].UrlImagem;
                    console.log("url exames " + urlexames);
                    if (typeof self.arrayobj[0] !== null) {
                        window.open(encodeURI(urlexames), '_blank', 'location=no');
                        console.log("abriu")
                    }
                },
                error: function (e) {
                    //alert("erro " + e.responseText);
                    DevExpress.ui.notify(" Ops! Algo deu errado." + self.usuario(), "error", 1000);
                },
                failure: function (e) {
                    //alert(e.responseText)
                    DevExpress.ui.notify(" Ops! Falha ao acessar serviço" + self.usuario(), "error", 1000);
                }
            });

        };


        

        searchOptions = {
            valueChangeEvent: "keyup",
            placeholder: "Buscar por paciente",
            mode: "search",
            onValueChanged: function (args) {
                self.listDataSource.searchValue(args.value);
                self.listDataSource.load();
            }
        };
       
    };


    return  new viewModel;
};