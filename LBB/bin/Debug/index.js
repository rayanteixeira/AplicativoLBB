window.LBB = window.LBB || {};

$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });
    // To customize the Generic theme, use the DevExtreme Theme Builder (http://js.devexpress.com/ThemeBuilder)
    // For details on how to use themes and the Theme Builder, refer to the http://js.devexpress.com/Documentation/Guide/#themes article

    $(document).on("deviceready", function () {
        navigator.splashscreen.hide();
        if(window.devextremeaddon) {
            window.devextremeaddon.setup();
        }
        $(document).on("backbutton", function () {
            DevExpress.processHardwareBackButton();
        });
    });


    



    function onNavigatingBack(e) {

        if (e.isHardwareButton && !LBB.app.canBack()) {

        
               if( e.cancel = true);{

                   var sairSim = function () {
                     
                       exitApp();
                   };

                   var sairNao = function () {
                      
                   };

                   var customDialog = DevExpress.ui.dialog.custom({
                       title: ":(",
                       message: "Você realmente deseja sair?",
                       buttons: [
                           // { text: "Sim"},
                           //{ text: "Não" },
                           { text: "Sim", clickAction: sairSim },
                           { text: "Não", clickAction: sairNao }
                       ]
                   });
                 

               
                   customDialog.show();

          }
                  
              


        //       e.cancel = true;
        //       exitApp();

               //var result = DevExpress.ui.dialog.confirm("Are you sure?", "Confirm changes");
               //result.done(function (dialogResult) {
               //    if (dialogResult)
               //        DevExpress.ui.notify("Confirmed", "success", 2000);
               //    else
               //        DevExpress.ui.notify("Canceled", "error", 2000);
               //});


        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
            case "android":
                navigator.app.exitApp();
                break;
            case "win8":
                window.external.Notify("DevExpress.ExitApp");
                break;
        }
    }


    LBB.app = new DevExpress.framework.html.HtmlApplication({
        namespace: LBB,
        layoutSet: DevExpress.framework.html.layoutSets[LBB.config.layoutSet],
        navigation: LBB.config.navigation,
        commandMapping: LBB.config.commandMapping
    });
    LBB.app.router.register(":view/:id", { view: "home", id: undefined });
    LBB.app.on("navigatingBack", onNavigatingBack);
    LBB.app.navigate();
});
