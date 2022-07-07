import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link } from 'react-router-dom';
import Navbar from "../compenents/navbar";

//import react boostrap
import {Card} from 'react-bootstrap';
import {Button} from 'bootstrap';

function Rincian(){
    return(
        <div>
            <Navbar />
            <div className='container'>
                <div>
                    {/* header */}
                    <h2>Rincian</h2><br/>
                </div>
                <div className="d-flex flex-row">
                    <div className="p-2">
                        <Card body style={{ width: '40rem' }}>
                            <div className="d-flex flex-column">
                                <div className="p-2 col-example text-left">
                                    <div className="d-flex justify-content-center"><h4>Rincian Biaya Rumah Sakit</h4></div>
                                </div>
                                <div className="d-flex justify-content-start">
                                    {/* Judul data user */}
                                    <div className="p-2 col-example text-left">
                                        <label>Nama Lengkap:</label><br/><p/>
                                        <label>No Telepon:</label><br/><p/>
                                        <label>Alamat Rumah: </label><br/><p/>
                                    </div>
                                    {/* isi data user */}
                                    <div className="p-2 col-example text-left">
                                        <label>:VVIP</label><br/><p/>
                                        <label>:100000</label><br/><p/>
                                        <label>:Reaver</label>
                                    </div>
                                </div>
                                <div className="p-2 col-example text-left">
                                    <label>Rincian Biaya:</label><p/>
                                    <Card body style={{ width: '30rem' }}>
                                        <div className="d-flex justify-content-start">
                                            <div className="p-2 col-example text-left">
                                                {/* judul total biaya */}
                                                <label>Jenis Kamar</label><br/><p/>
                                                <label>Harga Kamar</label><br/><p/>
                                                <label>Total hari meninap</label><br/><p/>
                                                <label>Jenis Biaya</label><br/><p/>
                                                <label>Harga</label><br/><p/>
                                                <b>Total</b>
                                            </div>
                                            <div className="p-2 col-example text-left">
                                                {/* harga total biaya */}
                                                <label>:VVIP</label><br/><p/>
                                                <label>:100000</label><br/><p/>
                                                <label>:7</label><br/><p/>
                                                <label>:Reaver</label><br/><p/>
                                                <label>:175000</label><br/><p/>
                                                <b>:2000000</b>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="p-2">
                        <div className="d-flex flex-column">
                            <button className="btn btn-outline-primary" type="submit">Ekspor ke pdf</button><br/>
                            <Link to={`/data`} className="btn btn-primary btn-block" >Batal</Link>{' '}
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}
export default Rincian;