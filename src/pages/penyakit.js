import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link,Redirect,useLocation } from 'react-router-dom';
import Navbar from "../compenents/navbar";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import currencyFormatter from 'currency-formatter';

//import react boostrap
import {Card} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {Pagination} from 'react-bootstrap';

//import react-icons
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';


function Penyakit(){
    const [penyakit,setPenyakit] = useState([]);
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

    useEffect(()=>{
        getPenyakit();
        autorization();
        getRoles();

    },[])

    const getpenyakitPagination = () => {
        if (search === ''){
            history.push(`/penyakit?page=${currentPage}&limit=${postsPerPage}`)
        }
        else{
             history.push(`/penyakit?page=${currentPage}&limit=${postsPerPage}&search=${search}`)
        }
        window.location.reload();
    }

    const getPenyakit = () => {  
        if (new URLSearchParams(location.search).get('search') === null){
            axios.get(`http://localhost:3000/penyakit${pagination}`,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }})
            .then(res => {
                setPenyakit(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    else{
        axios.get(`http://localhost:3000/penyakit${pagination}${Nama}`,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }})
            .then(res => {
                setPenyakit(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
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

    const deletePenyakit = (id) => {
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
                            getPenyakit();
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
            console.log(err);
        })
    }

    if(localStorage.getItem('token') === null){
        history.push('/');
    }

    if (role === 'pasien'){
        return <Redirect to='/pasien'/>
    }
    else {
        return(
            <div>
                <Navbar />
                <div className="container-fluid">
                    <div className="wrapper">
                        {/* header penyakit */}
                            <div className="d-flex justify-content-between">
                                <div className="p-2 col-example text-left">
                                    <div className="header">
                                        <h1>Penyakit</h1>
                                    </div>
                                </div>

                                {/* fitur tambah data */}
                                {role === 'admin' || role === 'perawat' ? 
                                <div className="p-2 col-example text-left">
                                    <Link to={`/t_penyakit`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}
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
                                                <option value='nama_penyakit'>nama_penyakit</option>
                                                <option value='harga_obat'>Harga_obat</option>
                                                <option value='solusi'>solusi</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                </div>

                            {/* fitur cari */}
                            <div className="p-2 col-example text-left">
                                <div className="d-flex flex-row-reverse">
                                    <div className="p">
                                        <Button variant="btn btn-primary" onClick={getpenyakitPagination} size="sm"><BsIcons.BsSearch /></Button>{' '}
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

                            {/* tabel data penyakit */}
                                <div class="table-responsive">
                                <Table class="table align-middle mb-0 bg-white">
                                    <thead class="bg-light">
                                            <tr className="header-tabel">
                                                <th>No</th>
                                                <th>Nama Penyakit</th>
                                                <th>Deskripsi</th>
                                                <th>Solusi</th>
                                                <th>Harga Obat</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {penyakit
                                            .sort((a,b) => {
                                                if(sort === 'nama_penyakit'){
                                                    return a.nama_penyakit > b.nama_penyakit ? 1 : -1;
                                                }
                                                else if(sort === 'deskripsi'){
                                                    return a.deskripsi > b.deskripsi ? 1 : -1;
                                                }
                                                else if(sort === 'solusi'){
                                                    return a.solusi > b.solusi ? 1 : -1;
                                                }
                                                else if(sort === 'harga_obat'){
                                                    return a.harga_obat > b.harga_obat ? 1 : -1;
                                                }
                                            }
                                            )
                                            .map((list,index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{list.nama_penyakit}</td>
                                                        <td className='deskripsi'>{list.deskripsi}</td>
                                                        <td>{list.obat}</td>
                                                        <td>{currencyFormatter.format(list.harga_obat, {code: 'IDR'})}</td>
                                                        {role === 'admin' &&
                                                        <td>
                                                            <div className="d-flex justify-content-center">
                                                                <div className="p-2 col-example text-left"><Link to={`penyakit/edit/${list._id}`} className="btn btn-outline-primary"><MdIcons.MdEdit /></Link></div>
                                                                <div className="p-2 col-example text-left"><button type="submit" className="btn btn-outline-danger" onClick={() => deletePenyakit(list._id)}><MdIcons.MdDelete /></button></div>
                                                            </div>
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
                                pageCount={penyakit.length / postsPerPage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={(e)=>setCurrentPage(e.selected)}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
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
                            
                            >
                            </ReactPaginate> */}
                        </div>
                    </div>
                </div>
        )
    }
    
}

export default Penyakit;