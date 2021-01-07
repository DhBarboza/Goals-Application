function HomePage({ data }) {
    return (
        <>
            <h1>Minhas Metas!</h1>
            {data.metas.map(meta => (
                <div key="{meta.id}">
                    <h2>{meta.name}</h2>
                    <p>{meta.description}</p>
                    <p>{meta.status}</p>
                    <hr />
                </div>
            ))}
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