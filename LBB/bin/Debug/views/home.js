LBB.home = function (params) {



    function viewModel() {
        var self = this;
        localStorage.removeItem('listaunidades');
        //botões com imagens
        clickIMG_labnet = function () {
            //verifica se há usuarios salvo no localstorage, caso haja então pula direto para tela de exams_home
            BDusuario = [];
            BDusuario = localStorage.getItem("BDusuario");
            if (BDusuario !== null) {
                
                objeto = JSON.parse(BDusuario);
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
            tbSaveUser = [];
            tbSaveUser = localStorage.getItem("BDusuario");
            if (tbSaveUser !== null) {
                LBB.app.navigate("labcoleta_form/");
            } else {
                LBB.app.navigate("labcoleta_login/");
            }

        };

        clickIMG_labdoutor = function () {
            //verifica se há usuarios salvo no localstorage, caso haja então pula direto para tela de exams_home
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

        //clickIMG_outroServicos = function () {
        //    LBB.app.navigate("outrosServicos_screen/");
        //};
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

        //Animação LOADING...
        self.loadPanelVisible = ko.observable(false);
        loadOptions = {
            visible: self.loadPanelVisible,
            message: "Por favor, aguarde...",
            onShown: function () {
                setTimeout(function () {

                    $.ajax({
                        type: "POST",
                        url: self.url,
                        data: self.parametros,
                        cache: false,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            self.json = msg.d;
                            var jsonresult = msg.d;
                            //self.arrayobj = JSON.parse(self.json);
                            //for (var i = 0; i < self.arrayobj.length; i++) {
                            //    listDataSource.store().insert(self.arrayobj[i]);
                            //    // console.log("laço for: " + self.arrayobj[i])
                            //}
                            //listDataSource.load();
                            sessionStorage.setItem('listaunidades', jsonresult);
                            LBB.app.navigate("unidade_screen/");
                            self.loadPanelVisible(false);
                        },
                        error: function (e) {
                            self.loadPanelVisible(false);
                            //alert("erro " + e.responseText);
                            DevExpress.ui.notify(" Ops! Algo deu errado. Verifique sua conexão com a internet", "error", 2000);
                            LBB.app.navigate("home/", { root: true });
                            
                        },
                        failure: function (e) {
                            self.loadPanelVisible(false);
                            // alert(e.responseText)
                            DevExpress.ui.notify(" Ops! Falha ao acessar serviço", "error", 2000);
                            LBB.app.navigate("home/", { root: true });
                           
                        }
                    }
       );
               
                }, 5000);
            },
            onHidden: function () {
                // self.employee(self.json);
            }
        };




    };
    return new viewModel;
};