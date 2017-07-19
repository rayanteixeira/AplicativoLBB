LBB.unidade_selected = function (params) {

   
    /* OBESERVACÂO IMPORTANTE
    Para enviar o objeto clicado de uma view para outra, foi necessário criar uma ROTA de navegação, 
    onde passo um "item", este é o nome da unidade clicada, e os outros dados salvo no localstorage e 
    na tela que seguirá eu recupero tudo que está no local storage.

    */
   

    

    function  viewModel(){
        //  Put the binding properties here
        var self = this;
        var unidade = params.item1; //não estou usando, mas aqui recupero o nome da unidade clicada que foi enviada da outra view

        unidaderecuperada = [];
        unidaderecuperada = localStorage.getItem("unidade")
        objeto = JSON.parse(unidaderecuperada);
        self.nomeUnidade = ("UNIDADE " + objeto.Descricao);
        self.endereco = (objeto.Endereco + ", " + objeto.Cidade + "-PA");
        self.atendimentosemanal = (objeto.HorarioFuncionamento);
        //self.atendimentofinaldesemana = (objeto.AtendimentoFinaldeSemana);
        self.imagem = objeto.UrlFoto;
        if (self.imagem == "") {
            self.imagem = "views/imagens/unidades/semfoto.png";
        }
        self.telefoneunidade = objeto.CentralAtendimento; 
        self.ir = objeto.Latitude + ", " + objeto.Longitude;

     
        
       
    
        if (objeto.Acessibilidade.toString() == "True") {
           
            self.checkAcessibilidade = "views/imagens/ic_check.png";
        } else {
           
            self.checkAcessibilidade = "views/imagens/ic_uncheck.png";
        }

        if (objeto.Estacionamento.toString() == "True") {
            
            self.checkEstacionamento = "views/imagens/ic_check.png";
        } else {
            
            self.checkEstacionamento = "views/imagens/ic_uncheck.png";
        }

        if (objeto.ColetaInfantil.toString() == "True") {
           
            self.checkColeta = "views/imagens/ic_check.png";
        } else {
            
            self.checkColeta = "views/imagens/ic_uncheck.png";
        }
        if (objeto.LabCafe.toString() == "True") {
           
            self.checkCafe = "views/imagens/ic_check.png";
        } else {
           
            self.checkCafe = "views/imagens/ic_uncheck.png";
        }

      
        /*
        unidaderecuperada = [];
        unidaderecuperada = localStorage.getItem("unidade")
        objeto = JSON.parse(unidaderecuperada);
        self.nomeUnidade = (objeto.Unidade);
        self.endereco = (objeto.Endereco + ", " + objeto.Cidade + "-PA");
        self.atendimentosemanal = (objeto.AtendimentoSemanal);
        self.atendimentofinaldesemana = (objeto.AtendimentoFinaldeSemana);
        self.imagem = objeto.ImageSrc;
        self.telefoneunidade = objeto.Telefone;
        self.ir = objeto.Latlng;
        */
        telefone = {
            text: self.telefoneunidade,
            type: 'danger',
            onClick: function (data) {
                document.location.href = 'tel:'+self.telefoneunidade;
            },
        };
        
        mapa = {
            text: 'ver mapa',
            type: 'danger',
            onClick: function (data) {
                document.location.href = "geo: 0,0?q=" + self.ir + '(' + self.nomeUnidade + ')';
                
                //Chama o navegador padrão do android;
                //document.location.href = "http://maps.google.com/maps?saddr=-1.4526951,-48.4830137&daddr=-1.4475335,-48.4833941";

                //Testar no IOS
                //
                //document.location.href = "maps:-1.4475335,-48.4833941";

                //funciona em Android
                //
                // document.location.href = " geo:-1.4475335,-48.4833941"; 


                //funciona para pegar a localizaçãp.
                /*
                var onSuccess = function (position) {
                    DevExpress.ui.notify('Latitude: ' + position.coords.latitude + '\n' +
                          'Longitude: ' + position.coords.longitude + '\n' +
                          'Altitude: ' + position.coords.altitude + '\n' +
                          'Accuracy: ' + position.coords.accuracy + '\n' +
                          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                          'Heading: ' + position.coords.heading + '\n' +
                          'Speed: ' + position.coords.speed + '\n' +
                          'Timestamp: ' + position.timestamp + '\n');
        
        
        
                    var lat = -1.4475335
                    var lng = -48.4833941
                    -1.4526951,-48.4830137
                    var str = "http://maps.google.com/maps?saddr=" + position.coords.latitude + "," + position.coords.longitude + "&daddr=" + lat + "," + lng;
                    window.open(str);
        
        
                };
        
                var onError = function () {
                    console.log("ERRO!");
                };
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
            }
        */

            }

        };
        

    };

   
    return new viewModel;


   
};

