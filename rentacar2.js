var builder = require('botbuilder');
var restify = require('restify');
var moment = require('moment');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD,
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

 //OPCIONES DE MENU DE BIENVENIDA
    const reservar = 'Reservar';
    const modelo_autos = 'Modelo de Autos'
    const condiciones_alquiler = 'Condiciones de Alquiler';
    const nosotros = 'Nosotros';
    const CardNames = [reservar, modelo_autos, condiciones_alquiler, nosotros];

        //SUCURSALES A NIVEL NACIONAL 
    const calle50_bellavista = 'Calle 50-Bella Vista';
    const tocumen_aeropuerto = 'Aeropuerto de Tocumen';
    const el_cangrejo = 'El Cangrejo';
    const aeropuerto_albrook = 'Aeropuerto Local-Albrook';
    const albrook_village = 'Albrook Village';
    const aeropuerto_malek_chiriqui = 'Aeropuerto E. Malek-Chiriquí';
    const hotel_decameron = 'Hotel Decameron-Playa Farallon';
    const Sucursales = [calle50_bellavista, tocumen_aeropuerto, el_cangrejo, aeropuerto_albrook, 
                        albrook_village, aeropuerto_malek_chiriqui, hotel_decameron];

bot.dialog('/', [
       function(session){  //HEROCARD MENU PRINCIPAL
         var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    .title("NATIONAL CAR RENTAL")
                    .subtitle("BIENVENIDO A NATIONAL CAR RENTAL")
                    .text("SOMOS EL EXPERTO LOCAL DONDE QUIERA QUE VAYAS")
                    .images([
                     builder.CardImage.create(session, "https://www.aa.com/content/images/AAdvantage/eliteStatus/national-car-rental-logo.jpg")
                     ])
                    .buttons([ //BOTONES MENU PRINCIPAL
                       builder.CardAction.imBack(session,'Reservar','Reservar'),
                       builder.CardAction.imBack(session,'Modelo de Autos','Modelo de Autos'),
                       builder.CardAction.imBack(session,'Condiciones de Alquiler','Condiciones de Alquiler'),
                       builder.CardAction.imBack(session,'*Nosotros*','Nosotros'),
                    ])
            ]);
            builder.Prompts.choice(session, msg, ["Reservar","Modelo de Autos","Condiciones de Alquiler","Nosotros"]);
       },
        function(session, results) {                       
        switch (results.response.index) {
        case 0:
            session.beginDialog('/Reservar');
            break;
        case 1:
            session.beginDialog('/Modelo de Autos');
            break;
        case 2:
            session.beginDialog('/Condiciones de Alquiler');
            break;
        case 3:
            session.beginDialog('/Nosotros');
            break;
        default:
            break;
    }
    }  
]);

//  DIALOG CONSULTAR 
bot.dialog('/Reservar', [
    function(session){
        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)  //SUCURSAL calle50_bellavista 1
                    .title("Calle 50-Bella Vista")
                    .subtitle("Ciudad de Panamá Calle 50 PH Universal, Local 1s")
                    .text("Tel. +507 275-7222 +507 275-7100")
                    .images([
                        builder.CardImage.create(session, "http://www.nationalpanama.com/wp-content/uploads/2016/08/CALLE-50-NCR.jpg")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Calle 50-Bella Vista", "Calle 50-Bella Vista")
                    ]),
                new builder.HeroCard(session)  //SUCURSAL tocumen_aeropuerto 2
                    .title("Aeropuerto de Tocumen")
                    .subtitle("Ciudad de Panamá Tocumen Aeropuerto Internacional de Tocumen")
                    .text("Tel. +507 238-4144 +507 238-4031")
                    .images([
                        builder.CardImage.create(session, "http://www.nationalpanama.com/wp-content/uploads/2016/08/TOCUMEN-NCR.jpg")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Aeropuerto de Tocumen", "Aeropuerto de Tocumen")
                    ]),
                new builder.HeroCard(session)  //SUCURSAL El Cangrejo 3
                    .title("El Cangrejo")
                    .subtitle("Ciudad de Panamá El Cangrejo Calle Eusebio A. Morales")
                    .text("Tel. +507 265-5092 +507 265-5093")
                    .images([
                        builder.CardImage.create(session, "http://www.nationalpanama.com/wp-content/uploads/2016/08/EL-CANGREJO-NCR.jpg")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "El Cangrejo", "El Cangrejo")
                    ]),
                new builder.HeroCard(session)  //SUCURSAL aeropuerto_albrook 4
                    .title("Aeropuerto Local-Albrook")
                    .subtitle("Ciudad de Panamá Albrook Aeropuerto Aeropuerto Marcos A. Gelabert")
                    .text("Tel. +507 315-0416 +507 315-0417")
                    .images([
                        builder.CardImage.create(session, "http://www.nationalpanama.com/wp-content/uploads/2016/08/ALBROOK-AEROPUERTO-NCR.jpg")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Aeropuerto Local-Albrook", "Aeropuerto Local-Albrook")
                    ]),
                new builder.HeroCard(session)  //SUCURSAL albrook_village 5
                    .title("Albrook Village")
                    .subtitle("Ciudad de Panamá Albrook Village Avenida Canfield")
                    .text("Tel. +507 317-6161")
                    .images([
                        builder.CardImage.create(session, "http://www.nationalpanama.com/wp-content/uploads/2016/08/ALBROOK-VILLAGE-NCR.jpg")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Albrook Village", "Albrook Village")
                    ]),
                new builder.HeroCard(session)    //SUCURSAL aeropuerto_malek_chiriqui 6
                    .title("Aeropuerto E. Malek-Chiriquía")
                    .subtitle("Chiriquí - David David Aeropuerto Enrique Malek")
                    .text("Tel. +507 721-0000 +507 721-0974")
                    .images([
                        builder.CardImage.create(session, "http://www.nationalpanama.com/wp-content/uploads/2016/08/NCR-CHIRIQUI.jpg")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Aeropuerto E. Malek-Chiriquí", "Aeropuerto E. Malek-Chiriquí")
                    ]),
                new builder.HeroCard(session)  //SUCURSAL hotel_decameron Farallon 7
                    .title("Hotel Decameron-Playa Farallon")
                    .subtitle("Sector Playas - Playa Blanca Farallón Hotel Decameron")
                    .text("Tel. +507 993 2513")
                    .images([
                        builder.CardImage.create(session, "http://www.nationalpanama.com/wp-content/uploads/2016/08/DECAMERON-NCR.jpg")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Hotel Decameron-Playa Farallon", "Hotel Decameron-Playa Farallon")
                    ]),
            ]);
            builder.Prompts.choice(session, msg, ["Calle 50-Bella Vista","Aeropuerto de Tocumen",
        "El Cangrejo","Aeropuerto Local-Albrook","Albrook Village", "Aeropuerto E. Malek-Chiriquí",
        "Hotel Decameron-Playa Farallon"]);
       },
   
    function (session, results){
        var selectedCardSucursales = results.response.entity;
        var cardSucursales = createCardSucursales(selectedCardSucursales, session);
    }
    ]);

//FUNCION PARA OPCIONES DE SECURSALES
function createCardSucursales(selectedCardSucursales, session, results) {  //PRESENTAR SUCURSALES EN LIST
    
    switch (selectedCardSucursales) {
        case calle50_bellavista:
            session.beginDialog('/Calle 50-Bella Vista');
            break;
        case tocumen_aeropuerto:
            session.beginDialog('/Aeropuerto de Tocumen');
            break;
        case el_cangrejo:
            session.beginDialog('/El Cangrejo');
            break;
        case aeropuerto_albrook:
            session.beginDialog('/Aeropuerto Local-Albrook');
            break;
        case albrook_village:
            session.beginDialog('/Albrook Village');
            break;
        case aeropuerto_malek_chiriqui:
            session.beginDialog('/Aeropuerto E. Malek-Chiriquí');
            break;
        case hotel_decameron:
            session.beginDialog('/Hotel Decameron-Playa Farallon');
            break;
        default:
            break;
    }
}
// SUCURSAL CALLE 50-BELLA VISTA
bot.dialog('/Calle 50-Bella Vista', [
    function(session){
        builder.Prompts.number(session, "Día que retirará el auto");
    },
     function(session, results){
        session.userData.reservarfecharetiro = results.response;
        var fecharetiro = session.userData.reservarfecharetiro;
        builder.Prompts.choice(session, 'Entre cuales horas retirará el auto',["7AM-11AM","11AM-14PM","14PM-18PM"],{listStyle: builder.ListStyle.auto} );
       
     },
     function(session, results){
        //session.dialogData.time = builder.EntityRecognizer.resolveTime([results.response]);
        session.userData.reservarhoraretiro =results.response.entity;
        var horaretiro = session.userData.reservarhoraretiro;
        session.send("Retirará el auto entre las "+session.userData.reservarhoraretiro+" del día "+session.userData.reservarfecharetiro)
        builder.Prompts.number(session, "¿Días de alquiler?");
    },
    function(session, results){
        session.userData.reservardiasalquiler = results.response;
        var diasalquiler = session.userData.reservardiasalquiler;
        session.send("Con "+session.userData.reservardiasalquiler+" días de Alquiler")
        session.send('Seleccione la Marca y Modelo del Auto')
        session.beginDialog('/Marcas de Autos')
    },
    function(session, results){
        session.userData.reservarmarcadeauto = results.response.entity;
        var reservarmarcadeauto = session.userData.reservarmarcadeauto;
    
        session.userData.reservarmodeloauto = results.response.entity;
        var reservarmodeloauto = session.userData.reservarmodeloauto;
        builder.Prompts.text(session, "Ingrese su nombre completo");
    },
     function(session, results){
        session.userData.reservarnombre = results.response;
        var nombre = session.userData.reservarnombre;
        builder.Prompts.text(session, "Escriba su identificación ");
    },
    function(session, results){
        session.userData.reservaridentificacion = results.response;
        var identificacion = session.userData.reservaridentificacion;
        builder.Prompts.text(session, "Escriba su número celular ");
    },
     function(session, results){
        session.userData.reservarnumerocelular = results.response;
        var numerocelular = session.userData.reservarnumerocelular;
        builder.Prompts.text(session, "Escriba su correo electrónico ");
    },
     function(session, results){
        session.userData.reservarcorreoelectronico = results.response;
        var correoelectronico = session.userData.reservarcorreoelectronico;
        builder.Prompts.text(session, "Confirmar Reserva", 'si'|'no');
   },
     function(session, results){
        session.userData.reservarconfirmacion = results.response;
        var confirmacion = session.userData.reservarconfirmacion;
         if (confirmacion == 'si' ){
             session.send(
            "Bienvenido "+ session.userData.reservarnombre +
            "\n\ncon identificación "+session.userData.reservaridentificacion+
            "\n\nsu número celular es "+session.userData.reservarnumerocelular+
            "\n\nretirará el día "+session.userData.reservarfecharetiro+
            "\n\nsucursal Calle 50-Bella Vista"+
            "\n\nentre las horas "+session.userData.reservarhoraretiro+
            "\n\nalquilará por "+session.userData.reservardiasalquiler+" días"+
            "\n\nel auto modelo "+session.userData.reservarmodeloauto+
            "\n\nsu correo electrónico es "+session.userData.reservarcorreoelectronico+
            "\n\nel total para pagar es: B/ XX.XX ")
         }
        else{
            session.send("ha seleccionado no");
            session.beginDialog('/');
        }
    }
]);

// MODELO DE AUTOS TOYOTA
bot.dialog('/Toyota', [
    function(session){
    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                    .title("TOYOTA COROLLA")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.carztune.com/wp-content/uploads/2014/05/toyota-corolla.png")
                            .tap(builder.CardAction.showImage(session, "http://www.carztune.com/wp-content/uploads/2014/05/toyota-corolla.png")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Toyota Corolla", "Corolla")
                    ]),
                new builder.HeroCard(session)
                    .title("TOYOTA HILUX")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.toyotaqueretaro.com.mx/marcas/3251/images/landings/3704.png")
                            .tap(builder.CardAction.showImage(session, "http://www.toyotaqueretaro.com.mx/marcas/3251/images/landings/3704.png")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Toyota Hilux", "Hilux")
                    ]),
                new builder.HeroCard(session)
                    .title("TOYOTA HIACE")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://adatoyota.com/images/slide/toyota-hiace.png")
                            .tap(builder.CardAction.showImage(session, "http://adatoyota.com/images/slide/toyota-hiace.png")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Toyota Hiace", "Hiace")
                    ])
            ]);
        builder.Prompts.choice(session, msg, "Toyota Corolla|Toyota Hilux|Toyota Hiace");
        //session.endDialog(msg);    
}
    ]);

// MODELO DE AUTOS HYUNDAI
bot.dialog('/Hyundai', [
    function(session){
    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                    .title("HYUNDAI CRESTA")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.nationalpanama.com/wp-content/uploads/2016/08/Hyundai-Creta.png")
                            .tap(builder.CardAction.showImage(session, "http://www.nationalpanama.com/wp-content/uploads/2016/08/Hyundai-Creta.png")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Hyundai Cresta", "Hyundai Cresta")
                    ]),
                new builder.HeroCard(session)
                    .title("HYUNDAI MINI BUS H-1")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.nationalpanama.com/wp-content/uploads/2015/07/flota_96.png")
                            .tap(builder.CardAction.showImage(session, "http://www.nationalpanama.com/wp-content/uploads/2015/07/flota_96.png")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Hyundai Mini Bus H-1","Hyundai Mini Bus H-1")
                    ])
            ]);
        builder.Prompts.choice(session, msg, "Hyundai Cresta|Hyundai Mini Bus H-1");
        //session.endDialog(msg);    
}
    ]);

// MODELO DE AUTOS KIA
bot.dialog('/Kia', [
    function(session){
    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                    .title("KIA PICANTO")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.nationalpanama.com/wp-content/uploads/2015/07/flota_92.png")
                            .tap(builder.CardAction.showImage(session, "http://www.nationalpanama.com/wp-content/uploads/2015/07/flota_92.png")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Kia Picanto", "Kia Picanto")
                    ]),
                new builder.HeroCard(session)
                    .title("KIA CARNIVAL")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.nationalpanama.com/wp-content/uploads/2015/07/flota_67.png")
                            .tap(builder.CardAction.showImage(session, "http://www.nationalpanama.com/wp-content/uploads/2015/07/flota_67.png")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Kia Carnival","Kia Carnival")
                    ])
                    ,
                new builder.HeroCard(session)
                    .title("KIA OPTIMA")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.kia.com/es/-/media/files-from-kme/pip/navigation/jf-sw/optima_phev_520x260.png")
                            .tap(builder.CardAction.showImage(session, "http://www.kia.com/es/-/media/files-from-kme/pip/navigation/jf-sw/optima_phev_520x260.png")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Kia Optima","Kia Optima")
                    ])
            ]);
        builder.Prompts.choice(session, msg, "Kia Picanto|Kia Carnival|Kia Optima");
        //session.endDialog(msg);    
}
    ]);

//CONDICIONES ESTABLECIDAS
bot.dialog('/Condiciones de Alquiler', [
       function(session){
         var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    .title("National Car Rental")
                    .subtitle("Disfrute del servicio que usted se merece")
                    .images([
                        builder.CardImage.create(session, 'http://img.aws.ehowcdn.com/intl-620/ds-photo/getty/article/152/147/148173128.jpg','')
                    ])
                    .buttons([
                       builder.CardAction.openUrl(session, 'http://www.nationalpanama.com/condiciones-de-alquiler/', 'Conozca nuestras Condiciones de Alquiler')
                    ])
            ]);
             session.endDialog(msg);
        }
    ]);

//DIALOG INFORMACION DE LA EMPRESA
bot.dialog('/Nosotros', [
        function(session){
         var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    .title("National Car Rental")
                    .subtitle("Nosotros")
                    .text("En 1972, nace National Car Rental en Panamá, franquicia independiente con reconocida trayectoria internacional, dedicada al servicio de alquiler de vehículos particulares \ny comerciales, con opciones de Leasing Operativo y una amplia flota de vehículos siempre nuevos y en excelentes condiciones, personal especializado, servicio expedito y una variedad de paquetes y promociones, brindando a nuestros clientes los mejores beneficios del mercado.Contamos con un equipo de trabajo _100% comprometidos en atención y servicio, brindando siempre soluciones efectivas y rápidas para suplir las necesidades que requieran nuestros clientes, sean estas de tipo comercial o empresarial, o recreativa y familiar.")
                    .images([
                        builder.CardImage.create(session, 'http://www.nationalpanama.com/wp-content/uploads/2016/04/slide1.jpg','')
                    ])
                    .buttons([
                       builder.CardAction.openUrl(session, 'http://www.nationalpanama.com/', 'National Car Rental')
                    ])
            ]);
             session.endDialog(msg);
        }
    ]);

bot.dialog('/Marcas de Autos', [
    function(session){
    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
        new builder.HeroCard(session)
            .title('TOYOTA')
            .subtitle('Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales')
            .images([
                builder.CardImage.create(session, 'http://www.gasmocion.com/wp-content/uploads/2012/07/toyota-logo.png')
            ])
            .buttons([
               builder.CardAction.imBack(session, 'Toyota', 'TOYOTA')
            ]),
        new builder.HeroCard(session)
            .title('HYUNDAI')
            .subtitle('Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales')
            .images([
                builder.CardImage.create(session, 'http://www.gasmocion.com/wp-content/uploads/2012/07/hyundai-logo.png')
            ])
            .buttons([
                builder.CardAction.imBack(session, 'Hyundai', 'HYUNDAI')
            ]),
        new builder.HeroCard(session)
            .title('KIA')
            .subtitle('Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales')
            .images([
                builder.CardImage.create(session, 'http://www.ssmotors.ru/PhotoStranic/kia_logo_256_003.png')
            ])
            .buttons([
                builder.CardAction.imBack(session, 'Kia', 'KIA')
            ])     
    ]);
        builder.Prompts.choice(session, msg, "Toyota|Hyundai|Kia");
    },
        function(session, results) {                       
        switch (results.response.index) {
        case 0:
            session.beginDialog('/Toyota');
            break;
        case 1:
            session.beginDialog('/Hyundai');
            break;
        case 2:
            session.beginDialog('/Kia');
            break;
        default:
            break;
    }
    }  
]);

bot.dialog('/Modelo de Autos', [
    function(session){
    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                    .title("KIA PICANTO")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.automotoresfujiyama.com/wp-content/uploads/2014/03/picanto.png")
                            .tap(builder.CardAction.showImage(session, "http://www.automotoresfujiyama.com/wp-content/uploads/2014/03/picanto.png")),
                    ])
                  /*  .buttons([
                        builder.CardAction.imBack(session, "Ha seleccionado Kia Picanto", "KIA")
                    ])*/,
                new builder.HeroCard(session)
                    .title("HYUNDAI CRESTA")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.gaadimarket.com/images/uploaded/admin/3/nc-15-07-21-01-43-47-26815-_____default_____3.png")
                            .tap(builder.CardAction.showImage(session, "http://www.gaadimarket.com/images/uploaded/admin/3/nc-15-07-21-01-43-47-26815-_____default_____3.png")),
                    ])
                   /* .buttons([
                        builder.CardAction.imBack(session, "Ha seleccionado Hyundai Cresta", "HYUNDAI CRESTA")
                    ])*/,
                new builder.HeroCard(session)
                    .title("TOYOTA HIACE")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://adatoyota.com/images/slide/toyota-hiace.png")
                    ])
                   /* .buttons([
                        builder.CardAction.imBack(session, "Ha seleccionado Toyota Hiace", "Hiace")
                    ])*/,
                new builder.HeroCard(session)
                    .title("TOYOTA FORTUNER")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.toyota.com.ec/sites/default/files/WHITE-PEARL-CS.png")
                    ])
                   /* .buttons([
                        builder.CardAction.imBack(session, "Ha seleccionado Hyundai Cresta", "HYUNDAI CRESTA")
                    ])*/,
                new builder.HeroCard(session)
                    .title("KIA OPTIMA")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://kiamotors.com.kh/images/car/optima/car-optima.png")
                    ])
                   /* .buttons([
                        builder.CardAction.imBack(session, "Ha seleccionado Hyundai Cresta", "HYUNDAI CRESTA")
                    ])*/,
            ]);
        //builder.Prompts.choice(session, msg, "Ha seleccionado Toyota Corolla|Ha seleccionado Toyota Hilux|Ha seleccionado Toyota Hiace");
        session.endDialog(msg);
}
    ]);

/*
var order= 1234;
bot.dialog('/Facturacion', [
function (session) {
    return new builder.ReceiptCard(session)
        .title('FACTURA')
        .facts([
            builder.Fact.create(session, order++, 'Order Number'),
            builder.Fact.create(session, 'VISA 5555-****', 'Payment Method')
        ])
        .items([
            builder.ReceiptItem.create(session, '$ 38.45', 'Data Transfer')
                .quantity(368)
                .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/traffic-manager.png')),
            builder.ReceiptItem.create(session, '$ 45.00', 'App Service')
                .quantity(720)
                .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/cloud-service.png'))
        ])
        .tax('$ 7.50')
        .total('$ 90.95')
        .buttons([
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/pricing/', 'More Information')
                .image('https://raw.githubusercontent.com/amido/azure-vector-icons/master/renders/microsoft-azure.png')
        ])
  //  session.endDialog(msg);
    //session.send(msg);
} 

]);*/
