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
            const coll = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 100000 });        
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
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/Cocacola.png"]});
                        break;
                    case productos[1]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/Cocalight.jpg"]});
                        break;
                    case productos[2]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/cocacola-zero.png"]});
                        break;
                    case productos[3]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/Fanta-naranja.png"]});
                        break;
                    case productos[4]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/fanta-limon.jpg"]});
                        break;
                    case productos[5]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/sprite.png"]});
                        break;
                    case productos[6]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/schweppes.png"]});
                        break;
                    case productos[7]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/estrella-damm.png"]});
                        break;
                    case productos[8]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/voll-damm.png"]});
                        break;
                    default:
                        msg.reply("De eso no tenemos precioso.");
                        break;
                }
            })
        }else if(msg.content === "!help"){ //Ir actualizando WIP
            msg.channel.send("Esto són los comandos actuales: \n!dale \n!bar \n!foto \n!carta \n!gif");
        }else if(msg.content === "!foto"){ //Ahora sabemos que puede tener links de fotos y ya sirve, si se borra la foto de internet, se tendra que cambiar
            var fotos = ["roger.jpg","alex.jpg","mario.jpg","ferranpelo.jpeg","lamapada.jpeg","polpene.jpeg","polangel.jpeg", "NilCalbo.jpeg","arnau-fumao.jpg"];
            msg.channel.send("Aquí tienes tu foto: \n", {files: ["Fotos/"+fotos[(Math.random() * (fotos.length)) << 0]]}); //Para imagenes se tiene que poner el [], sino peta, si quieres ponerlas, ponlas en la carpeta fotos, asi mas facil de acceder ;)
        }else if(msg.content === "!gif"){
            var gifs = ["notfunny.gif","joseph.gif"]
            msg.channel.send("Aquí tienes tu gif: \n",{files: ["Gifs/"+gifs[(Math.random() * (gifs.length)) << 0]]} )
        }
        else if(msg.content === "!carta"){msg.channel.send("Esto es lo que tenemos: Coca-cola, Coca-cola light, Coca-cola Zero, Fanta Naranja, Fanta Limon, Sprite, Schweppes, Estrella Damm y Voll Damm.");}
        else if(msg.author.bot){ return;} //Evita que el bot se responda a si mismo con leer un solo !
        else if(msg.mentions){return;}
        else{msg.reply("lo siento, no es un comando válido, gilipollas");}
    }
})

bot.login(token);