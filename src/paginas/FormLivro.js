import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormLivro() {
    const navegacao = useNavigate();
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [publicacao, setPublicacao] = useState('');
    const [paginas, setPaginas] = useState('');
    const [numeroedicao, setNumeroEdicao] = useState('');
    const [resumo, setResumo] = useState('');
    const [ideditora, setIdEditora] = useState('');
    const [idcategoria, setIdCategoria] = useState('');
    const [editoras, setEditoras] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const voltar = () => {
        navegacao("/listalivro");
    };

    useEffect(() => {
        axios.get('http://localhost:4000/editora').then(res => setEditoras(res.data));
        axios.get('http://localhost:4000/categoria').then(res => setCategorias(res.data));
    }, []);

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/livro/${id}`);
        setTitulo(data.titulo || '');
        setPublicacao(data.publicacao || '');
        setPaginas(data.paginas || '');
        setNumeroEdicao(data.edicao || '');
        setResumo(data.resumo || '');
        setIdEditora(data.ideditora || '');
        setIdCategoria(data.idcategoria || '');
    };

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, [id]);

    const alterar = async () => {
        let body = {
            titulo,
            publicacao,
            paginas,
            edicao: numeroedicao,
            resumo,
            ideditora,
            idcategoria
        };
        await axios.put(`http://localhost:4000/livro/${id}`, body);
        voltar();
    };

    const inserir = async () => {
        let body = {
            titulo,
            publicacao,
            paginas,
            edicao: numeroedicao,
            resumo,
            ideditora,
            idcategoria
        };
        await axios.post(`http://localhost:4000/livro`, body);
        voltar();
    };

    const salvar = async () => {
        if (id) {
            alterar();
        } else {
            inserir();
        }
    };

    const excluir = async () => {
        await axios.delete(`http://localhost:4000/livro/${id}`);
        voltar();
    };

    return (
        <>
            <TituloCadastro id={id} titulo="Livro" />
            <form>
                {id && (
                    <div className="mb-3">
                        <label className="form-label">Código</label>
                        <input type="text" className="form-control" value={id} readOnly />
                    </div>
                )}
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input type="text" className="form-control" value={titulo} onChange={e => setTitulo(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ano de publicação</label>
                    <input type="text" className="form-control" value={publicacao} onChange={e => setPublicacao(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número de páginas</label>
                    <input type="text" className="form-control" value={paginas} onChange={e => setPaginas(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <select className="form-control" value={idcategoria} onChange={e => setIdCategoria(e.target.value)}>
                        <option value="">Selecione</option>
                        {categorias.map(c => (
                            <option key={c.idcategoria} value={c.idcategoria}>{c.nomecategoria}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Editora</label>
                    <select className="form-control" value={ideditora} onChange={e => setIdEditora(e.target.value)}>
                        <option value="">Selecione</option>
                        {editoras.map(e => (
                            <option key={e.ideditora} value={e.ideditora}>{e.nomeeditora}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Número da edição</label>
                    <input type="text" className="form-control" value={numeroedicao} onChange={e => setNumeroEdicao(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Resumo</label>
                    <textarea className="form-control" value={resumo} onChange={e => setResumo(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={salvar}>
                    Salvar
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={voltar}
                >
                    Cancelar
                </button>
                {id && (
                    <button type="button" className="btn btn-danger" onClick={excluir}>
                        Excluir
                    </button>
                )}
            </form>
        </>
    );
}