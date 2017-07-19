LBB.about_screen = function (params) {




    var viewModel = function () {


        textolbb = "O Laboratório Beneficente de Belém começou suas atividades no dia 29 de janeiro de 1961, fundado pelos doutores Hélio Couto de Oliveira e Danilo Virgílio Mendonça, ambos patologistas clínicos. Após 55 anos, o Laboratório passa a ser referência de pioneirismo, eficiência e inovação. Hoje são 25 unidades de atendimento, espalhadas nas cidades de Ananindeua, Barcarena, Belém, Bragança, Capanema, Castanhal, Marituba, Paragominas, Santa Luzia do Pará, São Miguel do Guamá e Tomé-Açú."

        versao = "versão 1.0";
        
        centralAtendimento =  {
                text: '(91) 4005-7777',
                type: 'danger',
                icon: 'fa fa-phone',
                onClick : function (data) {
                document.location.href = 'tel: 4005-7777';
            }
        };
       
     
                
       

        
};
   
  
   
return new viewModel;
    
};