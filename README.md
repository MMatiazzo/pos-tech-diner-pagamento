# 📁 PAGAMENTO ms 

# Micro serviço de pagamento

##### A collection com os requests está no arquivo `micro-services.postman_collection.json` na pasta `PAGAMENTO`

## End-point: criar-pagamento
#### End-point para fazer o cadastro de um pagamento
### Method: POST
>```
>http://localhost:3335/pagamento/criar-pagamentos
>```
### Body (**raw**)

```json
{
    "pagamentos": [
        {
            "_id": "663e8cb4a0d6d26299bb0c48",
            "status": "Recebido",
            "produtosIds": [
                "663bfb97a64f9e280b59ff28"
            ],
            "clienteId": "usuarioteste1@email.com.br",
            "createdAt": "2024-05-08T22:30:17.607Z",
            "updatedAt": "2024-05-08T22:51:17.875Z",
            "__v": 0
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: listar-pagamentos
#### End-point listar os pagamentos
### Method: GET
>```
>http://localhost:3335/pagamento/listar-pagamento
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: pagar-pagamento
#### End-point realizar o pagamento
### Method: POST
>```
>http://localhost:3335/pagamento/pagar
>```
### Body (**raw**)

```json
{
    "pedidoId": "b778463b-5fa2-4afe-ad84-bb429edbd936",
    "cartao": "123"
}
```
