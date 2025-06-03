import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [livros, setLivros] = useState([]);
    const [editoras, setEditoras] = useState([]);

    const buscarTodosLivros = () => {
        axios.get('http://localhost:4000/livro').then(res => {
            setLivros(res.data);
            setCategoriaSelecionada(null);
        });
    };

    useEffect(() => {
        axios.get('http://localhost:4000/categoria').then(res => setCategorias(res.data));
        axios.get('http://localhost:4000/editora').then(res => setEditoras(res.data));
        buscarTodosLivros();
    }, []);

    const buscarLivros = (idcategoria) => {
        axios.get('http://localhost:4000/livro').then(res => {
            setLivros(res.data.filter(l => l.idcategoria === idcategoria));
            setCategoriaSelecionada(idcategoria);
        });
    };

    const getNomeEditora = (id) => {
        const ed = editoras.find(e => e.ideditora === id);
        return ed ? ed.nomeeditora : id;
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <button
                            className={`btn btn-secondary btn-lg m-2${categoriaSelecionada === null ? " active" : ""}`}
                            onClick={buscarTodosLivros}
                        >
                            Todas as categorias
                        </button>
                        {categorias.map(cat => (
                            <button
                                key={cat.idcategoria}
                                className={`btn btn-primary btn-lg m-2${categoriaSelecionada === cat.idcategoria ? " active" : ""}`}
                                onClick={() => buscarLivros(cat.idcategoria)}
                            >
                                {cat.nomecategoria}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <h4>
                            {categoriaSelecionada
                                ? "Livros da categoria selecionada"
                                : "Todos os livros"}
                        </h4>
                        <div className="row">
                            {livros.map(l => (
                                <div className="col-md-4 mb-4" key={l.idlivro}>
                                    <div className="card h-100">
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{l.titulo}</h5>
                                            <div className="mb-2">{getNomeEditora(l.ideditora)}</div>
                                            <div className="mb-2">Edição {l.edicao}</div>
                                            <div className="mb-2">Publicado em {l.publicacao}</div>
                                            <div className="mb-2">N. páginas {l.paginas}</div>
                                            <div className="mt-auto">
                                                {l.emprestado
                                                    ? <span className="btn btn-info w-100" disabled>Este livro está emprestado!</span>
                                                    : <a className="btn btn-success w-100" href={`/emprestimo/${l.idlivro}`}>Emprestar</a>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}