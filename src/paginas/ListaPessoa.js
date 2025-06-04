import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListaPessoa() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        let { data } = await axios.get('http://localhost:4000/usuario');
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloLista
                titulo="Pessoas"
                descricao="Gerencie aqui os pessoas do sistema"
                rota="/cadastropessoa"
            />
            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((d) => (
                                <tr key={d.idusuario}>
                                    <td>
                                        <a className="btn btn-primary" href={`/cadastropessoa/${d.idusuario}`}>Alterar</a>
                                    </td>
                                    <td>{d.idusuario}</td>
                                    <td>{d.nomeusuario || d.nome}</td>
                                    <td>{d.email}</td>
                                    <td>{d.telefone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}