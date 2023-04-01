import app from './app'

app.listen(3333, err =>{
    if(err){
        console.log("Servidor nao foi aberto");
    }else{
        console.log("Servidor aberto com sucesso http://localhost:3333");
    }
})