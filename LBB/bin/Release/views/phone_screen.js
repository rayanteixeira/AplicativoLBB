LBB.phone_screen = function (params) {


    var loop = ko.observable(false),
      slideShow = ko.observable(true),
      showNavButtons = ko.observable(false),
      showIndicator = ko.observable(true),
      slideshowDelay = ko.computed(
          function () {
              return slideShow() ? 2000 : 0;
          }
      );


    var gallery = [
        "http://lbb.com.br/wp-content/uploads/2015/03/lbb_alegria.jpg",
       "http://lbb.com.br/wp-content/uploads/2015/03/lbb_responsabilidade.jpg",
       "http://lbb.com.br/wp-content/uploads/2015/03/lbb_bemestar.jpg"
    ];

 
    
    var imagens = [{
        "imagem":"views/imagens/resultados/ResultadoGlicose.jpg"
    }];

    var viewModel = function () {
       





        var pictureSource;   // picture source
        var destinationType; // sets the format of returned value

        // Wait for device API libraries to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // device APIs are available
        //
        function onDeviceReady() {
            pictureSource = navigator.camera.PictureSourceType;
            destinationType = navigator.camera.DestinationType;
        }

        // Called when a photo is successfully retrieved
        //
        onPhotoDataSuccess = function (imageData) {
            // Uncomment to view the base64-encoded image data
            // console.log(imageData);

            // Get image handle
            //
            var smallImage = document.getElementById('smallImage');

            // Unhide image elements
            //
            smallImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            smallImage.src = "data:image/jpeg;base64," + imageData;
        }

        // Called when a photo is successfully retrieved
        //
        onPhotoURISuccess =  function (imageURI) {
            // Uncomment to view the image file URI
            // console.log(imageURI);

            // Get image handle
            //
            var largeImage = document.getElementById('largeImage');

            // Unhide image elements
            //
            largeImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            largeImage.src = imageURI;
        }

        // A button will call this function
        //
        capturePhoto = function () {
            // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 50,
                destinationType: destinationType.DATA_URL
            });
        }

        // A button will call this function
        //
        capturePhotoEdit = function () {
            // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 20, allowEdit: true,
                destinationType: destinationType.DATA_URL
            });
        }

        // A button will call this function
        //
        getPhoto = function (source) {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(onPhotoURISuccess, onFail, {
                quality: 50,
                destinationType: destinationType.FILE_URI,
                sourceType: source
            });
        }

        // Called if something bad happens.
        //
        onFail = function (message) {
            alert('Failed because: ' + message);
        }






















        //window.open("views/imagens/resultados/ResultadoVariosExames.jpg", '_blank', 'location=yes')
        
        
        /*
            $('div.pinch-zoom').each(function () {
                new RTP.PinchZoom($(this), {});
            });
        
        */

        //  Put the binding properties here
        //navigator.app.loadUrl('views/imagens/resultados/ResultadoVariosExames.jpg', { openExternal: true });
  
        // window.open("views/imagens/resultados/ResultadoVariosExames.jpg", '_blank', 'location=yes')
        /*
        //galeria
        slideShow: slideShow,
        galleryOptions = {
            dataSource: gallery,
            //slideshowDelay: slideshowDelay,
            loop: loop,
            showNavButtons: showNavButtons,
            showIndicator: showIndicator 

        }
        */
    };

    return new viewModel;
};