LBB.labcoleta_form = function (params) {

 
  

    
    var viewModel = function() {
     //  Put the binding properties here
     

     var self = this;
    
     self.login = "AGWEEF";
    

     // inicia para captura de foto se houver.
     var destinationType;
     document.addEventListener("deviceready", onDeviceReady, false);
     function onDeviceReady() {     
         destinationType = navigator.camera.DestinationType;
     }
   
     //validação se foi digitado usuário
     self.campoObrigatorio = {
         validationRules: [{
             type: "required",
             message: "campo obrigatório."
         }]
     };

     self.loadPanelVisible = ko.observable(false);

     //dados de cadasro PRÉ AGENDAMENTO!
     self.seqCadCliente = ko.observable()
     self.nomeCliente = ko.observable();

     //dados do plano de saúde
     self.desabilitado = ko.observable();
     self.planoCliente = ko.observable()
     self.nCarteiraPlanoCliente = ko.observable()

     //endereço cliente
     self.nomeCliente = ko.observable();
     self.enderecoCliente = ko.observable();
     self.ufCliente = ko.observable();
     self.perimetroCliente = ko.observable();
     self.cepCliente = ko.observable();
     self.bairroCliente = ko.observable("");
     self.cidadeCliente = ko.observable("");
     self.sexoCliente = ko.observable();
     self.cpfCliente = ko.observable();
     self.rgCliente = ko.observable();
     self.orgaoEmissorRGCliente = ko.observable();
     self.dddTelefoneCliente = ko.observable("");
     self.telefoneCliente = ko.observable("");
     self.dddCelularCliente = ko.observable("");
     self.celularCliente = ko.observable("");
     self.emailCliente = ko.observable();

     //dados cadastrais
     self.nomePaciente = ko.observable();
     self.nomeResponsavel = ko.observable();
     self.sexoCliente = ko.observable("");
     self.dataNascCliente = ko.observable();

     //dados da coleta
     self.descicaoExamePedidoMedico = ko.observable("");
     self.medicacoesEmUso = ko.observable("");
     self.imagemPedidoMedico = ko.observable("");
     self.dataSolicitacaoColeta = ko.observable();



     //recupera os usuários de localstorage
     self.BDusuarioDados = [];
     self.BDusuarioDados = localStorage.getItem("BDUsuarioDados");
     if (self.BDusuarioDados != null) {

         objetoCliente = JSON.parse(self.BDusuarioDados);
         console.log(objetoCliente);
         self.seqCadCliente = objetoCliente.seqCadCliente;
         self.nomeCliente = objetoCliente.nomeCliente;
      
         //endereço cliente
         self.cepCliente = ko.observable(objetoCliente.cepCliente);
         self.enderecoCliente = ko.observable(objetoCliente.enderecoCliente);
         self.perimetroCliente = ko.observable(objetoCliente.perimetroCliente); 
         self.bairroCliente = ko.observable(objetoCliente.bairroCliente);
         self.cidadeCliente = ko.observable(objetoCliente.cidadeCliente);
         //self.ufCliente = ko.observable("PA");
         
         //dados cadastrais
         self.nomePaciente = objetoCliente.nomeCliente;
         self.nomeResponsavel = objetoCliente.nomeCliente;
         self.sexoCliente = objetoCliente.sexoCliente;
         self.cpfCliente = objetoCliente.cpfCliente;
         self.rgCliente = objetoCliente.rgCliente;
         self.orgaoEmissorRGCliente = objetoCliente.orgaoEmissorRGCliente;
         self.dataNascCliente = objetoCliente.dataNascCliente;
         self.dddTelefoneCliente = objetoCliente.dddTelefoneCliente;
         self.telefoneCliente = objetoCliente.telefoneCliente;
         self.dddCelularCliente = objetoCliente.dddCelularCliente;
         self.celularCliente = objetoCliente.celularCliente;
         self.emailCliente = objetoCliente.emailCliente;
               
     }
     
   
     valorPlanodeSaude = {
         items: ['Sim', 'Não'],
         layout: 'horizontal',
         value: "Sim",
         onValueChanged: function (data) {
             self.selecionado = data.value;
             if (data.value == "Sim") {
                 console.log(self.selecionado);
                 self.desabilitado(false);
             } else {
                 console.log(self.selecionado);
                 self.desabilitado(true);
             }
         }
     }
     //valorConvenio = {
     //    value: self.convenioCliente,
     //    disabled: self.desabilitado,
     //}
  
     valorPlano = {
         value: self.planoCliente,
         disabled: self.desabilitado,
         maxLength: 40,
         onValueChanged: function (dado) {
            self.planoCliente = dado.value;
            console.log(self.planoCliente);
     }
    };

     valorNumCarteira = {
         disabled: self.desabilitado, 
         mode: 'tel',
         value: self.nCarteiraPlanoCliente, 
         maxLength: 40,
         onValueChanged : function (dado){
                self.nCarteiraPlanoCliente = dado.value;
                console.log(self.nCarteiraPlanoCliente)
            }
         
     };

     self.cepdigitado = ko.observable();
     //Endereço de coleta
     valorCep = {
         mode: "tel",
         value: self.cepCliente,
         mask: "XXXXX-XXX",
         maskRules: { "X": /[0-9]/ },
         onValueChanged: function (data) {
             cep = data.value;
             self.cepCliente = cep.replace(/^(\d{5})(\d)/, "$1-$2");
            
         }
     };

     botaoBuscarCep = function () {
         if (self.cepCliente.length < 9) {
             console.log("Digite um CEP válido");
             DevExpress.ui.dialog.alert("Digite um CEP válido");
         } else {
             self.loadPanelVisible(true)
             console.log("combusca: " + self.cepCliente);
             $.getJSON("https://viacep.com.br/ws/" +  self.cepCliente + "/json/?callback=?", function (dados) {
                 if (dados.erro == true) {
                     self.loadPanelVisible(false)
                     console.log("nao encontrado" + dados.erro);
                     DevExpress.ui.dialog.alert("CEP não encontrado ");
                 } else {
                     self.loadPanelVisible(false)
                     self.enderecoCliente(dados.logradouro);
                     self.bairroCliente(dados.bairro);
                     self.cidadeCliente(dados.localidade);
                     self.ufCliente = (dados.uf);
                     //self.cepCliente = self.cepdigitado;
                   

                 }
                 //console.log(self.objArrayCep[0].bairro)
             });


         }
     } 

     //Animação LOADING...
     loadOptions = {
         visible: self.loadPanelVisible,
         message: "Por favor, aguarde...",
         onShown: function () {
             setTimeout(function () {
                // self.loadPanelVisible(false);
             }, 4000);
         },
         onHidden: function () {
             // self.employee(self.json);
         }
     };


     valorEndereco =  {
         value: self.enderecoCliente,
         maxLength: 60,
         onValueChanged: function (dado) {
             self.enderecoCliente = dado.value;
             console.log(self.enderecoCliente)
         },
     };
     valorPerimetro = function (dado) {
         self.perimetroCliente = dado.value;
         console.log(self.perimetroCliente)
     };
     /*valorNumeroEndereco = {
         value: self.numeroEnderecoCliente,
         onValueChanged: function (dado) {
             self.numeroEnderecoCliente(dado.value)
             console.log(dado.value)
         }
     }
     valorComplementEndereco = {
         value: self.complementoEnderecoCliente,
     };
     */
     valorUF = {
         items: ['PA'],
         value: "PA",
         onValueChanged: function (dado) {    
             self.ufCliente = dado.value;
             console.log(self.ufCliente)
                 //self.CRselecionado = dado.value;
                // console.log(self.CRselecionado);       
         }

     };
     
     valorCidade = {
         maxLength: 35,
         value: self.cidadeCliente,
         onValueChanged: function (dado) {    
             self.cidadeCliente = dado.value;
             console.log(self.cidadeCliente)             
       }
     }
     valorBairro = {
         maxLength: 30,
         value: self.bairroCliente,
         onValueChanged: function (dado) {
             self.bairroCliente = dado.value;
             console.log(self.bairroCliente)
         }
     }
        
    //Dados Cadastrais
     valorNomePaciente = {
         value: self.nomePaciente,
         maxLength: 50,
         onValueChanged: function (dado) {
             self.nomePaciente = dado.value;
             console.log(self.nomePaciente)
         }
     }
     valorNomeResponsavel = {
         value: self.nomeResponsavel,
         maxLength: 50,
         onValueChanged: function (dado) {
             self.nomeResponsavel = dado.value;
             console.log(self.nomeResponsavel)
         }
     }
     valorSexo = {
         items: ["M", "F"],
         layout: 'horizontal',
         value: self.sexoCliente,
         onValueChanged: function (dado) {
             self.sexoCliente = dado.value;
                console.log(self.sexoCliente)
        }
     };
     valorCPF = {
         mode: "tel",
         mask: "XXX.XXX.XXX-XX",
         maskRules: { "X": /[0-9]/ },
         value: self.cpfCliente,
         onValueChanged: function (dado) {
             cpf = dado.value;
             self.cpfCliente = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
             console.log(self.cpfCliente);
         }
     };
     valorRG = {
         mode: "tel",
         maxLength: 25,
         value: self.rgCliente,
         onValueChanged: function (dado) {
             self.rgCliente = dado.value;
             console.log(self.rgCliente)
        }
     };
     valorOrgaoEmissor = {
         maxLength: 20,
         value: self.orgaoEmissorRGCliente,
         onValueChanged: function (dado) {
             self.orgaoEmissorRGCliente = dado.value;
             console.log(self.orgaoEmissorRGCliente)
         }
     }
     valorDatadeNasc = {
         mode: "tel",
         mask: "XX/XX/XXXX",
         maskRules: { "X": /[0-9]/ },
         value: self.dataNascCliente,
         onValueChanged: function (dado) {

             var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;

             if (!((dado.value.match(RegExPattern)) && (dado.value != ''))) {
                 DevExpress.ui.dialog.alert('Data inválida.');
             } else {
                 v = dado.value,
                 v = v.replace(/\D/g, "");                    //Remove tudo o que não é dígito
                 v = v.replace(/(\d{2})(\d)/, "$1/$2");
                 v = v.replace(/(\d{2})(\d)/, "$1/$2");
                 v = v.replace(/(\d{2})(\d{2})$/, "$1$2");
                 self.dataNascCliente = v;
                 console.log(self.dataNascCliente);
             }

             //self.dataNascCliente = dado.value;
            
         },

         //format: "date",
        
         // value: self.dataNascCliente,
         //onValueChanged: function (data) {
         //var date = new Date(data.value);
         //var ano = date.getFullYear();
         //var mes = date.getMonth() + 1;
         //var dia = date.getDate();

         //var dataSelecionada = ano + '-' + mes + '-' + dia;
         // self.dataNascCliente = dataSelecionada;
         // console.log("nascimento é " + dataSelecionada);
         //},


         

     };
     valorDDDtel = {
         value: self.dddTelefoneCliente,
         placeholder: "DDD",
         mode: "tel",
         maxLength: 2,
         onValueChanged: function (dado) {
             self.dddTelefoneCliente = dado.value
             console.log("DDD: "+ self.dddTelefoneCliente)
         }
     }
     valorTelefone = {
         value: self.telefoneCliente,
         placeholder: "TELEFONE",
         mode: "tel",
         mask: "XXXX-XXXX",
         maskRules: { "X": /[0-9]/ },
         //maxLength: 9,
         onValueChanged: function (dado) {
             self.nTelefone = dado.value,
            
             self.telefoneCliente = self.nTelefone.replace(/(\d)(\d{4})$/, "$1-$2");
             console.log("Telefone: " + self.telefoneCliente)
         }
     }
     valorDDDcel = {
         value: self.dddCelularCliente,
         placeholder: "DDD",
         mode: "tel",
         maxLength: 2,
         onValueChanged: function (dado) {
             self.dddCelularCliente = dado.value
             console.log("DDDCEL: " + self.dddCelularCliente)
         }
     }
     valorCelular = {
         value: self.celularCliente,
         placeholder: "CELULAR",
         mode: "tel",
         mask: "XXXXX-XXXX",
         maskRules: { "X": /[0-9]/ },
         //maxLength: 9,
         onValueChanged: function (dado) {
             self.nCelular = dado.value,
             //console.log(self.celularCliente)
             self.celularCliente = self.nCelular.replace(/(\d)(\d{4})$/, "$1-$2");
             console.log("CEL: " + self.celularCliente)
         }
     }
     valorEmail = {
         value: self.emailCliente,
         mode: "email",
         maxLength: 80,
         onValueChanged: function (dado) {
             self.emailCliente = dado.value,
             console.log(self.emailCliente)
         }
     }

     //Dados do Exame
     ValorExamesPedidosMedicos = {
         height: 70,   
         value: self.descicaoExamePedidoMedico,
         onValueChanged: function (dado) {
             self.descicaoExamePedidoMedico = dado.value,
             console.log(self.descicaoExamePedidoMedico)
         }
     };
     ValorMedicasoesEmUso = {
         height: 70,
         value: self.medicacoesEmUso,
         onValueChanged: function (dado) {
             self.medicacoesEmUso = dado.value,
             console.log(self.medicacoesEmUso)
         }
     };
     /* 
        ValorAnexarExame = {
         selectButtonText: "Anexar arquivo",
         labelText: "",
         accept: "image/*",
         uploadMode: "useForm",
         
     };*/

     //capturar imagem
     capturePhoto = function () {
         // Take picture using device camera and retrieve image as base64-encoded string
         navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
             quality: 50,
             destinationType: destinationType.DATA_URL
         });
     };
     onPhotoDataSuccess = function (imageData) {
         // Uncomment to view the base64-encoded image data
         // console.log(imageData);

         // Get image handle
         //
         self.smallImage = document.getElementById('smallImage');

         // Unhide image elements
         //
         self.smallImage.style.display = 'block';

         // Show the captured photo
         // The in-line CSS rules are used to resize the image
         //
         self.smallImage.src = "data:image/jpeg;base64," + imageData;
         self.imagemPedidoMedico = imageData;
         //alert(imagemPedidoMedico);
     };
     onFail = function (message) {
         DevExpress.ui.notify.alert('Falhou!');
     };
      //data da coleta
     //valorDataParaColeta = ko.observable(new Date());
     //valorDataParaColeta = {
     //    format: "date",
     //    onValueChanged: function (data) {
     //        self.dataSolicitacaoColeta(data.value);
     //       console.log("Hoje é " + data.value.toString("aaaa-MM-dd") + ".");
     //    }
        //}

  
     //valorDataParaColeta = {
     //    //format: "date",
     //       value: self.dataSolicitacaoColeta,
     //       onValueChanged: function (data) {
     //           var date = new Date(data.value)
     //           var ano = date.getFullYear();
     //           var mes = date.getMonth() + 1;
     //           var dia = date.getDate();
     //           var dataSelecionada = ano + '-' + mes + '-' + dia;
     //           self.dataSolicitacaoColeta = dataSelecionada;
     //           console.log("Hoje é " + self.dataSolicitacaoColeta);
     //       }
     //}

     var date = new Date()
     var ano = date.getFullYear();
     var mes = date.getMonth() + 1;
     var dia = date.getDate();

     self.dataSelecionada = ano + '-' + mes + '-' + dia;
     //self.dataSolicitacaoColeta = dataSelecionada;
     //console.log("Hoje é " + self.dataSelecionada)
     EnviarPreAgendamentoColeta = function (params) {
         
         var result = params.validationGroup.validate();
         if (result.isValid) {
               if (self.telefoneCliente !== "" || self.celularCliente !== "") {
                     self.loadPanelVisible(true);
                     if (self.seqCadCliente != null) {
                         var dadosCad = [{ "loginUsuario": self.login, "senhaUsuario": self.login, "seqCad": self.seqCadCliente, "planoSaude": self.planoCliente, "numeroCarteira": self.nCarteiraPlanoCliente, "nomePaciente": self.nomePaciente, "nomeResponsavel": self.nomeResponsavel, "endereco": self.enderecoCliente, "perimetro": self.perimetroCliente, "bairro": self.bairroCliente, "cep": self.cepCliente, "cidade": self.cidadeCliente, "uf": "PA", "sexo": self.sexoCliente, "cpf": self.cpfCliente, "rg": self.rgCliente, "orgaoEmissor": self.orgaoEmissorRGCliente, "dataNascimento": self.dataNascCliente, "dataSolicitada": self.dataSelecionada, "dddTelResidencial": self.dddTelefoneCliente, "telResidencial": self.telefoneCliente, "dddCelular": self.dddCelularCliente, "celular": self.celularCliente, "email": self.emailCliente, "examesPedidoMedico": self.descicaoExamePedidoMedico, "imagemPedidoMedico": self.imagemPedidoMedico, "medicacaoUso": self.medicacoesEmUso }];
                     } else {
                         var dadosCad = [{ "loginUsuario": self.login, "senhaUsuario": self.login, "planoSaude": self.planoCliente, "numeroCarteira": self.nCarteiraPlanoCliente, "nomePaciente": self.nomePaciente, "nomeResponsavel": self.nomeResponsavel, "endereco": self.enderecoCliente, "perimetro": self.perimetroCliente, "bairro": self.bairroCliente, "cep": self.cepCliente, "cidade": self.cidadeCliente, "uf": "PA", "sexo": self.sexoCliente, "cpf": self.cpfCliente, "rg": self.rgCliente, "orgaoEmissor": self.orgaoEmissorRGCliente, "dataNascimento": self.dataNascCliente, "dataSolicitada": self.dataSelecionada, "dddTelResidencial": self.dddTelefoneCliente, "telResidencial": self.telefoneCliente, "dddCelular": self.dddCelularCliente, "celular": self.celularCliente, "email": self.emailCliente, "examesPedidoMedico": self.descicaoExamePedidoMedico, "imagemPedidoMedico": self.imagemPedidoMedico, "medicacaoUso": self.medicacoesEmUso }];
                     }

                     //console.log(dadosCad[0].planoSaude)

                     $.ajax({

                         type: "POST",
                         url: "http://189.2.252.117:8120/WSLbb.asmx/gravaSolicitacaoExame",
                         // The key needs to match your method's input parameter (case-sensitive).
                         data: JSON.stringify({ DadosCad: dadosCad }),
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         success: function (data) {

                             var myData = data.d;
                             console.log("sucesso" + data.d)
                             var ret = JSON.parse(myData);
                             if (ret[0].Erro != ""){
                             DevExpress.ui.dialog.alert(ret[0].Erro);
                             //DevExpress.ui.dialog.alert("seu plano "+dadosCad[0].planoSaude);
                         }else{
                             self.loadPanelVisible(false);
                             DevExpress.ui.dialog.alert("Enviado com sucesso! Aguarde nosso contato.");
                             LBB.app.navigate("home/", { root: true });
                            }
                         },
                         error: function (e) {
                             self.loadPanelVisible(false);
                             DevExpress.ui.notify(" Ops! Falha ao solicitar coleta. Verifique sua Internet", "error", 2000);
                         },
                         failure: function (e) {
                             self.loadPanelVisible(false);
                             DevExpress.ui.notify(" Ops! Falha ao solicitar coleta", "error", 2000);
                         }
                     });   

                 } else {
                     DevExpress.ui.dialog.alert("Por favor, é necessário pelo menos um telefone .");
                 } 
         } else {
             DevExpress.ui.dialog.alert("Por favor, preencha os campos obrigatórios .");
         }
     }
}
   

    return new viewModel;
    
};

