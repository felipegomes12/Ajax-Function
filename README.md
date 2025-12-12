# Ajax Function

Função utilitária em JavaScript para padronizar requisições AJAX com jQuery, incluindo suporte a:

* ✔️ GET com envio de parametros (param).
* ✔️ PUT com envio de parametros (param) ou com FormData (upload de arquivos + parâmetros).
* ✔️ PATH com envio de parametros (param) ou com FormData (upload de arquivos + parâmetros).
* ✔️ DELETE com envio de parametros (param).
* ✔️ POST com dados simples (application/x-www-form-urlencoded).
* ✔️ POST com FormData (upload de arquivos + parâmetros).
* ✔️ Callback de sucesso e erro.
* ✔️ Controle de envio síncrono ou assíncrono.
* ✔️ Tratamento automático de CSRF (Django) se aplicavel.

## 📖 Descrição da Função

A função submit_ajax() tem como objetivo centralizar e padronizar chamadas AJAX na aplicação, permitindo enviar requisições com ou sem arquivos, alterar comportamento de processamento e interceptar respostas com callbacks.

## 📌 Assinatura

```javascript
function submit_ajax(form, endpoint, metodo, only_data=true, async=true, onSuccess=null, onError=null)
```
## 🔍 Parâmetros

| Parâmetro   | Tipo              | Obrigatório         | Descrição                                                                        |
| ----------- | ----------------- | ------------------- | -------------------------------------------------------------------------------- |
| `form`      | object / FormData | ✔️                 | Dados a serem enviados. Pode ser `serialize()` ou `new FormData()`.              |
| `endpoint`  | string            | ✔️                 | URL do endpoint da requisição.                                                   |
| `metodo`    | string            | ✔️                 | Método HTTP: `"GET"` ou `"POST"`.                                                |
| `only_data` | boolean           | ❌ (default: true) | Se `true`, envia como URL-encoded. Se `false`, envia como `FormData` (arquivos). |
| `async`     | boolean           | ❌ (default: true) | Define se a requisição será assíncrona.                                          |
| `onSuccess` | function          | ❌                 | Callback executado quando a requisição retorna status 2xx.                       |
| `onError`   | function          | ❌                 | Callback executado em caso de erro (status 4xx/5xx).                             |

## ⚙️ Lógica interna

A função prepara um objeto ajaxOptions contendo:
* URL e método
* Token CSRF obtido automaticamente
* Tipo de resposta (JSON)
* Callbacks de sucesso e erro
* Configuração de envio dependendo do valor de only_data

## 📌 Diferença entre only_data = true e false


| only_data | contentType                           | processData | Uso                                            |
| --------- | ------------------------------------- | ----------- | ---------------------------------------------- |
| `true`    | `"application/x-www-form-urlencoded"` | `true`      | Para dados simples (GET, POST sem arquivos)    |
| `false`   | `false`                               | `false`     | Para `FormData`, permitindo upload de arquivos |



## 📚 Exemplos de Uso

Abaixo estão três exemplos cobrindo os principais cenários de uso.

## ✅ 1. Exemplo simples de GET

```javascript
submit_ajax(
    {},                                 // form vazio
    "/api/produtos/listar/",            // endpoint
    "GET",                              // método
    true,                               // only_data
    true,                               // async
    function(response) {                // onSuccess
        console.log("Dados recebidos:", response);
    },
    function(error) {                   // onError
        console.error("Erro no GET:", error);
    }
);
```

## ✅ 2. POST enviando dados simples de um formulário
HTML

```md
<form id="form_login">
    <input type="text" name="usuario">
    <input type="password" name="senha">
    <input type="hidden" name="csrfmiddlewaretoken" value="{{ csrf_token }}">
</form>
```
JS
```javascript
var dados = $("#form_login").serialize();  

submit_ajax(
    dados,
    "/api/login/",
    "POST",
    true,      // only_data = true -> envia como x-www-form-urlencoded
    true,
    function(response) {
        console.log("Login OK:", response);
    },
    function(error) {
        console.error("Erro no login:", error);
    }
);
```
## ✅ 3. POST enviando arquivos com FormData + parâmetros
HTML
```md
<form id="form_upload">
    <input type="file" name="arquivo">
    <input type="text" name="descricao">
    <input type="hidden" name="csrfmiddlewaretoken" value="{{ csrf_token }}">
</form>
```
JS
```javascript
var formData = new FormData();
formData.append("arquivo", document.querySelector("input[name='arquivo']").files[0]);
formData.append("descricao", document.querySelector("input[name='descricao']").value);
formData.append("extra_param", "valor_teste");

submit_ajax(
    formData,
    "/api/upload-arquivo/",
    "POST",
    false,     // only_data = false -> ativa multipart/FormData
    true,
    function(response) {
        console.log("Upload realizado:", response);
    },
    function(error) {
        console.error("Erro no upload:", error);
    }
);
```
## 🧪 Testando erros e respostas
Para capturar erros customizados:
```javascript
submit_ajax(data, "/api/teste/", "POST", true, true,
    function(res){ console.log("OK:", res); },
    function(err){ alert("Erro ao enviar: " + err.status); }
);
```
## 🧠 Dependência Obrigatória
Esta função requer [jQuery](https://jquery.com/).
Inclua antes de usá-la em seu HTML:
```md
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```
## 📌 Boas práticas
* Sempre inclua um campo csrfmiddlewaretoken no HTML ao usar Django.
* Prefira only_data = false ao enviar arquivos ou listas complexas.
* Utilize onSuccess e onError para feedback ao usuário.
* Evite lógica dentro da função — mantenha-a limpa e reutilizável.
## ✅Permições
Qualquer um é livre para baixar os arquivos e alterar para suprir suas necessidades.