LBB.home = function (params) {



    function viewModel() {
        var self = this;
        self.loadingVisible = ko.observable(false);

       
        //botões com imagens
        clickIMG_labnet = function () {
            //verifica se há usuarios salvo no localstorage, caso haja então pula direto para tela de exams_home
            self.BDusuario = [];
            self.BDusuario = localStorage.getItem("BDUsuario");
            if (self.BDusuario !== null) {
                
                objeto = JSON.parse(self.BDusuario);
                var item1 = objeto.nome; //para os dados da web, eu mudei de "e.itemData.Unidade" para "e.itemData.SeqUnidade", pois assim recupera todas as unidades a cada click
                //item2 = unidadeclicada; // passar somemente ID da imagem...Unidade barcarena, falta concatenar
                //DevExpress.ui.dialog.alert(item1);

                LBB.app.navigate("labnet_home/"+item1);

            } else {
                LBB.app.navigate("labnet_login/");
            }

           
        };
        
        clickIMG_labcoleta = function () {

            //verifica se há usuarios salvo no localstorage, caso haja então pula direto para tela de exams_home
            //verifica se há usuarios salvo no localstorage, caso haja então pula direto para tela de exams_home
            //self.BDusuarioDados = [];
            //self.BDusuarioDados = localStorage.getItem("BDUsuarioDados");
            //if (self.BDusuarioDados !== null) {
            //    self.loadingVisible(true);
            //    LBB.app.navigate("labcoleta_login/");
            
            //} else {
            //    localStorage.removeItem("BDUsuarioDados");
            //}
            self.BDusuario = [];
            self.BDusuario = localStorage.getItem("BDUsuario");
            if (self.BDusuario !== null) {
                
                   
                    objetoCliente = JSON.parse(self.BDusuario);
                    console.log("Cliente logado: " + objetoCliente.nome);
                    self.userCliente = objetoCliente.nome;
                    self.passCliente = objetoCliente.senha;
                    self.url = "http://189.2.252.117:8120/WSLbb.asmx/getCliente";
                    self.parametros = "{loginCliente:'" + self.userCliente + "', senhaCliente:'" + self.passCliente + "'}";

                    self.loadingVisible(true);
                    
            } else {
                    LBB.app.navigate("labcoleta_login/");
            }

        };

        //Animação LOADING...
        carregadoDadosFormulario = {
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
                                console.log("Cliente Json:" + self.arrayobj[0].Erro);
                                DevExpress.ui.notify("login ou senha incorretos.", "error", 1500);
                            } else {
                                console.log(self.arrayobj[0].SeqCadCliente);
                                self.loadingVisible(false);//salva usuario e senha em um objeto json user
                                var userDados = JSON.stringify({                               
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
                                localStorage.setItem("BDUsuarioDados", userDados);   //salva no localstorage o usuario     
                                //DevExpress.ui.notify("Bem vindo(a) " + self.arrayobj[0].NomeCliente, "success", 1500);
                                // LBB.app.navigate("labcoleta_form/", { target: 'current' });
                                var item1 = self.arrayobj[0].SeqCadCliente
                                LBB.app.navigate("labcoleta_form/" + item1);

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

        clickIMG_labdoutor = function () {
            
            //verifica se há usuarios salvo no localstorage, caso haja então pula direto para tela de exams_home
            BDdoctorLocal = [];
            BDdoctorLocal = localStorage.getItem("BDdoctorLocal");
            if (BDdoctorLocal !== null) {
                objeto = JSON.parse(BDdoctorLocal);
                var item1 = objeto.login; //para os dados da web, eu mudei de "e.itemData.Unidade" para "e.itemData.SeqUnidade", pois assim recupera todas as unidades a cada click
                //item2 = unidadeclicada; // passar somemente ID da imagem...Unidade barcarena, falta concatenar
                //DevExpress.ui.dialog.alert( item1 );

                //Para passar um parametro de uma view a outra, foi preciso criar uma variavel chamada "item" na rota de navegação
                LBB.app.navigate("labdoutor_home/" +item1);
            } else {
                LBB.app.navigate("labdoutor_login/");
            }

        };

        clickIMG_unidades = function () {
          
            LBB.app.navigate("unidade_screen/");
        };

        clickIMG_labMamae = function () {
            LBB.app.navigate("labmamae_screen/");
        };

        clickIMG_informacoes = function () {
            LBB.app.navigate("about_screen/");
        }

        click_instagram = function () {

            var url1 = "http://www.instagram.com/laboratoriobeneficente";
            window.open(encodeURI(url1), '_blank', 'location=no');
        }

        click_facebook = function () {
            var url2 = "http://www.facebook.com/LaboratorioBeneficente";
            window.open(encodeURI(url2), '_blank', 'location=no');
        }

        click_twitter = function () {
            var url3 = "http://www.twitter.com/LabBeneficente";
            window.open(encodeURI(url3), '_blank', 'location=no');
        }

     


    };
    return new viewModel;
};