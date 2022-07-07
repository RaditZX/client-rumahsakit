import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link,Redirect,useLocation } from 'react-router-dom';
import Navbar from "../compenents/navbar";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import '../App.css';

//import react boostrap
import {Card} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {Pagination} from 'react-bootstrap';

//import react-icons
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';

function Kamar(){
    const [kamar,setKamar] = useState([]);
    const [search,setSearch] = useState('');
    const [role,setRole] = useState('');
    const [sort,setSort] = useState('');
    const [currentPage,setCurrentPage] = useState(parseInt("")|| sessionStorage.getItem('page'));
    const [postsPerPage,setPostsPerPage] = useState(parseInt("")|| sessionStorage.getItem('limit'));
    const history = useHistory();
    const Id = localStorage.getItem('id')
    const location = useLocation();
    const pagination = "?page="+new URLSearchParams(location.search).get('page')+"&limit="+new URLSearchParams(location.search).get('limit');
    const Nama = "&search="+new URLSearchParams(location.search).get('search');
    sessionStorage.setItem('page',new URLSearchParams(location.search).get('page'));
    sessionStorage.setItem('limit',new URLSearchParams(location.search).get('limit'));


    const autorization = () => {
        axios.get(`http://localhost:3000/authenticated/${localStorage.getItem('token')}`)
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

    const getRoles = () => {
        axios.get(`http://localhost:3000/user/${Id}`)
        .then(res => {
            setRole(res.data.role);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getkamarPagination = () => {
        if (search === ''){
            history.push(`/kamar?page=${currentPage}&limit=${postsPerPage}`)
        }
        else{
             history.push(`/kamar?page=${currentPage}&limit=${postsPerPage}&search=${search}`)
        }
        window.location.reload();
    }

    useEffect(()=>{
        getKamar();
        autorization();
        getRoles();
    },[])

    const getKamar = () => {
        if (new URLSearchParams(location.search).get('search') === null){
            axios.get(`http://localhost:3000/kamar${pagination}`,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }})
            .then(res => {
                setKamar(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
        else{
            axios.get(`http://localhost:3000/kamar${pagination}${Nama}`,{
                    headers: {
                        "x-access-token": localStorage.getItem('token')
                    }})
                .then(res => {
                    setKamar(res.data);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const deleteKamar = (id) => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`http://localhost:3000/penyakit/delete/${id}`)
                        .then(res => {
                            console.log(res.data);
                            getKamar();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }      
                },
                {
                    label: 'No'
                }
            ]});
    }

    if(localStorage.getItem('token') === null){
        history.push('/');
    }

    if (role === 'pasien'){
        return <Redirect to='/' />
    }
    else {
        return(
            <div>
                <Navbar />
                <div className="container-fluid">
                    {/* header kamar */}
                        <div className="d-flex justify-content-between">
                            <div className="p-2 col-example text-left">
                                <div className="header">
                                    <h1>Kamar</h1>
                                </div>
                            </div>

                            {/* fitur tambah data */}
                            {role === 'admin' || role === 'perawat' ?
                            <div className="p-2 col-example text-left">
                                <Link to={`/t_kamar`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}
                            </div>
                            : null}
                        </div>
                        <br />

                        {/* fitur filter */}
                        <div className="d-flex justify-content-between">
                            <div className="p-2 col-example text-left">
                                <div className="d-flex flex-row">
                                    <div className="p-2">Filter:</div>
                                    <div className="p-2">
                                        <Form.Select value={sort} onChange={(e) => setSort(e.target.value)} size="sm">
                                            <option>select</option>
                                            <option value="nama_kamar">Nama</option>
                                            <option value="harga">Harga</option>

                                        </Form.Select>
                                    </div>
                                </div>
                            </div>

                        {/* fitur cari */}
                        <div className="p-2 col-example text-left">
                                <div className="d-flex flex-row-reverse">
                                    <div className="p">
                                        <Button variant="btn btn-primary" onClick={getkamarPagination} size="sm"><BsIcons.BsSearch /></Button>{' '}
                                    </div>
                                    <div className="p-3">
                                        <Form.Control size="sm" value={search} onChange={(e)=> setSearch(e.target.value)} type="text" placeholder="Cari" />
                                    </div>
                                    <div className="d-flex p-3">
                                        <label>Limit:</label>
                                        <Form.Control size="sm" value={postsPerPage} onChange={(e)=> setPostsPerPage(e.target.value)} type="number" placeholder="Cari" />
                                    </div>
                                    <div className="d-flex p-3">
                                        <label>Page:</label>
                                        <Form.Control size="sm" value={currentPage} onChange={(e)=> setCurrentPage(e.target.value)} type="number" placeholder="Cari" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* tabel data kamar */}
                        <div className="d-flex justify-content-center">
                            <div class="table-responsive">
                            <Table class="table align-middle mb-0 bg-white">
                                <thead class="bg-light">
                                        <tr className="header-tabel">
                                            <th>No</th>
                                            <th>Nama Kamar</th>
                                            <th>Lantai</th>
                                            <th>Harga</th>
                                            <th>Status</th>
                                            <th>Deskripsi</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kamar
                                        .sort((a,b) => {
                                            if(sort === 'nama_kamar'){
                                                return a.nama_kamar > b.nama_kamar ? 1 : -1
                                            }
                                            else if(sort === 'lantai'){
                                                return a.lantai > b.lantai ? 1 : -1
                                            }
                                            else if(sort === 'harga'){
                                                return a.harga > b.harga ? 1 : -1
                                            }
                                        })
                                        .map((kamar,index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{kamar.nama_kamar}</td>
                                                    <td>{kamar.lantai}</td>
                                                    <td>{kamar.harga}</td>
                                                    <td>{kamar.status}</td>
                                                    <td className='deskripsi'>{kamar.deskripsi}</td>
                                                    {role === 'admin' &&
                                                    <td>
                                                    <Link to={`kamar/edit/${kamar._id}`} className="btn btn-outline-primary"><MdIcons.MdEdit /></Link>
                                                        <button type="submit" className="btn btn-outline-danger" onClick={() => deleteKamar(kamar._id)}><MdIcons.MdDelete /></button>
                                                    </td>
                                                    }
            
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                        {/* pagination */}
                        <div className="d-flex flex-row-reverse">
                        {/* <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                pageCount={Math.ceil(kamar.length / postsPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={(e)=>setCurrentPage(e.selected+1)}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                                pageClassName={'page-item'}
                                previousClassName={'page-item'}
                                nextClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextLinkClassName={'page-link'}
                                disabledClassName={'disabled'}
                                activeLinkClassName={'active'}
                                pageLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                        ></ReactPaginate> */}
                        </div>
    
                </div>
            </div>
        )
    }

}

export default Kamar;