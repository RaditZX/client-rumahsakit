import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link } from 'react-router-dom';
import Navbar from "../compenents/navbar";
import axios from 'axios';

//import react boostrap
import {Card} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

//import react router dom

function Profile(){
    const [nama_awal,setNama_awal] = useState('');
    const [nama_akhir,setNama_akhir] = useState('');   
    const [alamat,setAlamat] = useState('');
    const [email,setEmail] = useState('');
    const [pekerjaan,setPekerjaan] = useState('');
    const [no_telp,setNo_telp] = useState('');
    const [role,setRole] = useState('');
    const history = useHistory();
    const {Id} = useParams();
    const id = localStorage.getItem('id');

    const autorization = () => {
        axios.get(`http://localhost:3000/authenticated`,{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            console.log(res.data.auth);
            if(res.data.auth === false){
                history.push('/');
            }
        })
        .catch(err => {
            console.log(err.response.message);
        })
    }

    const getData = () => {
        axios.get(`http://localhost:3000/user/update/${id}`)
        .then(res => {
            setNama_awal(res.data.nama_awal);
            setNama_akhir(res.data.nama_akhir);
            setPekerjaan(res.data.pekerjaan);
            setAlamat(res.data.alamat);
            setEmail(res.data.email);
            setNo_telp(res.data.no_telp);
            setRole(res.data.role);
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/user/${id}`,{
            nama_awal,
            nama_akhir,
            pekerjaan,
            alamat,
            email,
            no_telp
        })
        .then(res => {
            console.log(res.data);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getData();
        autorization();
    },[])

    return(
        <div className="home">
            <Navbar />
            <div className='container'>
                <div className="d-flex flex-row">
                    <div className="p-2" style={{marginTop: "120px"}}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Header style={{ height: 'auto' }}>
                                <div className="d-flex justify-content-center">
                                    <div className="d-flex flex-column">
                                        {/* foto */}
                                        <div className="p-2 col-example text-left">
                                            <img className="rounded-circle" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                                        </div>

                                        {/* nama */}
                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex justify-content-center">
                                                <h2>{nama_awal}</h2>
                                            </div>
                                        </div>

                                        {/* pekerjaan */}
                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex justify-content-center">
                                                <p>{pekerjaan}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>{role}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                    <div className="p-2" style={{marginTop: "120px"}}>
                        <div >
                            {/* card form profile  */}
                            <Card style={{ width: '45rem' }}>
                                <Card.Header><h2 className='judul'>Profile</h2></Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Form onSubmit={handleSubmit}>
                                            <div className="row mt-2">
                                                <div className="col-md-6">
                                                    {/* nama awal */}
                                                    <label className="labels">Nama Awal: </label> 
                                                    <Form.Control type="text" value={nama_awal} onChange={(e)=> setNama_awal(e.target.value)}   disabled />
                                                </div>
                                                <div className="col-md-6">
                                                    {/* nama akhir */}
                                                    <label className="labels">Nama Akhir:</label>
                                                    <Form.Control type="text" value={nama_akhir} onChange={(e)=> setNama_akhir(e.target.value)}  disabled />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row mt-2">
                                                <div className="col-md-6">
                                                    {/* no telepon */}
                                                    <label className="labels">No Telepon: </label> 
                                                    <Form.Control type="text" value={no_telp} onChange={(e)=> setNo_telp(e.target.value)} disabled />
                                                </div>
                                                <div className="col-md-6">
                                                    {/* alamat email */}
                                                    <label className="labels">Alamat Email:</label>
                                                    <Form.Control type="text" value={email} onChange={(e)=> setEmail(e.target.value)} disabled />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row mt-2">
                                                <div className="col-md-6">
                                                    {/* pekerjaan */}
                                                    <label className="labels">Pekerjaan: </label> 
                                                    <Form.Control type="text" value={pekerjaan} onChange={(e)=> setPekerjaan(e.target.value)}  disabled />
                                                </div>
                                                <div className="col-md-6">
                                                    {/* alamat rumah */}
                                                    <label className="labels">Alamat rumah:</label>
                                                    <Form.Control type="text" value={alamat} onChange={(e)=> setAlamat(e.target.value)} disabled />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="d-flex flex-row-reverse">
                                                <div className="p-2"><Link to={`/u_profile`} className="btn btn-primary" >Edit data diri</Link>{' '}</div>
                                            </div>
                                        </Form>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;