import React, {useState} from 'react';

// Import Componente:
import Menu from '../components/Navbar';

// Imports do Bootstrap:
import { Jumbotron, Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'

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
            <Menu />
            <Jumbotron fluid className="form">
                <style>
                    {
                        `.form {
                            background-color: #4169E1;
                            color: #7FFFD4;
                            padding-top: 30px;
                            padding-bottom: 157px;
                            margin-bottom: 0rem !important;
                        }`
                    }
                </style>

                    <Container>
                        <h1 className="display-4 text-center">Cadastrar sua Meta</h1><hr />

                        {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                        {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}

                        <Form onSubmit={sendMeta}>

                            <FormGroup>
                                <Label for="name">Nome</Label>
                                <Input type="text" name="name" id="name" placeholder="Título da Meta" onChange={onInput}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="descripition">Descrição</Label>
                                <Input type="textarea" name="descripition" id="descripition" placeholder="Descrição" onChange={onInput}/>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input type="text" name="status" id="status" placeholder="Status" onChange={onInput}/>
                            </FormGroup>


                            {response.formSave ? <Button type="submit" color="danger" disabled>Enviando...</Button> :
                            <Button type="submit" outline color="warning">Cadastrar</Button>}

                        </Form>
                    </Container>
            </Jumbotron>
        </>
    );
}

export default Cadastrar;
