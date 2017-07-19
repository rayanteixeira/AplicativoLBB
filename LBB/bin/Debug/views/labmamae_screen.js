LBB.labmamae_screen = function (params) {

    var viewModel = {
        //  Put the binding properties here

        textolabmamae: "<p> Criado em 2004, o programa LabMamãe está prestes a se tornar o melhor e mais completo programa <b>GRATUITO</b> de apoio informativo do estado do Pará. O Laborátio Beneficiente de Belém, realiza um excepcional acompanhamento de suas clientes no período mais especial de suas vidas, a gravidez.</p> ",
        texto1: "<p> O programa consiste no cadastro de mulheres grávidas em qualquer fase da gestação.</p>",
        texto2: "<p> Eviaremos informativos sobre a gestação e cuidados para seu bebê.</p>",
        texto3: "<p> Paletras dinâmicas para as mamães com os aspectos importantes da gestação.</p>",


        telefonemamae: {
            text: 'TELEFONE',
            type: 'danger',
            icon: 'fa fa-phone',
            onClick: function (data) {
                document.location.href = 'tel: 4005-7777';
            }
        },



        emailmamae: {
            text: 'EMAIL',
            type: 'danger',
            icon: 'fa fa-envelope',
            onClick: function (data) {
                document.location.href = "mailto: labmamae@lbb.com.br";
            //else { // we assume the device is running iOS
		    //window.plugins.phoneDialer.dial('1-800-555-1234');
           // }
            }
        }
    };
       
   
    return viewModel;
    
};