import { useState } from 'react'
import './NewPredict.css'
import { auth } from "../../services/config";
import { db } from "../../services/config";
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const NewPredict = () => {

    const [enero, setEnero] = useState(null);
    const [febrero, setFebrero] = useState(null);
    const [marzo, setMarzo] = useState(null);
    const [abril, setAbril] = useState(null);
    const [mayo, setMayo] = useState(null);
    const [junio, setJunio] = useState(null);
    const [julio, setJulio] = useState(null);
    const [agosto, setAgosto] = useState(null);
    const [septiembre, setSeptiembre] = useState(null);
    const [octubre, setOctubre] = useState(null);
    const [noviembre, setNoviembre] = useState(null);
    const [diciembre, setDiciembre] = useState(null);
    const [error, setError] = useState("");
    const [ flag, setFlag ] = useState(1);

    const submit = (e) => {
        e.preventDefault();

        const acumulado = (1+enero*0.01)*(1+febrero*0.01)*(1+marzo*0.01)*(1+abril*0.01)*(1+mayo*0.01)*(1+junio*0.01)*(1+julio*0.01)*(1+agosto*0.01)*(1+septiembre*0.01)*(1+octubre*0.01)*(1+noviembre*0.01)*(1+diciembre*0.01);

        const datos = {
            enero,
            febrero,
            marzo,
            abril,
            mayo,
            junio,
            julio,
            agosto,
            septiembre,
            octubre,
            noviembre,
            diciembre,
            acumulado,
            fecha: new Date(),
            email: auth.currentUser.email,
            usuario: auth.currentUser.displayName
        };

        const miDoc = getDoc(doc(db, "usuarios", auth.currentUser.displayName))
            .then((res) => {
                if(!res.data()){
                    setDoc(doc(db, "usuarios", auth.currentUser.displayName), datos);
                    setError("Datos cargados!");
                    setFlag(0);
                }else{
                    setError("Ya cargaste los datos!");
                    setFlag(0);
                }
            });
    }

    return (
        <>
            {flag ?
                    <form className="newpredict-container" onSubmit={submit}>
                        <label className="newpredict-item">Enero</label>
                        <input className="newpredict-item" type="number" placeholder="Enero" min="0" required onChange={(e) => setEnero(e.target.value)} />
                        <label className="newpredict-item">Febrero</label>
                        <input className="newpredict-item" type="number" placeholder="Febrero" min="0" required onChange={(e) => setFebrero(e.target.value)} />
                        <label className="newpredict-item">Marzo</label>
                        <input className="newpredict-item" type="number" placeholder="Marzo" min="0" required onChange={(e) => setMarzo(e.target.value)} />
                        <label className="newpredict-item">Abril</label>
                        <input className="newpredict-item" type="number" placeholder="Abril" min="0" required onChange={(e) => setAbril(e.target.value)} />
                        <label className="newpredict-item">Mayo</label>
                        <input className="newpredict-item" type="number" placeholder="Mayo" min="0" required onChange={(e) => setMayo(e.target.value)} />
                        <label className="newpredict-item">Junio</label>
                        <input className="newpredict-item" type="number" placeholder="Junio" min="0" required onChange={(e) => setJunio(e.target.value)} />
                        <label className="newpredict-item">Julio</label>
                        <input className="newpredict-item" type="number" placeholder="Julio" min="0" required onChange={(e) => setJulio(e.target.value)} />
                        <label className="newpredict-item">Agosto</label>
                        <input className="newpredict-item" type="number" placeholder="Agosto" min="0" required onChange={(e) => setAgosto(e.target.value)} />
                        <label className="newpredict-item">Septiembre</label>
                        <input className="newpredict-item" type="number" placeholder="Septiembre" min="0" required onChange={(e) => setSeptiembre(e.target.value)} />
                        <label className="newpredict-item">Octubre</label>
                        <input className="newpredict-item" type="number" placeholder="Octubre" min="0" required onChange={(e) => setOctubre(e.target.value)} />
                        <label className="newpredict-item">Noviembre</label>
                        <input className="newpredict-item" type="number" placeholder="Noviembre" min="0" required onChange={(e) => setNoviembre(e.target.value)} />
                        <label className="newpredict-item">Diciembre</label>
                        <input className="newpredict-item" type="number" placeholder="Diciembre" min="0" required onChange={(e) => setDiciembre(e.target.value)} />
                        <button className="btn btn-primary" type='submit'>Cargar</button>
                    </form>
                :
                    <Link className="btn btn-primary" to="/">Volver</Link>
            }

            {
                error && <h2 className="error"> {error} </h2>
            }
        </>
    )
}

export default NewPredict