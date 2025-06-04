import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function dataHoje() {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
}
function dataVencimento() {
    const hoje = new Date();
    hoje.setDate(hoje.getDate() + 15);
    return hoje.toISOString().split('T')[0];
}

export default function FormEmprestimo() {
    const { idlivro } = useParams();
    const [livro, setLivro] = useState({});
    const [usuarios, setUsuarios] = useState([]);
    const [idusuario, setIdUsuario] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/livro/${idlivro}`).then(res => setLivro(res.data));
        axios.get('http://localhost:4000/usuario').then(res => setUsuarios(res.data));
    }, [idlivro]);

    const salvar = async () => {
        await axios.post('http://localhost:4000/emprestar', {
            idlivro,
            idusuario,
            emprestimo: dataHoje(),
            vencimento: dataVencimento(),
            devolucao: null,
            observacao: null
        });
        navigate("/"); 
    };

    const cancelar = () => {
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h3>Empréstimo de Livro</h3>
            <form>
                <div className="mb-3">
                    <label className="form-label">Título do livro</label>
                    <input type="text" className="form-control" value={livro.titulo || ""} readOnly />
                </div>
                <div className="mb-3">
                    <label className="form-label">Pessoa</label>
                    <select className="form-control" value={idusuario} onChange={e => setIdUsuario(e.target.value)}>
                        <option value="">Selecione a pessoa</option>
                        {usuarios.map(u => (
                            <option key={u.idusuario} value={u.idusuario}>
                                {u.nomeusuario || u.nome} - {u.email}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="button" className="btn btn-primary me-2" onClick={salvar} disabled={!idusuario}>
                    Salvar
                </button>
                <button type="button" className="btn btn-secondary" onClick={cancelar}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}