LBB.labcoleta_login = function (params) {


  

    function viewModel() {

        var self = this;




    //observando qualquer mudança
    self.usuario = ko.observable('');
    self.senha = ko.observable('');

    //placeholder de usuário e senha
    self.userPlaceholder = ko.observable("digite seu usuário ");
    self.passwordPlaceholder = ko.observable("digite sua senha ");

    //validação se foi digitado usuário
    self.uservalidade = {
        validationRules: [{
            type: "required",
            message: "Seu usuário, por favor."
        }]
    };

    //validação se foi digitado senha
    self.passwordvalidade = {
        validationRules: [{
            type: "required",
            message: "Sua senha, por favor."
        }]
    };


    checkboxLoginColeta = {
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

    //ação do botão ENTRAR
    self.validarElogar = function (params) {

        var result = params.validationGroup.validate();
        if (result.isValid) {
            self.url = "http://189.2.252.117:8120/WSLbb.asmx/getCliente";
           self.parametros = "{loginCliente:'" + self.usuario() + "', senhaCliente:'" + self.senha() + "'}";
           self.loadingVisible(true);

        
        }

    };

   //ação do botão Não sou cadastrado
    self.naosoucadastrado = function (params) {
        LBB.app.navigate("labcoleta_form/");
    }

    //Animação LOADING...
    self.loadingVisible = ko.observable(false);
    loadOptions = {
        visible: self.loadingVisible,      
        message: "Aguarde por favor...",
        onShown: function () {
            setTimeout(function () {
                //acessa webservice e valida usuário
                $.ajax({
                    type: "POST",
                    url: self.url,
                    data: self.parametros,
                    //crossDomain: true,
                    cache: false,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        self.loadingVisible(false);
                        self.json = msg.d;
                        self.arrayobj = JSON.parse(self.json);
                        if (typeof self.arrayobj[0].Erro != "undefined") {
                            console.log(self.arrayobj[0].Erro);
                            DevExpress.ui.notify("login ou senha incorretos.", "error", 1500);
                        } else {
                            console.log(self.arrayobj[0].SeqCadCliente);
                            if (self.checkbox == "manterconectado") {
                                var user = JSON.stringify({ //salva usuario e senha em um objeto json user
                                    nome: self.usuario(),
                                    senha: self.senha(),
                                    seqCadCliente: self.arrayobj[0].SeqCadCliente,                                
                                });
                                localStorage.setItem("BDUsuario", user);
                                var userDados = JSON.stringify({ //salva usuario e senha em um objeto json user
                                    //nome: self.usuario(),
                                    //senha: self.senha(),
                                    //seqCadCliente: self.arrayobj[0].SeqCadCliente,
                                    nomeCliente: self.arrayobj[0].NomeCliente,// usado também para nome do responsável  
                                    cepCliente: self.arrayobj[0].Cep,
                                    enderecoCliente: self.arrayobj[0].Endereco,
                                    perimetroCliente: self.arrayobj[0].Perimetro,
                                    bairroCliente: self.arrayobj[0].Bairro,
                                    cidadeCliente: self.arrayobj[0].Cidade,
                                    sexoCliente: self.arrayobj[0].Sexo,
                                    cpfCliente: self.arrayobj[0].Cpf,
                                    rgCliente: self.arrayobj[0].Rg,
                                    orgaoEmissorRGCliente: self.arrayobj[0].OrgaoEmissor,
                                    dddTelefoneCliente: self.arrayobj[0].DddTelRes,
                                    telefoneCliente: self.arrayobj[0].TelRes,
                                    dddCelularCliente: self.arrayobj[0].DddCelular,
                                    celularCliente: self.arrayobj[0].Celular,
                                    emailCliente: self.arrayobj[0].Email,
                                    dataNascCliente: self.arrayobj[0].DataNasc,                             
                                });
                                localStorage.setItem("BDUsuarioDados", userDados);  //salva no localstorage o usuario 
                                var item1 = self.arrayobj[0].NomeCliente;
                                DevExpress.ui.notify("Bem vindo(a) " + self.arrayobj[0].NomeCliente, "success", 1500);
                                LBB.app.navigate("labcoleta_form/" + item1, { target: 'current' });

                              

                            } else {

                                DevExpress.ui.notify("Bem vindo(a) " + self.arrayobj[0].NomeCliente, "success", 1500);
                                var userSession = JSON.stringify({ //salva usuario e senha em um objeto json user
                                    nome: self.usuario(),
                                    senha: self.senha(),
                                    seqCadCliente: self.arrayobj[0].SeqCadCliente,
                                    //nomeCliente: self.arrayobj[0].NomeCliente,// usado também para nome do responsável  
                                    //cepCliente: self.arrayobj[0].Cep,
                                    //enderecoCliente: self.arrayobj[0].Endereco,
                                    //perimetroCliente: self.arrayobj[0].Perimetro,
                                    //bairroCliente: self.arrayobj[0].Bairro,
                                    //cidadeCliente: self.arrayobj[0].Cidade,
                                    //sexoCliente: self.arrayobj[0].Sexo,
                                    //cpfCliente: self.arrayobj[0].Cpf,
                                    //rgCliente: self.arrayobj[0].Rg,
                                    //orgaoEmissorRGCliente: self.arrayobj[0].OrgaoEmissor,
                                    //dddTelefoneCliente: self.arrayobj[0].DddTelRes,
                                    //telefoneCliente: self.arrayobj[0].TelRes,
                                    //dddCelularCliente: self.arrayobj[0].DddCelular,
                                    //celularCliente: self.arrayobj[0].Celular,
                                    //emailCliente: self.arrayobj[0].Email,
                                    //dataNascCliente: self.arrayobj[0].DataNasc,
                                });
                                sessionStorage.setItem("BDusuarioSession", userSession);
                                LBB.app.navigate("labcoleta_form/", { target: 'current' });
                            }


                        }

                    },
                    error: function (e) {
                        self.loadingVisible(false);
                        DevExpress.ui.notify(" Ops! Algo deu errado. Verifique sua Internet", "error", 1500);
                    },
                    failure: function (e) {
                        self.loadingVisible(false);
                        DevExpress.ui.notify(" Ops! Falha ao acessar serviço", "error", 1500);
                    }
                }
                );

              

            }, 4000);
        },    
    };


};


    return  new viewModel;
    
};