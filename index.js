//const coll = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });

require("dotenv").config()
const token = process.env.BOT_TOKEN;
const Discord = require("discord.js")

const bot = new Discord.Client();

bot.on('ready', () =>{
    console.log('Esta online perros!');
})

bot.on('message', msg=>{
    if(msg.content.includes("!")){
        if(msg.content === "!dale"){ //Esto lo quitaria o hauria algo diferente
            msg.reply('No digas pito');     
            const coll = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });        
            coll.on('collect',msg =>{
                if(msg.content === "pito"){
                    msg.channel.send('Marrano');
                }
            })
        }else if(msg.content === '!bar'){ //Retocar el tema de productos sea un diccionario o un objeto que te devuelva la foto
            var productos = ["Coca-cola","Coca-cola light","Coca-cola Zero","Fanta Naranja", "Fanta Limon","Sprite","Schweppes","Estrella Damm","Voll Damm"];
            msg.reply("Que quieres guapetón?");      
            const coll = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
            coll.on('collect',msg =>{
                               
                switch(msg.content){ //Quizas un switch sea tope semado, pero algo es algo bro, quizas no lo parece, pero le estoy metiendo ganas a intentar que este trasto funcione
                    case productos[0]:
                        msg.channel.send("Aquí tienes: ",{files: ["https://www.cocacola.es/content/dam/GO/CokeZone/Spain/Adivina/LATA_ORIGINAL.jpg"]});
                        break;
                    case productos[1]:
                        msg.channel.send("Aquí tienes: ",{files: ["https://images-na.ssl-images-amazon.com/images/I/71CqlCwfFuL._AC_SL1500_.jpg"]});
                        break;
                    case productos[2]:
                        msg.channel.send("Aquí tienes: ",{files: ["https://www.lacapell.com/29975-thickbox_default/coca-cola-zero-lata-33cl.jpg"]});
                        break;
                    case productos[3]:
                        msg.channel.send("Aquí tienes: ",{files: ["https://www.encopadebalon.com/3497-thickbox_default/fanta-naranja-pack-24-unidades-33cl.jpg"]});
                        break;
                    case productos[4]:
                        msg.channel.send("Aquí tienes: ",{files: ["https://www.kalamazoo.es/content/images/product/38468_1_xnl.jpg"]});
                        break;
                    case productos[5]:
                        msg.channel.send("Aquí tienes: ",{files: ["https://i.pinimg.com/originals/ff/3f/6e/ff3f6ec2356fcfe9c104f883475d6355.jpg"]});
                        break;
                    case productos[6]:
                        msg.channel.send("Aquí tienes: ",{files: ["https://www.tubebidaonline.com/wp-content/uploads/2020/04/SCHWEPPES-TO%CC%81NICA.jpg"]});
                        break;
                    case productos[7]:
                        msg.channel.send("Aquí tienes: ",{files: ["https://static.ulabox.com/media/113826_l1.jpg"]});
                        break;
                    case productos[8]:
                        msg.channel.send("Aquí tienes: ",{files: ["https://www.damm.com/sites/default/files/migrate_default_content_files/voll-damm.png"]});
                        break;
                    default:
                        msg.reply("De eso no tenemos precioso.");
                        break;
                }
            })
        }else if(msg.content === "!help"){ //Ir actualizando WIP
            msg.channel.send("Esto són los comandos actuales: \n!dale \n!bar \n!foto !carta\n");
        }else if(msg.content === "!foto"){ //Ahora sabemos que puede tener links de fotos y ya sirve, si se borra la foto de internet, se tendra que cambiar
            var array = ["roger.jpg","alex.jpg","mario.jpg","ferranpelo.jpeg","lamapada.jpeg","polpene.jpeg","notfunny.gif","polangel.jpeg", "NilCalbo.jpeg"];
            msg.channel.send("Aquí tienes tu foto: \n", {files: ["Fotos/"+array[(Math.random() * (array.length)) << 0]]}); //Para imagenes se tiene que poner el [], sino peta, si quieres ponerlas, ponlas en la carpeta fotos, asi mas facil de acceder ;)
        }else if(msg.content === "!carta"){
            msg.channel.send("Esto es lo que tenemos: Coca-cola, Coca-cola light, Coca-cola Zero, Fanta Naranja, Fanta Limon, Sprite, Schweppes, Estrella Damm y Voll Damm.");
        }
        
        else if(msg.author.bot){ return;} //Evita que el bot se responda a si mismo con leer un solo !
        else if(msg.mentions){return;}
        else{msg.reply("lo siento, no es un comando válido, gilipollas");}
    }
})

bot.login(token);