import React from 'react';
import { Jumbotron, Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

// Import Componente:
import Menu from '../components/Navbar';


function HomePage({ data }) {
    return (
        <>
            <Menu />
            <Jumbotron fluid className="list">
                <style>
                    {
                        `.list {
                            background-color: #4169E1;
                            padding-top: 30px;
                            padding-bottom: 157px;
                            margin-bottom: 0rem !important;
                        }
                        .title-top {
                            color: #7FFFD4;
                        }
                        .list-meta {
                            background-color: #4169E1 !important;
                            border: .2rem solid #FFF !important;
                        }`
                    }
                </style>
                <Container>
                    <h1 className="display-4 text-center title-top" >Minhas Metas!</h1>
                    <ListGroup>
                        {data.metas.map(meta => (
                            <div key={meta._id}>
                                <ListGroupItem className="list-meta" active>
                                    <ListGroupItemHeading>{meta.name}</ListGroupItemHeading>
                                    <ListGroupItemText>{meta.descripition}</ListGroupItemText>
                                    <ListGroupItemText>{meta.status}</ListGroupItemText>
                                </ListGroupItem>
                            </div>
                        ))}
                    </ListGroup>
                </Container>
            </Jumbotron>
        </>
    );
}

// Objeto executado no servidor e após ser executado, servidor retorna HTML:
export async function getServerSideProps() {
    const response = await fetch(`http://localhost:8080/metas`);
    const data = await response.json();
    return {
        props: { data },
    };
}

export default HomePage;