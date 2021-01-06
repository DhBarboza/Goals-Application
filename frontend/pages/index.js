function HomePage() {
    return <div>Welcome to Next.js!</div>
};

// Objeto executado no servidor e após ser executado, servidor retorna HTML:
export async function getServerSideProps() {
    const response = await fetch(`http://localhost:8080/metas`);
    const data = await response.json();
    return {
        props: { data },
    };
}

export default HomePage;