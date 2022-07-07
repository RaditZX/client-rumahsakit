import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link } from 'react-router-dom';
import Navbar from "../compenents/navbar";

//import react boostrap
import {Card} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

//import react router dom

function UpdateData(){
    return(
        <div className="home">
            <Navbar />
            <div className='container'>
            <Card style={{ width: '60rem' }}>
                <Card.Header className='judul'>Edit data </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Form>
                        <div className="d-flex flex-column">
                            {/* nama lengkap */}
                            <label>Nama Lengkap:</label> 
                            <Form.Control type="text" placeholder="nama lengkap" /><br/>

                            {/* alamat */}
                            <label>Alamat Rumah:</label> 
                            <Form.Control type="text" placeholder="alamat" /><br/>
                            
                            {/* tanggal daftar */}
                            <label>Tanggal Daftar</label>
                            <Form.Control type="date" placeholder="name@example.com" /><br/>

                            {/* alamat */}
                            <label>No Telepon:</label> 
                            <Form.Control type="text" placeholder="08xxx" /><br/>

                            <div className="d-flex justify-content-between">
                                {/* pilih biaya */}
                                <div className="p-2 col-example text-left">
                                    <label>Biaya:</label>
                                    <Form.Select size="sm" >
                                        <option value="">Pilih Biaya</option>
                                    </Form.Select>
                                </div>
                                {/* pilih kamar */}
                                <div className="p-2 col-example text-left">
                                    <label>Kamar:</label>
                                    <Form.Select size="sm" >
                                        <option value="">Pilih Kamar</option>
                                    </Form.Select>
                                </div>
                                {/* pilih jenis_kelamin */}
                                <div className="p-2 col-example text-left">
                                    <label>Jenis Kelamin:</label>
                                    <Form.Select size="sm" >
                                        <option>Laki-Laki</option>
                                        <option>Perempuan</option>
                                    </Form.Select>
                                </div>
                                {/* pilih penyakit */}
                                <div className="p-2 col-example text-left">
                                    <label>Penyakit:</label>
                                    <Form.Select size="sm" >
                                        <option value="-">Pilih Penyakit</option>
                                    </Form.Select>
                                </div>
                                {/* pilih golongan darah */}
                                <div className="p-2 col-example text-left">
                                    <label>Golongan Darah:</label>
                                    <Form.Select size="sm">
                                        <option>A</option>
                                        <option>B</option>
                                        <option>AB</option>
                                        <option>O</option>
                                    </Form.Select>
                                </div>
                            </div>
                            <br />
                            <div className="d-flex flex-row-reverse">
                                <div className="p-2"><Link to={`/data`} className="btn btn-primary" >Batal</Link>{' '}</div>
                                <div className="p-2"><button type="submit" className="btn btn-primary" size="sm">Simpan</button></div>
                            </div>
                        </div>
                    </Form>
                </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    </div>
    );
}

export default UpdateData;