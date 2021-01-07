import React, {useState} from 'react';

function Cadastrar() {

    //Adicionando estado aos copmponentes da função, contendo uma váriavel com estado atual(meta) e uma função que o atualiza(setMeta):
    const [meta, setMeta] = useState({
        name: '',
        description: '',
        status: ''
    });

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    //Pegar o valor do atributo 'name', quando o usuario realizar o 'input':
    const onInput = e => setMeta({...meta, [e.target.name]:e.target.value});

    // Não recarregar a página ao enviar o formulário
    const sendMeta = async e => {
        e.preventDefault();

        setResponse({...response, formSave: true});

        // Conectar com a API e enviar os dados:
        try {
            const res = await fetch('http://localhost:8080/metas', {
                method: 'POST',
                body: JSON.stringify(meta),
                headers: { 'Content-Type': 'application/json'}
            });

            //Configuração de exibição de mensagem:
            const respEnv = await res.json();

            if (respEnv.error) {
                setResponse({ 
                    formSave: false,
                    type: 'error',
                    message: respEnv.message
                });
            } else {
                setResponse({ 
                    formSave: false,
                    type: 'success',
                    message: respEnv.message
                });
            }   

        }catch (error) {
            setResponse({ 
                formSave: false,
                type: 'error',
                message: "Meta não cadastrada"
            });
        }
    }

    return (
        <>
            <h1>Cadastrar sua Meta!</h1><hr />

            {response.type === 'error' ? <p>{response.message}</p> : ""}
            {response.type === 'success' ? <p>{response.message}</p> : ""}

            <form onSubmit={sendMeta}>
                <label>Nome</label>
                <input type="text" name="name" id="name" placeholder="Título da Meta" onChange={onInput}></input><br/><br/>

                <label>Descrição</label>
                <input type="text" name="description" id="description" placeholder="Descrição" onChange={onInput}></input><br/><br/>

                <label>Status</label>
                <input type="text" name="status" id="status" placeholder="Status" onChange={onInput}></input><br/><br/>

                {response.formSave ? <button type="submit" disabled>Enviando...</button> :
                <button type="submit">Cadastrar</button>}

            </form>
        </>
    );
}

export default Cadastrar;
