import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListaLivro() {
    const [dados, setDados] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [editoras, setEditoras] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/livro').then(res => setDados(res.data));
        axios.get('http://localhost:4000/categoria').then(res => setCategorias(res.data));
        axios.get('http://localhost:4000/editora').then(res => setEditoras(res.data));
    }, []);

    const getNomeCategoria = (id) => {
        const cat = categorias.find(c => c.idcategoria === id);
        return cat ? cat.nomecategoria : id;
    };
    const getNomeEditora = (id) => {
        const ed = editoras.find(e => e.ideditora === id);
        return ed ? ed.nomeeditora : id;
    };

    return (
        <>
            <TituloLista 
                titulo="Livros" 
                descricao="Gerencie aqui os livros cadastrados" 
                rota ="/cadastrolivro" 
            />
            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Título</th>
                                <th>Ano</th>
                                <th>Categoria</th>
                                <th>Editora</th>
                                <th>Nº Edição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((d, i) => (
                                <tr key={d.idlivro}>
                                    <td>
                                        <a className="btn btn-primary" href={`/cadastrolivro/${d.idlivro}`}>Alterar</a>
                                    </td>               
                                    <td>{d.titulo}</td>
                                    <td>{d.publicacao}</td>
                                    <td>{getNomeCategoria(d.idcategoria)}</td>
                                    <td>{getNomeEditora(d.ideditora)}</td>
                                    <td>{d.edicao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}