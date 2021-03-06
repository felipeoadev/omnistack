import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import fundo from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Logon() 
{
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e)
    {
        e.preventDefault();

        try
        {
            const response = await api.post('/session', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongNome', response.data.nome);

            history.push('/profile');
        }
        catch(err)
        {
            alert(`Falha no login.`);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Logo" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    
                    <input placeholder="Sua ID"  value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/registro">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={fundo} alt="Fundo" />
        </div>
    );
}