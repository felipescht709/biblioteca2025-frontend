import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormPessoa() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [senha, setSenha] = useState('');

    const voltar = () => {
        navigate("/listapessoa");
    };

   const selecionar = async () => {
    let { data } = await axios.get(`http://localhost:4000/usuario/${id}`);
    setNome(data.nomeusuario || data.nome || '');
    setCpf(data.cpf || '');
    setEmail(data.email || '');
    setTelefone(data.telefone || '');
    setNascimento(data.nascimento ? data.nascimento.substring(0,10) : '');
    setSenha(data.senha || '');
    };

    useEffect(() => {
        if (id) selecionar();
    }, [id]);

    const alterar = async () => {
    let body = { nomeusuario: nome, cpf, email, telefone, nascimento, senha };
    await axios.put(`http://localhost:4000/usuario/${id}`, body);
    voltar();
    };

    const inserir = async () => {
        let body = { nomeusuario: nome, cpf, email, telefone, nascimento, senha };
        await axios.post(`http://localhost:4000/usuario`, body);
        voltar();
    };

    const salvar = async () => {
        if (id) alterar();
        else inserir();
    };



    return (
        <>
            <TituloCadastro id={id} titulo="usuário" />
            <form>
                {id && (
                    <div className="mb-3">
                        <label className="form-label">Código</label>
                        <input type="text" className="form-control" value={id} readOnly />
                    </div>
                )}
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" value={nome} onChange={e => setNome(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">CPF</label>
                    <input type="text" className="form-control" value={cpf} onChange={e => setCpf(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefone</label>
                    <input type="text" className="form-control" value={telefone} onChange={e => setTelefone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nascimento</label>
                    <input type="date" className="form-control" value={nascimento} onChange={e => setNascimento(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={salvar}>
                    Salvar
                </button>
                <button type="button" className="btn btn-secondary" onClick={voltar}>
                    Cancelar
                </button>
            </form>
        </>
    );
}