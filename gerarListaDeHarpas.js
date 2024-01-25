import fs from "fs";
import path from "path";

console.log("Iniciando leitura do diretório...")

const harpas = "./public/assets/xml/hc";

fs.readdir(harpas, (err, files) => {
    if (err) {
        console.error("Erro ao ler a pasta", err);
        return;
    }

    const nomeDosArquivos = files.map(file => path.basename(file, path.extname(file)));
    const dados = JSON.stringify(nomeDosArquivos, null, 2);
    
    fs.writeFileSync("./public/data/nomeDasHarpas.json", dados);

    console.log("Lista de nome criada com sucesso.")
})