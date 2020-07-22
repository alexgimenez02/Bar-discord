require("dotenv").config()
const token = process.env.BOT_TOKEN;
const Discord = require("discord.js")

const bot = new Discord.Client();


var users = lecturaTXT();

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
            const coll = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 5000 });
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
                        return;
                }
                
                var bebida = String(msg.content);
                var user = String(msg.author.username);
                if(user in users){
                    var user_dict = users[user];
                    if(bebida in users[user]){
                        user_dict[bebida] += 1;
                    }else{
                        user_dict[bebida] = 1;
                    }
                }else{
                    users[user] = {};
                    var user_dict = users[user];
                    user_dict[bebida] = 1;
                }
                
                escrituraArchivo(user,users[user][bebida],msg);
            });
            
        }else if(msg.content === "!help"){ //Ir actualizando WIP
            msg.member.send("Esto són los comandos actuales: \n!dale \n!bar \n!foto \n!carta \n!gif \n!mememan \n!perfil");
        }else if(msg.content === "!foto"){ //Ahora sabemos que puede tener links de fotos y ya sirve, si se borra la foto de internet, se tendra que cambiar
            const folder = "Fotos";
            const fs = require('fs');
            var fotos = [];
            fs.readdirSync(folder).forEach(file => {
                fotos.push(file);
            });
            msg.channel.send("Aquí tienes tu foto: \n", {files: ["Fotos/"+fotos[(Math.random() * (fotos.length)) << 0]]}); //Para imagenes se tiene que poner el [], sino peta, si quieres ponerlas, ponlas en la carpeta fotos, asi mas facil de acceder ;)
        }else if(msg.content === "!gif"){
            var gifs = ["notfunny.gif","joseph.gif"]
            msg.channel.send("Aquí tienes tu gif: \n",{files: ["Gifs/"+gifs[(Math.random() * (gifs.length)) << 0]]} )
        }else if(msg.content === "!carta"){msg.channel.send("Esto es lo que tenemos: Coca-cola, Coca-cola light, Coca-cola Zero, Fanta Naranja, Fanta Limon, Sprite, Schweppes, Estrella Damm y Voll Damm.");}
        else if(msg.content === "!mememan"){
            const folder = 'Mememan';
            const fs = require('fs');
            var memes = [];
            fs.readdirSync(folder).forEach(file => {
                memes.push(file);
            });
            msg.channel.send("Que meme quieres? (envia !cuales para saber que memes hay o envia !random para enviar uno aleatorio)");
            const coll = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
            coll.on('collect',msg =>{
                if(memes.includes(msg.content)){msg.channel.send({files: ["Mememan/"+msg.content]});}
                else if(msg.content === "!cuales"){
                    msg.member.send(memes);
                    msg.member.send("Copia el meme que quieras enviar al servidor");}
                else if(msg.content === "!random"){msg.channel.send({files: ["Mememan/"+memes[(Math.random()*memes.length) << 0]]});}
                else{msg.channel.send("Ese meme no lo tenemos, lo siento");}
            });
        }else if(msg.content === "!perfil"){
            let embed = new Discord.MessageEmbed();
                embed.setImage(msg.author.avatarURL());
                embed.addField("Usuario",msg.author.username);
            if(msg.author.username in users){
                const keys = Object.keys(users[msg.author.username]);
                const user_dict = users[msg.author.username];
                var embedarray = [];
                for(i = 0;i<keys.length;i++){
                    embedarray[i]=String(keys[i])+" : " +String(user_dict[keys[i]]);
                }
                embed.addField("Bebidas consumidas",embedarray);
            }else{
                embed.addField("Bebidas consumidas","Aún no has consumido nada");
            }
            embed.setColor('#275BF0');
            msg.channel.send(embed);
        }
        else if(msg.author.bot){ return;} //Evita que el bot se responda a si mismo con leer un solo !
        else if(msg.mentions){return;}
        else{msg.reply("lo siento, no es un comando válido, gilipollas");}
    }
})



function escrituraArchivo(user,numero,msg){
    var fs = require("fs"); //Llamada a file system, sin esto no tenemos archivos a escribir
    
    try{ //Si no lee bien el archivo o si tiene algun fallo durante la ejecucion, digamos que petara
        if(fs.existsSync("Users/"+user+".txt")){ //Comprueba si existe (basicamente es una repeticion del try ahora que )
            var file = fs.readFileSync("Users/"+user+".txt", {encoding: "utf8",flag: 'r+'}); //Texto leido y para editar
            if(file.includes(msg.content)){ //Si la bebida esta incluida en el texto simplemente le suma 1 al numero
                var splited_file = file.split("\n");
                var file_string = "";
                var i = 0; //Esto es para saber cual es el primer elemento, un contador sencillo
                splited_file.forEach(element =>{ //Esto va añadiendo a cada bebida la cantidad, si ha de ser cambiada, aumenta en 1
                    var keys_value = element.split(":"); 
                    if(msg.content === keys_value[0]){keys_value[1] = parseInt(keys_value[1],'10') + 1;}
                    if(i === 0){file_string += keys_value[0]+":"+keys_value[1];}
                    else{file_string += "\n"+ keys_value[0]+":"+keys_value[1];}
                    i = i + 1; //Aumenta el contador, realmente no tiene otro uso que para el primer valor
                });
                fs.writeFileSync("Users/"+user+".txt",file_string); //Reescribe el archivo a partir del texto modificado
            }else{
                file += "\n"+msg.content+":"+numero; //Sino simplemente añade la bebida a la lista de bebidas
                fs.writeFileSync("Users/"+user+".txt",file);
            }
        }else{
            console.log("Nuevo usuario usando el bar"); //Si es un nuevo usuario
            fs.writeFileSync("Users/"+user+".txt", msg.content + ":" + numero), function(err){ //Crea el fichero con el contenido y el numero
                if(err) return console.log(err); //Si hay algun error nos lo dice por consola
            }
        }
    }catch(err){console.log(err)} //En el caso de que haya errores, se dicen por consola
}
function lecturaTXT(){ //Lee cada base de datos de cada persona
    const fs = require('fs');
    var users = {}; //Crea un diccionario para guardar cada usuario

    fs.readdirSync("Users/").forEach(file => { //Por cada fichero
        
        var actualFile = fs.readFileSync("Users/"+file,{encoding : 'utf8', flag: 'r'}); //Lo lee
        var data = actualFile.split("\n"); //Guarda los datos
        var arrayData = []; 
        data.forEach(element => {
            var secondData = element.split(":"); //Separa la llave del diccionario de el valor que tiene
            arrayData.push(secondData);
        });
        var user = file.split("."); //Hace un ultimo split para separar el txt del usuario
        if(!(user[0] in users)){users[user[0]] = {};} //Si no esta ya creado crea el diccionario del propio usuario
        
        arrayData.forEach(key =>{ //Añade cada key con su valor en el diccionario del usuario
            users[user[0]][key[0]] = parseInt(key[1],'10'); 
        });
    });
    return users; //Devuelve el diccionario
}

bot.login(token);