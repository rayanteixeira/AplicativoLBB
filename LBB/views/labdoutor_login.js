LBB.labdoutor_login = function (params) {

    var consehoRegional = [
     "CRM",
     "CRN",
     "CRO",
     "CRMV"
    ];

    function viewModel () {
        //  Put the binding properties here
        
        var self = this;
        self.CRselecionado = ko.observable('')
        
    CR = {
        items: consehoRegional,
        placeholder: "selecione ",
        onValueChanged: function (data) {
            self.CRselecionado = data.value;
            console.log(self.CRselecionado);
        }
    };
    checkboxlogindoctor = {
            value: ko.observable(false),
            width: "100%",
            text: "continuar conectado",
            onValueChanged: function (data) { //verifica se foi marcado o checkbok
                switch (data.value) {
                    case true:
                        self.checkbox = ("manterconectado");
                        break;
                    case false:
                        self.checkbox = ("naomanterconectado");
                        break;
                    default:
                        break;

                }
            }

    };
    


    self.login = ko.observable('');
    self.senha = ko.observable('');

    self.userPlaceholder = ko.observable("informe o nº do seu conselho ");
    self.passwordPlaceholder = ko.observable("digite sua senha ");
    self.uservalidade = {
        validationRules: [{
            type: "required",
            message: "Seu usuário, por favor."
        }]
    };
    self.passwordvalidade = {
        validationRules: [{
            type: "required",
            message: "Sua senha, por favor."
        }]
    };


           //ação do botão ENTRAR
    self.validateAndSubmit = function (params) {

        var result = params.validationGroup.validate();
        if (result.isValid) {
            self.url = "http://189.2.252.117:8120/WSLbb.asmx/getMedico";
            //var url = "http://10.10.1.4:8120/WSLbb.asmx/getMedico";
            self.parametros = "{loginMedico:'" + self.CRselecionado + " " + self.login() + "', senhaMedico:'" + self.senha() + "'}";
            self.loadingVisible(true);

           

        }

    };



   //Animação LOADING...
    self.loadingVisible = ko.observable(false);
    self.loadOptions = {
        visible: self.loadingVisible,
        message: "Por favor, aguarde...",
        onShown: function () {
            setTimeout(function () {
                //acessa webservice e valida usuário
                $.ajax({
                    type: "POST",
                    url: self.url,
                    data: self.parametros,                
                    cache: false,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        self.json = msg.d;
                        self.arrayobj = JSON.parse(self.json);
                        if (typeof self.arrayobj[0].Erro != "undefined") {
                            console.log(self.arrayobj[0].Erro);
                            DevExpress.ui.notify("login ou senha incorreto.", "error", 1000);
                        } else {
                            console.log(" SeqCadMedico" + self.arrayobj[0].SeqCadMedico);
                            self.loadingVisible(false);
                            if (self.checkbox == "manterconectado") {
                                var user = JSON.stringify({ //salva usuario e senha em um objeto json user
                                    login: self.CRselecionado + " " + self.login(),
                                    senha: self.senha(),
                                });
                                localStorage.setItem("BDdoctorLocal", user);   //salva no localstorage o usuario     
                                var item1 = self.arrayobj[0].NomeMedico;
                                DevExpress.ui.notify("Bem vindo(a) " + self.arrayobj[0].NomeMedico, "success", 2000);
                                LBB.app.navigate("labdoutor_home/" + item1, { target: 'current' });

                            } else {
                                DevExpress.ui.notify("Bem vindo(a) " + self.arrayobj[0].NomeMedico, "success", 2000);
                                var userSession = JSON.stringify({ //salva usuario e senha em um objeto json user
                                    login: self.CRselecionado + " " + self.login(),
                                    senha: self.senha(),
                                });
                                sessionStorage.setItem("BDdoctorSession", userSession);
                                LBB.app.navigate("labdoutor_home/", { target: 'current' });
                            }


                        }

                        //Preciso colocar uma validação para a resposta do servidor...caso positivo faça tal coisa, senao...
                    },
                    error: function (e) {
                        self.loadingVisible(false);
                        DevExpress.ui.notify(" Ops! Algo deu errado. Verifique sua conexão com a internet", "error", 2000);
                    },
                    failure: function (e) {
                        self.loadingVisible(false);
                        DevExpress.ui.notify(" Ops! Falha ao acessar serviço", "error", 2000);
                    }
                }
                );
            }, 3000);
        },
    };




















    };
   


    return new viewModel;
};